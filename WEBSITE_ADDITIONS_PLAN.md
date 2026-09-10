# Cimulink Website Additions Plan

This document proposes what to add to `index.html` and where to add it. The goal is to make the website more credible and conversion-focused without adding a generic lead magnet.

## Current Issue

The website already has a strong technical-recruitment tone, but it does not yet prove three important things:

- Why Cimulink can evaluate senior engineers better than generic recruiters.
- What the client actually receives beyond a "curated shortlist."
- Why the offer saves real engineering time and hiring cost.

The strongest available proof is Ajay's background: IIT Guwahati, senior backend/platform engineering experience, engineering leadership, and hands-on work across banking, infra, data, payments, observability, performance, and production systems.

## Recommended Page Flow

Keep the current page mostly intact, but add three new sections:

1. Founder credibility section
2. Detailed deliverables section
3. ROI and comparison section

Recommended order:

1. Hero
2. Tech stack chips
3. Founder credibility
4. How it works
5. Deliverables
6. ROI and comparison
7. Bottom CTA
8. FAQ
9. Footer

## 1. Founder Credibility Section

### Where to Add

Add after the `<!-- Marquee / Tech Stack Section -->` block and before `<!-- Pipeline Section -->`.

Current approximate location:

- After `index.html:159` section ends
- Before `index.html:179`

### Why This Matters

The main differentiator is not just "technical recruitment." It is that the screening is led by someone who has actually built and operated the systems being hired for.

This section should make Ajay's engineering background visible before the user reaches the process section.

### Section Title

Screened by Someone Who Has Built These Systems

### Draft Copy

Most recruitment filters stop at keywords. Cimulink evaluates senior engineers through the lens of real backend, platform, data, and infrastructure work.

Ajay Kaaran Gupta has worked as a Lead Software Engineer and senior backend engineer across Arcesium, Slice, Prudential, and SAP Labs, with experience across payments, ledger systems, data pipelines, observability, Kubernetes, performance tuning, and production reliability.

### Suggested Proof Points

Use 4 compact proof cards or a two-column layout:

- IIT Guwahati engineering background
- Ex Arcesium, Slice, Prudential, SAP Labs
- Backend, platform, data, infra, and reliability experience
- Built and led production systems, teams, onboarding, and technical delivery

### Suggested Visual Style

Use a full-width band with the existing light background. Avoid a large personal bio card. Keep it sharp and technical:

- Left side: headline and short copy
- Right side: compact proof list or credentials grid
- Use mono labels such as `ENGINEERING BACKGROUND`, `PRODUCTION SYSTEMS`, `HIRING SIGNAL`

## 2. Detailed Deliverables Section

### Where to Add

Add after the current `<!-- Pipeline Section -->` and before `<!-- Bottom CTA -->`.

Current approximate location:

- After the how-it-works section around `index.html:179`
- Before `index.html:241`

### Why This Matters

The current page says Cimulink delivers a curated shortlist, but it does not explain what makes that shortlist valuable. This section should make the offer tangible.

### Section Title

What You Receive With Every Shortlist

### Intro Copy

You do not just receive resumes. You receive hiring signal that your engineering team can act on quickly.

### Deliverables to Show

#### 1. Role-Specific Technical Scorecard

What the client gets:

- A scorecard customized to the actual role, not a generic backend template.
- Evaluation across system design, debugging depth, production ownership, code quality, communication, and domain fit.
- Clear reasons why a candidate is strong, weak, or risky for the specific role.

Suggested short card copy:

Every candidate is evaluated against a role-specific technical scorecard covering system design, production maturity, debugging ability, ownership, communication, and domain relevance.

#### 2. Engineer-Screened Candidate Notes

What the client gets:

- Notes from an engineer-led screening conversation.
- Evidence of how the candidate thinks, not just what keywords they mention.
- Specific observations on tradeoffs, architecture judgment, and depth of experience.

Suggested short card copy:

Each shortlisted candidate includes screening notes written for hiring managers: what was tested, what signals were strong, where the candidate may need deeper validation, and why they match the role.

#### 3. Interview Readiness Brief

What the client gets:

- A one-page summary before the client interview.
- Candidate strengths, possible concerns, compensation expectations, availability, and recommended interview focus.
- A clearer interview path for the hiring panel.

Suggested short card copy:

Before you interview, you get a compact readiness brief with candidate strengths, concerns, compensation fit, notice period, and recommended areas to probe.

#### 4. Rejection Reasons and Market Signal

What the client gets:

- Reasons why candidates are being filtered out.
- Signals about salary mismatch, notice-period mismatch, weak technical depth, role ambiguity, or low market response.
- Feedback that improves the hiring process instead of just sending more profiles.

Suggested short card copy:

We report why candidates are failing the screen, whether the market is rejecting the role, and what needs to change in the JD, salary range, screening bar, or interview process.

#### 5. Shortlist With Hiring Context

What the client gets:

- A small, high-signal candidate list.
- Each profile mapped to role fit, technical fit, compensation fit, notice period, and risk areas.
- Fewer resumes, better signal.

Suggested short card copy:

The shortlist is intentionally small. Each profile is mapped to the role, technical bar, compensation range, notice period, and hiring risk so your team can decide quickly.

### Suggested Layout

Use a 2-column or 3-column card grid.

Recommended structure:

- Section heading and short intro
- Five deliverable cards
- A final horizontal note: "Built to reduce weak technical interviews, not increase resume volume."

## 3. ROI and Comparison Section

### Where to Add

Add after the deliverables section and before the current `<!-- Bottom CTA -->`.

Current approximate location:

- Before `index.html:241`

### Why This Matters

The business buyer cares about engineering time, speed, and opportunity cost. This section should make the economic case.

### Section Title

The Real Cost Is Not Recruiting Fees. It Is Engineering Bandwidth.

### Draft Copy

Every weak technical interview consumes senior engineering time. When hiring managers review poor-fit resumes, run avoidable technical rounds, and repeat the same calibration conversations, product delivery slows down.

Cimulink is designed to reduce low-signal interviews and improve the quality of candidates who reach your engineering panel.

### ROI Points

Show these as compact bullets or metric-style cards:

- Fewer weak candidates reaching senior engineers
- Better role calibration before sourcing begins
- Clearer rejection reasons and hiring-market feedback
- Faster shortlisting for urgent senior roles
- Less founder, CTO, and engineering-manager bandwidth spent on avoidable screening

### Suggested Comparison Table

Create a simple 3-column comparison:

| Hiring approach | What usually happens | Risk |
| --- | --- | --- |
| Generic recruiters | Keyword matching, volume-based sourcing, weak technical filtering | Engineering team still has to discover fit |
| AI resume screening | Faster resume parsing but limited judgment on real production depth | Strong-looking resumes still fail deep interviews |
| Cimulink | Engineer-led role calibration, technical screening, scorecards, and shortlist context | Lower resume volume, but higher hiring signal |

### Suggested Closing Line

The goal is not to send more candidates. The goal is to protect your engineering team's time and move only credible candidates into the interview loop.

## 4. Navigation Update

### Where to Add

Update the desktop and mobile navigation near the top of `index.html`.

Current approximate location:

- Desktop nav starts around `index.html:78`
- Mobile nav starts around `index.html:95`

### Suggested Nav Items

Keep it simple:

- Home
- Why Cimulink
- How it Works
- Deliverables
- FAQ

Add IDs:

- Founder section: `id="why-cimulink"`
- Deliverables section: `id="deliverables"`

## 5. FAQ Updates

### Where to Add

Update the existing FAQ section around `index.html:276`.

### Add or Replace Questions

#### Question

How is Cimulink different from a regular recruitment agency?

#### Answer

Cimulink is built around engineer-led screening. We evaluate candidates for role-specific technical depth, production ownership, system-design maturity, debugging ability, and communication, not just resume keywords.

#### Question

What exactly do we receive with each shortlisted candidate?

#### Answer

Each shortlisted candidate comes with technical screening notes, role-fit context, compensation and notice-period information, potential risk areas, and a recommendation on what your interview panel should validate next.

#### Question

Do you send high volumes of profiles?

#### Answer

No. The process is designed for fewer, better candidates. The objective is to reduce wasted engineering interviews, not increase resume volume.

## 6. Messaging to Avoid

Avoid these claims unless you have direct proof or testimonials:

- Guaranteed hiring speed
- Guaranteed candidate quality
- Specific placement numbers
- "Best in market"
- Claims that sound like a large agency if the service is founder-led

Use stronger but defensible language:

- Engineer-led screening
- Role-specific scorecards
- Production-depth evaluation
- Shortlists built for hiring-manager decision making
- Reduced low-signal technical interviews

## 7. Implementation Priority

If implementing in phases, do this order:

1. Add founder credibility section.
2. Add detailed deliverables section.
3. Add ROI and comparison section.
4. Update nav links.
5. Refresh FAQ.

The founder credibility and deliverables sections should create the biggest immediate improvement because they turn the current high-level promise into proof and a concrete offer.
