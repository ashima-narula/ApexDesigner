---
name: Vital Ledger
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#414755'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#717786'
  outline-variant: '#c1c6d7'
  surface-tint: '#005bc1'
  primary: '#0058bc'
  on-primary: '#ffffff'
  primary-container: '#0070eb'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#b81120'
  on-secondary: '#ffffff'
  secondary-container: '#dc3135'
  on-secondary-container: '#fffbff'
  tertiary: '#00647c'
  on-tertiary: '#ffffff'
  tertiary-container: '#007f9c'
  on-tertiary-container: '#fafdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ae'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930014'
  tertiary-fixed: '#b6eaff'
  tertiary-fixed-dim: '#49d6ff'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-padding: 24px
  stack-gap-lg: 32px
  stack-gap-md: 16px
  stack-gap-sm: 8px
  grid-margin: 20px
  grid-gutter: 16px
---

## Brand & Style

The design system is rooted in the **Corporate / Modern** aesthetic with a strong emphasis on **Institutional Trust** and **Clarity**. Designed for the healthcare sector, it prioritizes immediate legibility and a sense of calm reliability. The brand personality is clinical yet accessible, using high-contrast typography and structured layouts to navigate complex medical data.

The visual style is characterized by "Utility over Ornamentation." It utilizes a "True White" canvas to evoke cleanliness, paired with bold, color-coded status containers that provide instant cognitive feedback. The emotional response should be one of security, efficiency, and professional transparency.

## Colors

The palette uses a high-vibrancy primary blue for actions and navigation, symbolizing stability. A critical "Alert Red" is reserved for high-priority notifications and medical warnings. 

Supporting colors include a bright cyan for general notifications and a warm amber for reminders. Neutrals are strictly partitioned: pure black for high-emphasis text, medium grays for metadata, and soft off-whites for secondary surface backgrounds to maintain the "clean clinic" feel without causing eye strain.

## Typography

The design system utilizes **Hanken Grotesk** across all levels to maintain a sharp, contemporary, and highly legible interface. 

Headlines utilize tight tracking and heavy weights to establish a clear hierarchy on information-dense pages. Body text is prioritized for scanability, using generous line heights. Data labels and metadata often use a slightly reduced font size with increased weight to distinguish between "attribute" and "value" in medical records.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a vertical rhythm based on an 8px square baseline. 

- **Mobile:** 4-column grid with 20px side margins. 
- **Desktop:** 12-column fixed-width grid (max 1200px) centered in the viewport.
- **Rhythm:** Elements are stacked using a "Modular Gap" system. Critical sections (like Medical History vs. Personal Info) are separated by `stack-gap-lg`, while related data points within a card use `stack-gap-sm`. 

Content should be centered for onboarding and splash states, but left-aligned for all data-entry and record-viewing screens to aid reading speed.

## Elevation & Depth

This design system avoids traditional shadows in favor of **Tonal Layers** and **Strong Outlines**. 

Depth is achieved through:
1.  **Level 0 (Base):** Pure white background.
2.  **Level 1 (Containers):** Large, rounded cards using subtle gray borders (1px) or soft background fills (F2F2F7).
3.  **Level 2 (High Priority):** Solid color blocks (Blue/Red/Cyan) with white text to "pop" from the base layer.

Backdrop blurs are used exclusively for modal overlays to keep the focus on the foreground medical data without losing environmental context.

## Shapes

The shape language is "Approachable Geometric." Primary containers and buttons utilize a consistent 0.5rem (8px) radius. Larger dashboard cards and notification blocks scale up to 1rem (16px) to appear softer and more integrated into the layout. 

Interactive elements like progress dots and profile avatars remain strictly circular to contrast against the rectangular structure of the data records.

## Components

### Buttons
Primary buttons are solid fills with rounded corners and centered white text. Secondary buttons use an outline style with 2px stroke weight.

### Cards & Containers
Medical record entries are housed in rounded cards. Use a thin 1px border (`#E5E5E5`) to define edges on the white background. For urgent notifications, use a full-bleed background color (Red or Amber) with an icon on the left.

### Navigation
The **Bottom Navigation Bar** is a minimal, high-contrast bar with a top border. It features three primary nodes: Records (Folder icon), Home (House icon), and Profile (User icon). Icons are thin-stroke (2px) line art, expanding or filling when active.

### Input Fields
Inputs are underlined or encased in light gray containers with clear label text positioned above the field. Errors are signaled by changing the border/underline color to the system's "Alert Red."

### Chips & Tags
Small, pill-shaped tags are used for "Allergies" or "Status" indicators, using a light tint of the primary color with darker text for legibility.