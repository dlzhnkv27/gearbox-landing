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
- Imported product asset icons should live under `public/assets/tokens/` and partner logos under `public/assets/partners/`.
- Imported security icons should live under `public/assets/security/` and be wired through the section data layer, not hardcoded in component markup.

## Documentation Sync
- Update `CLAUDE.md` after structural changes to pages, components, styling source of truth, or project conventions.
- Update [`MOTION.md`](./MOTION.md) after changing reveal timing, hover motion, stagger rules, or animation patterns.
- Update [`layout.md`](./layout.md) after changing hero composition, hero scroll-driven shade behavior, footer underlay behavior, overflow behavior, anchored media rules, or other layout patterns that are meant to be reused.
- Keep documentation aligned with the implemented state, not the previous design discussion.

## External Data Rules
- Do not bind UI components directly to external API response shapes.
- Treat external data in 4 layers:
  - `source layer`: fetch raw payloads from the remote endpoint
  - `mapping / normalization layer`: convert the remote payload into stable project-local keys
  - `formatting layer`: convert raw numbers into display strings such as compact currency, compact counts, percentages, years
  - `view-model layer`: prepare the exact UI-facing structure that a section needs
- Prefer stable internal field names even if the external API naming changes.
- Keep formatting logic out of `.astro` templates and out of section markup. Components should render already-mapped values or values with an explicit formatter key.
- Store successfully fetched values as raw data, not only as already formatted display strings.
- When using browser-side persistence, save a versioned cache object shaped like:
  - `version`
  - `updatedAt`
  - `data`
- For landing metrics, use a `stale-while-revalidate` pattern:
  - render static fallback values from `src/data/landing.js`
  - hydrate from the last successful local cache if present
  - request fresh data from the API in the background
  - show a lightweight loading indicator while fresh data is being requested
  - replace the UI and refresh the cache after a successful response
  - keep cached or fallback values visible if the refresh fails
- If an external API requires secrets or does not allow browser CORS, do not call it directly from the client. Add a proxy/server endpoint first.
- New remote fields should be added by extending the mapper/config, not by hardcoding fetch logic inside individual sections.
- Current reference implementation:
  - `stats-strip`
  - source: `stakingStats`
  - endpoint: `https://charts-server.fly.dev/api/staking_stats`
  - field: `txVolume`
  - formatter: `currencyCompactPlus`

## Reference Docs
- [`MOTION.md`](./MOTION.md) — open this before adding or changing scroll reveals, staggered entrances, hover motion, marquee loops, or slow decorative rotations. Use it for motion principles, current timing values, and reusable data-attribute patterns.
- [`layout.md`](./layout.md) — open this before changing hero overflow, hero overlay/gradient behavior, footer underlay/full-bleed behavior, anchored media behavior, topbar/hero stacking, desktop image cropping rules, or the decorative `Constraints` artwork.

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

## Mobile Layout Rules
- Mobile topbar must keep three visible elements in one horizontal row: menu button on the left, logo centered, `dApp` button on the right.
- The mobile menu uses the same topbar menu button for open and close states; the three bars morph into a close icon while the overlay is open.
- Mobile menu button styling is a white `32×32` circle with black bars, matching the height of the mobile `dApp` button.
- Mobile stats pills use a two-sided layout: label aligned left, value aligned right, spinner attached to the value side.
- In mobile product cards, the `Supported Assets` / `Collateral Types` row stays on one line with the label on the left and the asset icons right-aligned.
- In the mobile footer, each link group keeps its heading on a full-width first row and the links wrap horizontally beneath it. The footer title should use the full container width instead of a narrow max-width cap.

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
- Partner pill IDs should reflect the actual production brands currently rendered by the live data source.

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
- Open [`MOTION.md`](./MOTION.md) before changing slow decorative looping motion such as the `Constraints` cycles artwork.
- On reverse scroll, reveal patterns should show content immediately on intersection instead of waiting for downward thresholds.
- Footer is intentionally excluded from the shared section reveal pattern and should stay visible unless a layout change explicitly reintroduces motion there.
- Reuse the documented motion hooks and timing values unless the design explicitly requires a new pattern.

## When to Use Layout Reference
- Open [`layout.md`](./layout.md) before changing the desktop hero image behavior.
- Open [`layout.md`](./layout.md) before touching protruding media, right-anchored crops, or hero/topbar layer order.
- Open [`layout.md`](./layout.md) before changing the hero darkening overlay, the lower hero gradient, or their current scroll/static split.
- Open [`layout.md`](./layout.md) before changing the `Constraints` decorative artwork, its masked overflow, or its placement anchor.
- Open [`layout.md`](./layout.md) before changing the footer background termination, full-bleed underlay, or bottom-of-page color treatment.
- Reuse the documented desktop hero pattern unless the design explicitly requires a different composition.

## Trusted Partners Rules
- `Trusted Partners` pills use production SVG logos, not neutral placeholders.
- Logo slot size is `152×44` on desktop, `132×38` on tablet, and `108×31` on mobile.
- Each pill should render one centered logo image with `object-fit: contain`; do not compose multi-part partner marks in CSS.

## Security Section Rules
- `SecurityCard` uses a dedicated icon base plus label structure.
- The icon base is a `56×56` circle with background `var(--gray-950)`.
- The security SVG lives inside that base as the foreground mark and should stay `object-fit: contain`.
- Keep security icons sourced from `src/data/landing.js`, not hardcoded per card.

## Scroll Rules
- Page-local anchor links should use smooth scrolling by default.
- Under `prefers-reduced-motion: reduce`, smooth scrolling should be disabled and the browser should fall back to immediate jumps.

## Constraints Section Rules
- `Constraints` uses `public/assets/constraints/constraints-cycles.svg` as a decorative underlay.
- The artwork sits on the `constraints-panel`, not inside the text column.
- The panel itself is the mask through `overflow: hidden`.
- Desktop panel min-height: `780px`.
- Desktop size: `864px`; tablet size: `672px`; mobile: hidden.
- Placement rule: offset the artwork by `-50%` of its current width on both `left` and `bottom`.
- Motion rule: clockwise rotation, `72s linear infinite`, disabled under `prefers-reduced-motion: reduce`.
- Section reveal threshold is `100px`, not `150px`.
- Desktop cards use a container-held active state on `.constraint-list`, so moving across the gaps does not collapse the active card.
- Desktop card split:
  - default: `25% / 25% / 25% / 25%`
  - active: `45%`
  - remaining cards share the remaining `55%`
- Desktop expansion animation:
  - property: `flex-grow`
  - duration: `250ms`
  - easing: `cubic-bezier(0.42, 0, 0.22, 1.04)`
- Expanded desktop cards reveal body copy from the per-card `body` field in `src/data/landing.js`.
- Constraint body text token:
  - family: `Inter`
  - size: `15px`
  - weight: `400`
  - line-height: `1.4`
- Body copy is hidden on mobile.

## Accounts Section Rules
- `Segregated Accounts` widens its centered subtitle through the `.accounts-title` modifier.
- Desktop subtitle max-width for this section is `960px` so the current copy stays on one line.

## Account Preview Rules
- `Identified Person` must stay on one line and be centered both horizontally and vertically inside its pill.
- `User Account` desktop label should use the Figma desktop coordinates from `Credit_Account_Preview` (`left: 129px; top: 53px`).
- Desktop pill geometry should use the single local asset `account-preview-pill.svg`; do not reconstruct the pill from separate tab SVGs, hand-drawn CSS, or stretched background approximations.
- `Collateral` and `Debt` should stay as overlaid text layers on top of the single pill SVG, not baked into component CSS geometry.
- Desktop tab labels should keep their current overlaid layout:
  - both labels use `width: 188.264px` and `text-align: center`
  - `Collateral`: `left: 18.74px; top: 127px; transform: translateX(15.06px)`
  - `Debt`: `left: 211px; top: 127px; transform: translateX(-15.06px)`
- `Eligibility Check` desktop label should use the current Figma desktop coordinates inside the canvas (`left: 147px; top: 255px`).
