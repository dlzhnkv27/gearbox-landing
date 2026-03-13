# Gearbox Landing — Project Instructions

## Overview
Astro-based landing page for Gearbox Protocol — tokenised asset lending infrastructure.
Stack: Astro + CSS3 + vanilla JS for small interactions.

## Project Structure
```
Landing/
├── src/pages/index.astro            — Main landing page
├── src/pages/storybook.astro        — Astro component catalog
├── src/components/sections/*        — Reusable page sections
├── src/components/ui/*              — Reusable UI primitives
├── src/data/landing.js              — Content and asset data
├── src/styles/global.css            — Global style source of truth
├── public/assets/*                  — Semantic asset folders by domain
├── public/app.js                    — Served mobile menu logic
└── CLAUDE.md                        — This file
```

## Source of Truth
- Edit `src/` for Astro markup and component structure.
- Edit `src/styles/global.css` for global styling.
- `public/` is reserved for static assets and runtime files like `app.js`.
- After any meaningful UI, layout, motion, routing, or component-architecture change, update `CLAUDE.md` and the relevant reference docs in the same task.

## Asset Rules
- Store local assets in semantic folders under `public/assets/` such as `brand`, `accounts`, `partners`, `tokens`, `security`, `footer`, `hero`.
- Use human-readable filenames that describe the asset's role in the UI.
- Do not keep UUID-style filenames for local project assets unless there is a temporary migration reason.
- If an old export is kept only for reference, mark it clearly as `legacy` in the filename.

## Documentation Sync
- Update `CLAUDE.md` after structural changes to pages, components, styling source of truth, or project conventions.
- Update [`MOTION.md`](./MOTION.md) after changing reveal timing, hover motion, stagger rules, or animation patterns.
- Update [`layout.md`](./layout.md) after changing hero composition, hero scroll-driven shade behavior, footer underlay behavior, overflow behavior, anchored media rules, or other layout patterns that are meant to be reused.
- Keep documentation aligned with the implemented state, not the previous design discussion.

## Reference Docs
- [`MOTION.md`](./MOTION.md) — open this before adding or changing scroll reveals, staggered entrances, hover motion, or marquee loops. Use it for motion principles, current timing values, and reusable data-attribute patterns.
- [`layout.md`](./layout.md) — open this before changing hero overflow, hero scroll-driven shade behavior, footer underlay/full-bleed behavior, anchored media behavior, topbar/hero stacking, or desktop image cropping rules.

## Figma Source
- **File**: "Gearbox Landing 12" (Figma Desktop MCP)
- **Desktop frame**: node `1:1844` (1400×6215)
- **Tablet frame**: node `3:376`
- **Key sections** (node IDs):
  - Menu: `1:1845`
  - HeroSection: `2:389`
  - Stats: `81:1707`
  - Constraints: `85:1722`
  - Segregated Accounts: `96:3822`
  - Demo: `88:1872`
  - Partners: `96:4671`
  - Testimonials: `95:3421`
  - Products: `93:2601`
  - Security: `94:2706`
  - Footer: `96:3699`

## Design Tokens (from Figma variables)

### Colors

**Base**
| CSS Variable | Value   | Note    |
|-------------|---------|---------|
| --surface   | #ffffff |         |
| --page-bg   | #f2f2f3 | Page_Bg |
| --dark      | #000000 |         |

**Gray Scale (Figma Gray/50–950)**
| Figma     | CSS Variable    | Value   | Semantic Alias |
|-----------|-----------------|---------|----------------|
| Gray/50   | --gray-50       | #f1f1f4 |                |
| Gray/100  | --gray-100      | #d8d8df | --surface-line |
| Gray/200  | --gray-200      | #bfc0ca |                |
| Gray/300  | --gray-300      | #a7a8b4 |                |
| Gray/400  | --gray-400      | #90919d |                |
| Gray/500  | --gray-500      | #797b86 | --muted        |
| Gray/600  | --gray-600      | #64666d |                |
| Gray/700  | --gray-700      | #4f5054 | jumbo/700      |
| Gray/800  | --gray-800      | #3a3a3c |                |
| Gray/900  | --gray-900      | #242424 |                |
| Gray/950  | --gray-950      | #0d0d0d | --text         |

**Accent**
| Figma       | CSS Variable  | Value   |
|-------------|---------------|---------|
| Pink_Bg     | --pink-bg     | #fddbf0 |
| Pink_Accent | --pink-accent | #f4129a |

### Accent Gradients (constraint/product cards)
| Name   | From      | To (50% opacity)           |
|--------|-----------|----------------------------|
| Blue   | #d5e5f2   | rgba(213, 229, 242, 0.5)   |
| Violet | #e5e0f4   | rgba(229, 224, 244, 0.5)   |
| Green  | #d6eae2   | rgba(214, 234, 226, 0.5)   |
| Gray   | #e0e4ec   | rgba(224, 228, 236, 0.5)   |

### Product Card Borders
| Variant | Border    |
|---------|-----------|
| Blue    | #c4dcf0   |
| Violet  | #e0d8fa   |

### Typography (Desktop)
| Token             | Size | Weight | Line-height |
|-------------------|------|--------|-------------|
| Desktop/H1        | 64px | 700    | 1.2         |
| Desktop/Subtitle/H1 | 28px | 500 | 1.4         |
| Desktop/H2        | 64px | 600    | 1.08        |
| Desktop/Subtitle/H2 | 24px | 500 | 1.4         |

- `section-title-heading` and `footer-top h2` share the same heading family token `--section-heading-family`.

### Spacing
| Token        | Value |
|--------------|-------|
| Paddings     | 72px  |
| Paddings/L   | 72px  |
| Paddings/M   | 48px  |
| Paddings/S   | 32px  |
| Paddings/XS  | 24px  |
| Paddings/XXS | 16px  |

### Radius
| Token            | Value |
|------------------|-------|
| Radius/Container | 64px  |

## Responsive Breakpoints
- **Desktop**: >1199px (max-width: 1400px container)
- **Tablet**: ≤1199px (max-width: 1024px container)
- **Mobile**: ≤767px (max-width: 360px container)

## Button System
- `src/components/ui/ButtonLink.astro` is the single source of truth for button variants and sizes.
- For new code use explicit button sizes via `size="l"` or `size="m"`. The old `small` prop is a compatibility alias for `m` and should not be used in new markup.
- `button-size-l` is the topbar/reference size:
  - Desktop / tablet: `50px` height, `10px 20px` padding, `16px` label size
  - Mobile: `32px` height, `6px 12px` padding, `13px` label size
- `button-size-m` is the compact size:
  - Desktop / tablet: `40px` height, `8px 16px` padding, `14px` label size
  - Mobile: `28px` height, `5px 10px` padding, `12px` label size
- Arrow button right padding must stay size-dependent:
  - `L`: `9px` desktop / `6px` mobile
  - `M`: `8px` desktop / `5px` mobile
- Non-arrow `button-light-l` and `button-dark-l` must share the same `L` height and padding values.
- Non-arrow `button-light-m` and `button-dark-m` must share the same `M` height and padding values.
- Arrow button geometry is size-driven, not color-variant-driven. `button-light-arrow-l` and `button-dark-arrow-l` must share the same `L` height and padding values.
- `button-light-arrow-m` and `button-dark-arrow-m` must share the same `M` height and padding values.
- Light buttons are the canonical geometry reference. Dark buttons must be built as color-inverted equivalents of the matching light size/arrow form, not as independently tuned shapes.
- Button size tokens must control all button geometry: height, padding, arrow-circle box size, arrow glyph size, and arrow motion offset.
- Arrow circle sizes must stay size-dependent:
  - `L`: `30px` desktop / `20px` mobile
  - `M`: `24px` desktop / `18px` mobile

## Storybook Rules
- `src/pages/storybook.astro` is the storybook source of truth. Do not recreate static HTML snapshots for the component catalog.
- Storybook must reuse live Astro components or shared UI primitives wherever possible.
- In the buttons story, paired light/dark variants with matching size/arrow attributes should be shown side by side in a shared comparison card.
- Add explicit light/dark pairs for both `L` and `M` where the component family supports them, and use matching copy inside each pair so geometry can be compared directly.
- Each compare row or standalone card must keep the visible `Component ID` next to the live component preview.
- Comparison IDs for the side-by-side button pairs use the `2` postfix: e.g. `button-light-l2`, `button-dark-l2`.
- Keep button variants grouped by visual family, and only pair variants together when they are a deliberate light/dark comparison set.
- Every button size/variant combination needs its own unique `Component ID` in storybook.

## Component Naming (Figma → CSS)
| Figma Component              | CSS Class              |
|------------------------------|------------------------|
| Menu                         | .topbar                |
| Sections/Stats               | .stats-strip           |
| Sections/Constraints         | .constraints-panel     |
| Sections/Segregated_Accounts | .accounts-panel        |
| Sections/Demo                | .demo-panel            |
| Sections/Partners            | .partner-strip         |
| Sections/Testimonials        | .testimonials-grid     |
| Sections/Products            | .products-panel        |
| Sections/Security            | .security-panel        |
| Footer                       | .footer-card           |
| Button_Primary               | .button                |
| Constraint/One–Four           | .constraint-card       |
| Product_Card_1               | .product-card-blue     |
| Product_Card_2               | .product-card-violet   |

## Known Issues
- Missing intermediate breakpoint (768–1199px) for footer grid and some sections
- Testimonial names have fixed 251px width — no ellipsis handling
- Feature icon positioning uses fragile percentage-based insets
- `line-height: 1` on h3 (40px) can cause overlap on text wrap

## Working with Figma MCP
- Use `mcp__figma-desktop__get_variable_defs` with a selected node to get design tokens
- Use `mcp__figma-desktop__get_design_context` with node IDs from the table above
- Always compare Figma output with current CSS before making changes
- Figma-derived assets used by the site are stored locally under semantic folders in `public/assets/`; keep local references in sync with the design when replacing them.
- If a new asset is imported from Figma, rename it to a semantic filename before wiring it into the project.

## When to Use Motion Reference
- Open [`MOTION.md`](./MOTION.md) before introducing any new viewport reveal or stagger logic.
- Open [`MOTION.md`](./MOTION.md) before changing button hover or arrow micro-interactions.
- On reverse scroll, reveal patterns should show content immediately on intersection instead of waiting for downward thresholds.
- Reuse the documented motion hooks and timing values unless the design explicitly requires a new pattern.

## When to Use Layout Reference
- Open [`layout.md`](./layout.md) before changing the desktop hero image behavior.
- Open [`layout.md`](./layout.md) before touching protruding media, right-anchored crops, or hero/topbar layer order.
- Open [`layout.md`](./layout.md) before changing the lower hero gradient, its scroll mapping, or the way the shade grows with scroll.
- Hero shade changes must keep the growth mapping and static gradient values documented together, since they are one scroll-driven pattern.
- Open [`layout.md`](./layout.md) before changing the footer background termination, full-bleed underlay, or bottom-of-page color treatment.
- Reuse the documented desktop hero pattern unless the design explicitly requires a different composition.

## Account Preview Rules
- `Identified Person` must stay on one line and be centered both horizontally and vertically inside its pill.
- `User Account` desktop label should use the Figma desktop coordinates from `Credit_Account_Preview` (`left: 129px; top: 53px`).
- Desktop tab labels should follow Figma coordinates inside their tab containers (`Debt left: 68px; top: 17px`, `Collateral left: 62px; top: 17px` in the current swapped layout).
- `Eligibility Check` desktop label should use the Figma desktop coordinates inside its row (`left: 82px; top: 0`).
