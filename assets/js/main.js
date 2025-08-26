/**
 * Cimulink Landing Page - Main JS
 * - Pauses marquee on hover and respects prefers-reduced-motion
 * - Intersection reveal for architect cards
 * - Floating bubbles inside architect cards with fixed-timestep motion
 * - Bouncy chips inside process step-media containers
 * - Accessible FAQ accordion
 */
(() => {
  // Pause marquee on hover for accessibility and readability.
  const initMarquee = () => {
    const track = document.querySelector('.logos-track');
    const marquee = document.querySelector('.logos-marquee');
    if (track && marquee) {
      marquee.addEventListener('mouseenter', () => (track.style.animationPlayState = 'paused'));
      marquee.addEventListener('mouseleave', () => (track.style.animationPlayState = 'running'));

      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      function pref(e) {
        if (e.matches) {
          track.style.animation = 'none';
        } else {
          track.style.animation = '';
        }
      }
      pref(mq);
      mq.addEventListener('change', pref);
    }
  };

  // Intersection reveal for "Meet the Architect" cards
  const initReveal = () => {
    const cards = document.querySelectorAll('.arch-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((el) => observer.observe(el));
  };

  // Floating bubbles (inside architect cards)
  const initBubbles = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const rand = (min, max) => Math.random() * (max - min) + min;
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    const cards = document.querySelectorAll('.arch-card');
    cards.forEach((card) => {
      const cw = card.clientWidth,
        ch = card.clientHeight;
      const bubbles = Array.from(card.querySelectorAll('.bubble'));
      bubbles.forEach((b) => {
        const w = b.offsetWidth,
          h = b.offsetHeight;
        const minX = -w * 0.4,
          minY = -h * 0.4;
        const maxX = cw - w * 0.6,
          maxY = ch - h * 0.6;

        const x = rand(minX, Math.max(minX, maxX));
        const y = rand(minY, Math.max(minY, maxY));
        b.style.left = x + 'px';
        b.style.top = y + 'px';
        b.dataset.vx = ((Math.random() > 0.5 ? 1 : -1) * rand(20, 45)).toString(); // px/s
        b.dataset.vy = ((Math.random() > 0.5 ? 1 : -1) * rand(14, 36)).toString(); // px/s
        b.style.opacity = String(rand(0.35, 0.65));
      });
    });

    // Fixed-timestep physics
    let last = performance.now();
    let acc = 0;
    const FIXED_DT = 1 / 60;
    const MAX_STEPS = 5;

    function stepBubbles(dt) {
      const cards = document.querySelectorAll('.arch-card');
      cards.forEach((card) => {
        const cw = card.clientWidth,
          ch = card.clientHeight;
        const bubbles = Array.from(card.querySelectorAll('.bubble'));

        for (let i = 0; i < bubbles.length; i++) {
          const bi = bubbles[i];
          const wi = bi.offsetWidth,
            hi = bi.offsetHeight;
          let xi = bi.offsetLeft,
            yi = bi.offsetTop;
          let vxi = parseFloat(bi.dataset.vx || '30'),
            vyi = parseFloat(bi.dataset.vy || '20');

          xi += vxi * dt;
          yi += vyi * dt;

          const minX = -wi * 0.4,
            minY = -hi * 0.4;
          const maxX = cw - wi * 0.6,
            maxY = ch - hi * 0.6;
          if (xi <= minX) {
            xi = minX;
            vxi = Math.abs(vxi);
          }
          if (yi <= minY) {
            yi = minY;
            vyi = Math.abs(vyi);
          }
          if (xi >= maxX) {
            xi = maxX;
            vxi = -Math.abs(vxi);
          }
          if (yi >= maxY) {
            yi = maxY;
            vyi = -Math.abs(vyi);
          }

          // light collision swap
          for (let j = i + 1; j < bubbles.length; j++) {
            const bj = bubbles[j];
            const wj = bj.offsetWidth,
              hj = bj.offsetHeight;
            const xj = bj.offsetLeft,
              yj = bj.offsetTop;
            const rx = (wi + wj) / 2,
              ry = (hi + hj) / 2;
            const dx = xi + wi / 2 - (xj + wj / 2);
            const dy = yi + hi / 2 - (yj + hj / 2);
            if (Math.abs(dx) < rx * 0.9 && Math.abs(dy) < ry * 0.9) {
              const vjx = parseFloat(bj.dataset.vx || '30');
              const vjy = parseFloat(bj.dataset.vy || '20');
              bj.dataset.vx = String(vxi);
              bj.dataset.vy = String(vyi);
              vxi = vjx;
              vyi = vjy;
            }
          }

          bi.style.left = xi + 'px';
          bi.style.top = yi + 'px';
          bi.dataset.vx = String(vxi);
          bi.dataset.vy = String(vyi);
        }
      });
    }

    function tick(now) {
      const frameDt = Math.min(100, now - last) / 1000;
      last = now;
      acc += frameDt;
      let steps = 0;
      while (acc >= FIXED_DT && steps < MAX_STEPS) {
        stepBubbles(FIXED_DT);
        acc -= FIXED_DT;
        steps++;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // keep bubbles inside after resizes
    window.addEventListener('resize', () => {
      document.querySelectorAll('.arch-card .bubble').forEach((b) => {
        const p = b.parentElement;
        if (!p) return;
        const maxLeft = p.clientWidth - b.offsetWidth * 0.6;
        const maxTop = p.clientHeight - b.offsetHeight * 0.6;
        const clampVal = (v, min, max) => Math.min(Math.max(v, min), max);
        const x = clampVal(b.offsetLeft, -b.offsetWidth * 0.4, maxLeft);
        const y = clampVal(b.offsetTop, -b.offsetHeight * 0.4, maxTop);
        b.style.left = x + 'px';
        b.style.top = y + 'px';
      });
    });
  };

  // Bounce the chips inside .chip-wrap like bubbles (within step-media)
  const initBouncyChips = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const rand = (min, max) => Math.random() * (max - min) + min;
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    const zones = document.querySelectorAll('.step-media .chip-wrap');
    zones.forEach((zone) => {
      // make zone a positioned container (acts as the physics world)
      zone.style.position = 'absolute';
      zone.style.left = '12px';
      zone.style.top = '12px';
      zone.style.right = '12px';
      zone.style.bottom = '12px';
      zone.style.pointerEvents = 'none'; // decorative movement

      const chips = Array.from(zone.querySelectorAll('.chip'));

      // initialize each chip with random non-axis-aligned velocity and position
      chips.forEach((ch) => {
        ch.style.position = 'absolute';
        ch.style.pointerEvents = 'auto'; // allow hover
        const w = ch.offsetWidth,
          h = ch.offsetHeight;

        const maxX = Math.max(0, zone.clientWidth - w);
        const maxY = Math.max(0, zone.clientHeight - h);

        const x = rand(0, maxX);
        const y = rand(0, maxY);
        ch.style.left = x + 'px';
        ch.style.top = y + 'px';

        // random direction using angle to avoid only horizontal/vertical paths
        const angle = rand(0, Math.PI * 2);
        const speed = rand(28, 56); // px/s
        ch.dataset.vx = (Math.cos(angle) * speed).toFixed(3);
        ch.dataset.vy = (Math.sin(angle) * speed).toFixed(3);

        // tiny random mass for more organic collision (placeholder for future)
        ch.dataset.m = String(rand(0.8, 1.2));
      });

      // Fixed-timestep loop so chips keep moving even when rAF is throttled
      let last = performance.now();
      let acc = 0;
      const FIXED_DT = 1 / 60; // 60Hz physics
      const MAX_STEPS = 5;

      function stepChips(dt) {
        const W = zone.clientWidth,
          H = zone.clientHeight;

        for (let i = 0; i < chips.length; i++) {
          const ci = chips[i];
          const wi = ci.offsetWidth,
            hi = ci.offsetHeight;
          let xi = ci.offsetLeft,
            yi = ci.offsetTop;
          let vxi = parseFloat(ci.dataset.vx || '30');
          let vyi = parseFloat(ci.dataset.vy || '24');

          xi += vxi * dt;
          yi += vyi * dt;

          if (xi <= 0) {
            xi = 0;
            vxi = Math.abs(vxi);
          }
          if (yi <= 0) {
            yi = 0;
            vyi = Math.abs(vyi);
          }
          if (xi + wi >= W) {
            xi = Math.max(0, W - wi);
            vxi = -Math.abs(vxi);
          }
          if (yi + hi >= H) {
            yi = Math.max(0, H - hi);
            vyi = -Math.abs(vyi);
          }

          ci.style.left = xi + 'px';
          ci.style.top = yi + 'px';
          ci.dataset.vx = vxi.toFixed(3);
          ci.dataset.vy = vyi.toFixed(3);
        }
      }

      function tick(now) {
        const frameDt = Math.min(100, now - last) / 1000;
        last = now;
        acc += frameDt;
        let steps = 0;
        while (acc >= FIXED_DT && steps < MAX_STEPS) {
          stepChips(FIXED_DT);
          acc -= FIXED_DT;
          steps++;
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);

      // keep chips in bounds after resize
      new ResizeObserver(() => {
        const W = zone.clientWidth,
          H = zone.clientHeight;
        chips.forEach((ch) => {
          const w = ch.offsetWidth,
            h = ch.offsetHeight;
          ch.style.left = clamp(ch.offsetLeft, 0, Math.max(0, W - w)) + 'px';
          ch.style.top = clamp(ch.offsetTop, 0, Math.max(0, H - h)) + 'px';
        });
      }).observe(zone);
    });
  };

  // FAQ accordion
  const initFaq = () => {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item) => {
      const btn = item.querySelector('.faq-q');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const open = item.classList.contains('open');
        items.forEach((i) => {
          i.classList.remove('open');
          const q = i.querySelector('.faq-q');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  };

  // Simple typewriter for hero pill text
  function initHeroPillTypewriter() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pill = document.getElementById('hero-pill');
    if (!pill) return;
    const targetEl = pill.querySelector('.typewriter-target');
    if (!targetEl) return;

    // The static fallback text (already in DOM after the span) should be hidden during typing
    // Find the sibling text node and temporarily hide it by wrapping in a span if needed
    let fallbackTextNode = null;
    for (const node of pill.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        fallbackTextNode = node;
        break;
      }
    }
    let fallbackWrapper;
    if (fallbackTextNode) {
      fallbackWrapper = document.createElement('span');
      fallbackWrapper.style.display = 'none';
      pill.insertBefore(fallbackWrapper, fallbackTextNode);
      fallbackWrapper.appendChild(fallbackTextNode);
    }

    const text = 'Built for Scale | Ready for Growth';
    if (prefersReduced) {
      // Respect reduced motion: set instantly
      targetEl.textContent = text;
      return;
    }

    let i = 0;
    targetEl.textContent = '';
    const startDelay = 300; // slight delay after load
    const baseSpeed = 38;   // ms per char
    const variance = 24;    // random variance

    function tick() {
      if (i < text.length) {
        targetEl.textContent += text.charAt(i++);
        const next = baseSpeed + Math.floor(Math.random() * variance);
        setTimeout(tick, next);
      }
    }
    setTimeout(tick, startDelay);
  }

  // Architecture Diagram Toggle
  const initArchitectureToggle = () => {
    const toggleBtn = document.getElementById('architecture-toggle');
    const beforeDiagram = document.getElementById('before-diagram');
    const afterDiagram = document.getElementById('after-diagram');
    
    if (!toggleBtn || !beforeDiagram || !afterDiagram) return;
    
    toggleBtn.addEventListener('click', () => {
      const isShowingSolution = toggleBtn.classList.contains('solution');
      
      if (isShowingSolution) {
        // Switch to "before" diagram
        beforeDiagram.classList.add('active');
        afterDiagram.classList.remove('active');
        toggleBtn.classList.remove('solution');
        toggleBtn.querySelector('.toggle-text').textContent = 'Show Our Solution';
      } else {
        // Switch to "after" diagram
        afterDiagram.classList.add('active');
        beforeDiagram.classList.remove('active');
        toggleBtn.classList.add('solution');
        toggleBtn.querySelector('.toggle-text').textContent = 'Show Original';
      }
    });
  };

  // Cache Architecture Scenario Navigation
  const initCacheScenarioNavigation = () => {
    const scenarioButtons = document.querySelectorAll('.scenario-btn');
    const flowArrows = document.querySelectorAll('.flow-arrow');
    
    if (!scenarioButtons.length) return;
    
    scenarioButtons.forEach(button => {
      button.addEventListener('click', () => {
        const scenario = button.dataset.scenario;
        
        // Update active button
        scenarioButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Hide all flow arrows
        flowArrows.forEach(arrow => {
          arrow.style.opacity = '0';
          arrow.style.animation = 'none';
        });
        
        // Show flow arrows for selected scenario with animation
        setTimeout(() => {
          const scenarioArrows = document.querySelectorAll(`.${scenario}-flow`);
          scenarioArrows.forEach((arrow, index) => {
            setTimeout(() => {
              arrow.style.opacity = '1';
              arrow.style.animation = 'flowAnimation 1.5s ease-in-out';
            }, index * 300);
          });
        }, 100);
      });
    });
    
    // Add CSS for flow animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flowAnimation {
        0% { opacity: 0; transform: scaleX(0); }
        50% { opacity: 1; transform: scaleX(1); }
        100% { opacity: 0.8; transform: scaleX(1); }
      }
    `;
    document.head.appendChild(style);
    
    // Trigger initial animation for cache hit scenario
    setTimeout(() => {
      const initialArrows = document.querySelectorAll('.hit-flow');
      initialArrows.forEach((arrow, index) => {
        setTimeout(() => {
          arrow.style.opacity = '1';
          arrow.style.animation = 'flowAnimation 1.5s ease-in-out';
        }, index * 300);
      });
    }, 500);
  };

  // Educational Popups for Architecture Components
  const initArchitecturePopups = () => {
    const components = document.querySelectorAll('[data-tooltip]');
    
    components.forEach(component => {
      component.addEventListener('click', (e) => {
        // Prevent default to stop any other actions
        e.preventDefault();
        e.stopPropagation();
        
        // Remove any existing tooltips
        const existingTooltip = document.querySelector('.architecture-tooltip');
        if (existingTooltip) {
          existingTooltip.remove();
        }
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'architecture-tooltip';
        tooltip.innerHTML = `
          <div class="tooltip-content">
            <h4>${component.querySelector('.component-label').textContent}</h4>
            <p>${component.getAttribute('data-tooltip')}</p>
            <button class="tooltip-close">×</button>
          </div>
        `;
        
        // Position tooltip near the component
        const rect = component.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        tooltip.style.position = 'absolute';
        tooltip.style.left = (rect.left + scrollLeft + rect.width / 2) + 'px';
        tooltip.style.top = (rect.top + scrollTop - 10) + 'px';
        tooltip.style.transform = 'translate(-50%, -100%)';
        tooltip.style.zIndex = '1000';
        
        // Add to document
        document.body.appendChild(tooltip);
        
        // Add close functionality
        const closeBtn = tooltip.querySelector('.tooltip-close');
        closeBtn.addEventListener('click', () => {
          tooltip.remove();
        });
        
        // Close tooltip when clicking anywhere else
        const closeTooltip = (e) => {
          if (!tooltip.contains(e.target) && e.target !== component) {
            tooltip.remove();
            document.removeEventListener('click', closeTooltip);
          }
        };
        
        // Delay adding the event listener to prevent immediate closing
        setTimeout(() => {
          document.addEventListener('click', closeTooltip);
        }, 100);
      });
    });
  };

  // Mobile Navigation Toggle
  function initMobileNav() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!mobileMenuToggle || !mobileNav) return;
    
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // Boot
  document.addEventListener('DOMContentLoaded', () => {
    initMarquee();
    initReveal();
    initBubbles();
    initBouncyChips();
    initFaq();
    initHeroPillTypewriter();
    initArchitectureToggle();
    initArchitecturePopups();
    initCacheScenarioNavigation();
    initMobileNav();
  });
})();
