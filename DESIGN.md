---
title: IMaliway Design System
description: >
  Fintech payment-gateway brand for Mozambique. Developer-first API
  product built by Paytek, regulated by Banco de Moçambique. Dark-default
  with full light-mode support. Portuguese-language UI.

colors:
  brand:
    green:       "#52A828"   # Primary action, CTAs, active states
    green-dark:  "#2E7D1E"   # Hover / pressed state for green
    green-light: "#6DC135"   # Accent text, hero highlights, icon fills
    green-tint:  "#F0F9EA"   # Pill / badge backgrounds (light)
    green-tint2: "#D4EDBC"   # Pill / badge borders (light)
    green-tint-dark:   "rgba(82,168,40,0.12)"   # Pill / badge backgrounds (dark)
    green-tint2-dark:  "rgba(82,168,40,0.22)"   # Pill / badge borders (dark)
    green-glow:  "rgba(82,168,40,0.15)"          # Ambient radial glow

  dark-theme:
    bg-page:         "#0C0C0C"
    bg-section:      "#111111"
    bg-card:         "#181818"
    bg-card-hover:   "#1F1F1F"
    bg-input:        "#1A1A1A"
    bg-code:         "#0D1117"
    text-primary:    "#FFFFFF"
    text-secondary:  "rgba(255,255,255,0.60)"
    text-muted:      "rgba(255,255,255,0.35)"
    text-placeholder:"rgba(255,255,255,0.25)"
    border:          "rgba(255,255,255,0.09)"
    border-hover:    "rgba(255,255,255,0.18)"
    border-strong:   "rgba(255,255,255,0.25)"
    nav-bg:          "rgba(12,12,12,0.88)"
    shadow-card:     "0 4px 24px rgba(0,0,0,0.40)"
    shadow-green:    "0 0 32px rgba(82,168,40,0.20)"

  light-theme:
    bg-page:         "#FFFFFF"
    bg-section:      "#F7F8F6"
    bg-card:         "#FFFFFF"
    bg-card-hover:   "#F7F8F6"
    bg-input:        "#F7F8F6"
    bg-code:         "#0D1117"
    text-primary:    "#1A1A1A"
    text-secondary:  "#555555"
    text-muted:      "#888888"
    border:          "#E4E4E4"
    border-hover:    "#CCCCCC"
    border-strong:   "#AAAAAA"
    nav-bg:          "rgba(255,255,255,0.92)"
    shadow-card:     "0 4px 16px rgba(0,0,0,0.09)"
    shadow-green:    "0 4px 20px rgba(82,168,40,0.18)"

  payment-methods:
    mpesa-fg:    "#1B5E20"
    mpesa-bg:    "#E8F5E9"
    mpesa-bd:    "#A5D6A7"
    mkesh-fg:    "#0D47A1"
    mkesh-bg:    "#E3F2FD"
    mkesh-bd:    "#90CAF9"
    emola-fg:    "#BF360C"
    emola-bg:    "#FFF3E0"
    emola-bd:    "#FFCC80"

  code-syntax:
    keyword:   "#FF7B72"
    variable:  "#E8EAED"
    function:  "#D2A8FF"
    string:    "#A5D6FF"
    number:    "#FFA657"
    comment:   "#6E7681"
    success:   "#56D364"
    key:       "#79C0FF"
    base:      "#C9D1D9"

  ui-accent:
    purple-bg:  "#EDE7F6"
    purple-fg:  "#4527A0"
    env-live-bg:    "#1A2B1E"
    env-live-fg:    "#56D364"
    env-live-bd:    "rgba(86,211,100,0.30)"
    env-sandbox-bg: "#2B2315"
    env-sandbox-fg: "#FFA657"
    env-sandbox-bd: "rgba(255,166,87,0.30)"

typography:
  families:
    heading: "'Montserrat', sans-serif"
    body:    "'DM Sans', sans-serif"
    mono:    "'JetBrains Mono', monospace"
  scale:
    hero:   "clamp(3rem, 8vw, 6.5rem)"
    h1:     "clamp(2.6rem, 5.5vw, 4rem)"
    h2:     "clamp(1.6rem, 3.5vw, 2.5rem)"
    h3:     "clamp(1rem, 2vw, 1.25rem)"
    body:   "1rem"
    small:  "0.875rem"
    xs:     "0.75rem"
    label:  "0.65rem"
  weights:
    black:      900
    extrabold:  800
    bold:       700
    semibold:   600
    regular:    400
  tracking:
    hero:    "-0.04em"
    h1:      "-0.035em"
    h2:      "-0.025em"
    label:   "0.08em to 0.12em"
  line-height:
    tight:   "0.96 to 1.12"
    body:    "1.65"
    relaxed: "1.7 to 1.85"

spacing:
  1:  "4px"
  2:  "8px"
  3:  "12px"
  4:  "16px"
  5:  "20px"
  6:  "24px"
  8:  "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  20: "80px"
  24: "96px"

radii:
  sm:   "4px"
  md:   "8px"
  lg:   "12px"
  xl:   "16px"
  2xl:  "20px"
  full: "9999px"

shadows:
  sm:    "0 1px 3px rgba(0,0,0,0.08)"
  md:    "0 4px 16px rgba(0,0,0,0.09)"
  lg:    "0 8px 32px rgba(0,0,0,0.12)"
  xl:    "0 16px 48px rgba(0,0,0,0.15)"
  green: "0 4px 20px rgba(82,168,40,0.18)"
  green-dark: "0 0 32px rgba(82,168,40,0.20)"

motion:
  fast:   "150ms ease"
  normal: "250ms ease"
  slow:   "400ms ease"
  reveal: "opacity 0.65s ease, transform 0.65s ease"
  flip:   "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
  panel:  "opacity 0.35s ease, transform 0.35s ease"

breakpoints:
  sm:  "540px"
  md:  "768px"
  lg:  "960px"
  xl:  "1100px"
  2xl: "1200px"

layout:
  container-max: "1200px"
  container-padding: "24px"
  navbar-height: "66px to 68px"
  section-padding-y: "96px"
---

# IMaliway — Visual Design System

## 1. Brand Identity & Atmosphere

IMaliway is Mozambique's fintech infrastructure brand. The product is a payment gateway — an API that unifies M-Pesa, e-Mola, mKesh, QR Code, and payment links under a single integration for businesses in Maputo and beyond.

The overall atmosphere is **confident and technical without feeling cold**. Think: a developer-first product that a Mozambican entrepreneur can also trust. The darkness carries authority; the green brings life. It sits somewhere between Stripe's technical precision and a local telco partner badge — serious money infrastructure with African energy.

**Dark mode is the canonical experience.** The default theme is dark (`data-theme="dark"`); light mode exists as a thoughtful alternative. Both share the same green brand language and the same component shapes — only the surface tones flip.

The mood shifts section by section:
- Hero: near-black void with radial green glows and a faint SVG noise grain — immersive, cinematic
- Content sections: step up to dark charcoal (`#111`) or pure white, alternating in a comfortable rhythm
- CTA block: always stays dark even in light mode — a deliberate inversion that commands attention
- Footer: always near-black (`#080808` / `#1A1A1A`) — a grounding, legal anchor at the base

---

## 2. Color System

### Primary Brand — The iMali Green

The brand owns three shades of a vivid Mozambican-savanna green:

- **Active Green** (`#52A828`) — The workhorse. Used for primary buttons, step-circle fills, progress bars, success confirmations, and any interactive element that says "do this."
- **Deep Grove** (`#2E7D1E`) — The hover/pressed state. Appears when the user commits: button hover, section-tag text in light mode, panel step badges.
- **Lime Flash** (`#6DC135`) — The accent highlight. Used for hero text accents, stat numbers in the dark stats band, footer link hovers, and icon fills. Slightly more electric than Active Green — optimized for dark backgrounds.

Supporting tints:
- **Frost Tint** (`#F0F9EA` / `rgba(82,168,40,0.12)`) — The barely-there green wash that fills pill badges, section eyebrows, and KYC active states. Tells the user "this is branded" without shouting.
- **Tint Border** (`#D4EDBC` / `rgba(82,168,40,0.22)`) — The hairline green border that rings those same pill components.

### Payment-Method Semantics

Each integrated payment operator gets its own semantic color cluster used consistently across chips, icon rings, cert seals, and trust badges:

- **M-Pesa** — Forest green on mint: `#1B5E20` text on `#E8F5E9` background, `#A5D6A7` border
- **Mkesh** — Navy on sky blue: `#0D47A1` text on `#E3F2FD` background, `#90CAF9` border
- **e-Mola** — Burnt orange on warm cream: `#BF360C` text on `#FFF3E0` background, `#FFCC80` border

These palette clusters also carry semantic meaning in the use-case icons: e-commerce = M-Pesa green, SaaS = Mkesh blue, Marketplace = e-Mola orange, Developer = a deep purple (`#EDE7F6` / `#4527A0`).

### Dark Theme Surfaces

Six tonal steps from void to card, all near-black:

| Layer | Value | Usage |
|-------|-------|-------|
| Page | `#0C0C0C` | Outermost background |
| Section | `#111111` | Alternating section bands |
| Card | `#181818` | Content cards, method cards |
| Card Hover | `#1F1F1F` | Subtle hover lift for cards |
| Input | `#1A1A1A` | Form field fills |
| Code | `#0D1117` | Terminal & code blocks (GitHub Dark) |

### Code & Terminal Palette

Code blocks use a curated GitHub Dark–inspired syntax palette:
- Keywords: Coral red (`#FF7B72`)
- Functions/macros: Soft purple (`#D2A8FF`)
- Strings: Ice blue (`#A5D6FF`)
- Numbers: Warm amber (`#FFA657`)
- Comments: Ghost grey (`#6E7681`, italicized)
- Success/OK: Minty green (`#56D364`)
- Object keys: Cornflower blue (`#79C0FF`)

---

## 3. Typography

Three typefaces, each with a distinct register:

### Montserrat (Heading / UI)
Used for all headings, navigation links, button labels, section eyebrows, badges, form labels, and any text that carries hierarchy or instruction. Weights range from 600 (nav links) through 700 (buttons, labels) to 800 (section titles) and 900 (hero titles, stat numbers). Letter-spacing is compressed at display sizes (−0.04em on the hero) and slightly expanded (+0.08–0.12em) on uppercase eyebrow labels — a classic tension between mass and air.

### DM Sans (Body)
All running prose — section descriptions, FAQ answers, panel descriptions. Set at 16px / 1.6 base, with paragraphs at 1.65 line-height. Medium optical weight with humanist warmth: technical enough for a developer audience, approachable enough for a business owner.

### JetBrains Mono (Code / Data)
Reserved for code blocks, terminal output, API key values, transaction reference IDs, and URL bar labels. The monospace register signals "this is real data, handle it carefully." Used in dark-background contexts (`#0D1117`) almost exclusively.

### Display Headline Rules
The hero title is set in uppercase Montserrat Black (900), at `clamp(3rem, 8vw, 6.5rem)`, with a −0.04em tracking that makes letters press together like a stamp. This is intentional provocation: the massive uppercase "FINANCIAL INFRASTRUCTURE" reads like a government billboard crossed with a tech manifesto. The `<em>` accent within the logo wordmark breaks the pattern — italic-style in Montserrat Normal 700, colored Lime Flash — to mark the brand's personality injection point.

---

## 4. Component Patterns

### Buttons

Five variants, two sizes:

- **btn-primary** — Solid Active Green fill (#52A828), white label, Montserrat 700. Box-shadow with 30% green opacity. On hover: shifts to Deep Grove, rises 1px, shadow deepens to 40% opacity. The canonical action button.
- **btn-outline / btn-ghost** — Transparent fill, near-black charcoal label, 1.5px solid border in light grey (#CCCCCC). On hover: surface tint background (#F7F8F6) appears. Used for secondary actions alongside a primary.
- **btn-white** — White fill with charcoal text. Used inside the dark CTA block — the inverted context where white reads as primary.
- **btn-ghost-white** — Transparent with white border and white text. Used in the dark CTA block as the secondary option.
- **nav variants** — Compact 34px-height versions of ghost and primary, used exclusively in the navbar. Same color logic at smaller scale.

Large modifier (`btn-lg`): 54px height, 1rem font, 12px border-radius, 32px horizontal padding.

### Cards

All content cards share:
- Background: page-level surface (white in light, `#181818` in dark)
- Border: 1–1.5px solid at the contextual border color
- Border-radius: 16px (`--r-xl`)
- On hover: `translateY(-3px)` lift + green box-shadow (`0 4px 20px rgba(82,168,40,0.18)`) + border-color shifts to a 30% green tint

Feature cards add a subtle 2px top-edge gradient line (transparent → lime → transparent) that sweeps in on hover — a barely visible "crown" that signals activity.

Certification flip-cards are an exception: 3D CSS perspective flip on hover revealing a back face with coloured content.

### Badges & Pill Labels

Uniform component used across eyebrows, status chips, hero badge, method availability, and step badges:
- Shape: fully pill-shaped (`border-radius: 9999px`)
- Background: green tint or payment-method tint
- Border: matching tint border color
- Typography: Montserrat 700 at 0.62–0.68rem, all-caps, +0.08–0.12em letter-spacing
- Some variants add an animated pulsing dot (2s ease infinite ring expansion) to signal "live / active"

### Navbar

Fixed to the top, full-width, 66px tall. Frosted-glass background using `backdrop-filter: blur(16px) saturate(180%)` over a 88% opacity dark fill (dark mode) or 92% opacity white (light mode). A hairline bottom border at 7–9% white opacity (dark) or solid `#E4E4E4` (light) separates it from content. On scroll: a medium drop shadow appears. Navigation links are Montserrat Semibold 600 at 0.83rem, muted in resting state, full-opacity on hover with a soft background wash.

### Browser / Dashboard Mockups

Dark-background window frames with the macOS traffic-light dots (red `#FF5F57`, yellow `#FFBD2E`, green `#28C840`). URL bar in monospace at 0.68rem, ghost-coloured. Body uses the card surface. These mockups appear as interactive demo panels in the stepper section — they disappear on tablet viewports to prioritise the copy.

### Terminal / Code Card

Deepest layer of darkness: `#0D1117` background, `border-radius: 20px`, heavy shadow (`0 16px 48px rgba(0,0,0,0.45)`), 1px border at 7% white. Header row mirrors the browser frame pattern (traffic lights + monospace filename). Code inside uses the GitHub Dark syntax palette. Tab navigation within the terminal uses a green-tinted active state.

### Step Tabs

Horizontal numbered stepper: circular number badges (34px) connected by 2px hairline connectors. Inactive: grey background, muted text. Active: Active Green fill, Lime Flash label text, green drop-shadow halo on the circle. Step content panels animate in with a 350ms ease fade-translate from below. Progress dots below the panel info area: pill-shaped active dot (22px wide, 4px tall) vs. circular inactive dots (8px) — same pill-to-dot pattern as carousel dots.

### FAQ Accordion

Two-column grid, white card on light-grey section background. Each item has a `+` icon (circular, 24px) that rotates 45° to form a `×` on open. Border-color transitions to Active Green on the open item. Answer slides in; answer text is slightly muted. Links inside answers are Active Green with underline.

---

## 5. Visual Texture & Depth

### Noise Grain (Hero)
A faint SVG fractal noise at 2.8% opacity with `mix-blend-mode: overlay` covers the entire hero. Imperceptible to most users but adds the tactile depth of film grain that keeps the pure-black background from feeling digital-flat.

### Radial Green Glows
Two large elliptical gradients (55vw and 45vw diameter) sit in opposite corners of the hero — upper-left and lower-right — emitting the brand green at 7–10% opacity fading to transparent. They create a sense of light source without any visible geometry. The CTA section uses a similar dual-glow pattern but more aggressive (20% and 13%) since it's on a charcoal background.

### Elevation Model

Three distinct depth tiers:
1. **Flat** — Section backgrounds, section text areas, no shadow. Base layer.
2. **Lifted** — Cards at rest: hairline border only. Cards on hover: green shadow + 3–4px upward translate.
3. **Floating** — Code/terminal windows, hero dashboard mockup: `shadow-xl` (0 16px 48px rgba(0,0,0,0.15)) or `shadow-card` in dark (0 4px 24px rgba(0,0,0,0.40)). These elements feel detached from their section background.

### Section Rhythm

Sections alternate between two surface tones to create a soft visual pulse:
- Light: white → off-white (#F7F8F6) → white → off-white
- Dark: near-black (#0C0C0C) → dark (#111) → near-black → dark

Special breaks: the stats band is always charcoal-to-dark regardless of theme (white text / green numbers). The CTA is always charcoal. The footer is always deepest dark.

---

## 6. Layout Principles

**Container:** 1200px max-width, 24px horizontal padding (collapses to 16px below 540px). Centered with `margin: 0 auto`.

**Section vertical rhythm:** 96px top/bottom padding is the standard section breath. The CTA is tighter at 60px (for an accelerating momentum toward conversion). Stats band is 64px.

**Hero:** Full viewport height (`100dvh`), two-column grid (content left, dashboard mockup right) at 1:1 ratio with 64px gap. On tablet, mockup disappears and content goes full-width. On mobile, headline font scales down from 4rem to 2.2rem.

**Methods / Features grid:** 6-column at desktop, 3-column at 1100px, 2-column at 768px. Cards with 14–16px gaps.

**Developer section:** 1 : 1.25 asymmetric grid (copy left, code card right) at 64px gap.

**FAQ / Use-cases:** 2-column at desktop, 1-column at mobile.

**Whitespace philosophy:** Generous section padding and controlled card padding (22–26px) create breathing room. Internal card gaps use an 8–14px rhythm. The page never feels cramped; the fintech authority comes from the dark backgrounds and typography weight, not from packing information tight.

---

## 7. Motion & Interaction

**Scroll reveal:** Every section's headline, subtext, and card grid is initially invisible (`opacity: 0`, `translateY(28px)`). An IntersectionObserver triggers the `.visible` class, animating to full opacity and no translation over 0.65s. Staggered delays (0.1s, 0.2s, 0.3s) on hero elements create a cascading entrance.

**Hover interactions:** Cards lift 3–4px and glow green. Buttons rise 1px. All interactive elements transition at 150ms (fast) for snappy, confident response. Border-color changes, background washes, and color shifts use 150–250ms ease.

**Pulsing indicators:** The "live" badge in dashboards blinks between 100% and 55% opacity on a 1.5s cycle. The regulatory badge uses a concentric-ring pulse on the green dot (2s, expanding from 3px to 7px ring). These animations communicate real-time, live system status.

**Theme transition:** Background, border, and text colors cross-fade at 300ms ease on `body` and all major layout sections when the light/dark toggle fires.

**Stepper panels:** Content panels fade and slide in over 350ms when tab changes. Feels like a page flip — fast enough to not delay, slow enough to register as distinct content.

---

## 8. Brand Voice in UI

Section eyebrows are all-caps, tightly tracked Montserrat labels like "UMA API. TUDO INTEGRADO." and "DEVELOPER-FIRST" — short declarative statements, Portuguese or mixed-language, always uppercase. They frame sections as headings-before-the-heading.

The regulatory trust section ("Certificado por", "Banco de Moçambique") uses the same pill-chip language as the API method chips — equalizing local compliance credentials with payment-network logos as parallel trust signals.

All interactive copy uses the Portuguese `→` arrow as a CTA suffix convention ("Criar Conta →", "Começar Agora →") — directional shorthand that bridges both linguistic communities.
