---
name: Connected Systems Precision
colors:
  surface: "#0f131c"
  surface-dim: "#0f131c"
  surface-bright: "#353942"
  surface-container-lowest: "#0a0e16"
  surface-container-low: "#181c24"
  surface-container: "#1c2028"
  surface-container-high: "#262a33"
  surface-container-highest: "#31353e"
  on-surface: "#dfe2ee"
  on-surface-variant: "#c6c6cf"
  inverse-surface: "#dfe2ee"
  inverse-on-surface: "#2c3039"
  outline: "#8f9099"
  outline-variant: "#45464e"
  surface-tint: "#b9c5f2"
  primary: "#b9c5f2"
  on-primary: "#222f53"
  primary-container: "#0d1b3e"
  on-primary-container: "#7784ad"
  inverse-primary: "#515d84"
  secondary: "#acc7ff"
  on-secondary: "#002f67"
  secondary-container: "#004da3"
  on-secondary-container: "#a6c3ff"
  tertiary: "#5fdacc"
  on-tertiary: "#003732"
  tertiary-container: "#00221f"
  on-tertiary-container: "#00958a"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#dbe1ff"
  primary-fixed-dim: "#b9c5f2"
  on-primary-fixed: "#0b1a3d"
  on-primary-fixed-variant: "#39456b"
  secondary-fixed: "#d7e2ff"
  secondary-fixed-dim: "#acc7ff"
  on-secondary-fixed: "#001a40"
  on-secondary-fixed-variant: "#004491"
  tertiary-fixed: "#7ef6e8"
  tertiary-fixed-dim: "#5fdacc"
  on-tertiary-fixed: "#00201d"
  on-tertiary-fixed-variant: "#005049"
  background: "#0f131c"
  on-background: "#dfe2ee"
  surface-variant: "#31353e"
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: "600"
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1280px
---

## Brand & Style

This design system is built for owners and operational leaders evaluating business systems, emphasizing **high trust, professional rigor, and engineering precision**. The aesthetic moves away from the ephemeral "glow" of consumer AI and instead embraces a **Corporate/Modern** style rooted in structure and clarity.

The brand personality is authoritative yet approachable. It evokes the feeling of a well-designed operational console: structured, dependable, and clear. Visual complexity is reduced in favor of refined whitespace and structural integrity, ensuring that the connection between processes, people, information, and technology is presented with absolute clarity.

## Colors

The palette is derived directly from the core brand identity, optimized for a high-contrast dark environment that remains grounded.

- **Primary (Deep Navy):** Used for the base layout backgrounds and deep semantic layers. It provides a stable, "safe" foundation for the UI.
- **Secondary (Royal Blue):** The primary action color. It denotes interactivity and links.
- **Tertiary (Teal):** Used sparingly as an accent for success states, data visualizations, or highlighting technical proficiency.
- **Neutral:** A range of slate greys and off-whites are used for text and subtle structural dividers, avoiding pure black (#000000) to maintain a premium feel.

## Typography

The typography system utilizes **Plus Jakarta Sans** for its balanced, modern proportions that feel both tech-forward and professional. To emphasize the technical nature of recruitment, **JetBrains Mono** is introduced for small labels, data points, and metadata, providing an "engineered" feel to the information density.

Hierarchy is established through weight and scale. Headlines should be tight and impactful, while body copy maintains generous line heights for long-form reading of candidate profiles and job descriptions.

## Layout & Spacing

The layout follows a **Fluid Grid** model with strict adherence to an 8px (base 4px) spacing rhythm. This ensures that every element feels intentionally placed.

- **Desktop:** A 12-column grid with 24px gutters. Content is centered within a 1280px container.
- **Tablet:** An 8-column grid with 16px margins.
- **Mobile:** A 4-column grid with 16px margins.

Whitespace is used as a structural tool to separate different data "modules" without the need for heavy lines. Consistent internal padding within cards (24px) creates a sense of "breathing room" amidst data-dense interfaces.

## Elevation & Depth

This design system avoids heavy drop shadows and glowing effects. Instead, depth is communicated through **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Surface):** The deepest neutral shade (#080C14).
- **Level 1 (Card/Section):** A slightly lighter navy (#0D1B3E) with a subtle 1px border (#1E293B).
- **Level 2 (Popovers/Modals):** A higher tonal contrast with a very soft, large-radius ambient shadow (0% to 10% opacity) just to lift the element off the page.

Interaction is signaled by border color shifts rather than shadow intensity changes, maintaining a flat, "blueprint" aesthetic.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding takes the "edge" off the technical UI without making it feel overly consumer or playful.

- Standard buttons and inputs: 4px radius.
- Container cards and modules: 8px (rounded-lg).
- Tags/Badges: 2px (minimal rounding) to maintain a crisp, data-focused look.

## Components

### Buttons

Primary buttons use the Royal Blue palette with high-contrast white text. Secondary buttons utilize the "ghost" style—a 1px border of Royal Blue with a subtle background fill on hover.

### Inputs & Fields

Inputs are structured with a 1px border (#1E293B). On focus, the border shifts to Royal Blue. Labels always use the JetBrains Mono font for a "form-field" technical look.

### Cards

Cards are the primary organizational unit. They should have a flat background (#0D1B3E) and a 1px border. No shadows are applied to standard cards.

### Chips & Badges

Used for technical skills (e.g., "React", "Python"). These should be rectangular with very small radii (2px) and use low-saturation versions of the Tertiary Teal or Secondary Blue to avoid visual noise.

### Data Lists

Lists should use subtle horizontal dividers rather than boxes. High information density is encouraged, using the label-mono style for secondary metadata.
