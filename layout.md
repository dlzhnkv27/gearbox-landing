# Layout Patterns

## Desktop Hero

Use this pattern before changing the desktop hero image, its overflow behavior, or the stacking with the topbar.

### Intent
- Keep the hero card rounded.
- Let the image protrude above the card by exactly `93px`.
- Keep the image anchored to the hero card on the `right` and `bottom`.
- On desktop, crop extra width from the `left` side only when the viewport narrows.
- Keep the text inside an invisible right-anchored content box rather than centered in the hero.
- Keep the visual solution retina-safe with a local `@2x` asset.

### Current Structure
- `src/components/sections/HeroSection.astro` uses two image layers from the same asset:
  - `hero-overhang`: the top protruding strip
  - `hero-surface`: the image inside the rounded hero card
- Both layers use the same local source from `src/data/landing.js`.

### Current Desktop Rules
- Asset: `public/assets/hero/hero-cityscape@2x.png`
- Rendered desktop width: `1400px`
- Overhang height: `93px`
- Lower shade overlay base height: `180px`
- Text box width: `934px`
- Text box right inset: `80px`
- At `1400px` hero width this produces a `386px` left inset; as the viewport narrows, that left inset is consumed before the text box starts shrinking.
- The text layer is lifted `8px` higher than the previous desktop position.
- Hero card keeps `border-radius` on the main surface only.
- `hero-overhang` sits above the card and shows only the top strip.
- `hero-image-base` is fixed to `right: 0` and `bottom: 0`.
- `hero-shade` is scroll-driven: its bottom stays fixed while its top edge rises smoothly as page scroll progresses.
- Current shade mapping is linear:
  - progress `0` → extra height `0%` of hero height
  - progress `1` → extra height `100%` of hero height
- Shade opacity stops also remap linearly with the same progress:
  - top stop `0 -> 0.6`
  - bottom stop `0.96 -> 1`
- Progress is derived from page scroll distance relative to the current hero height, so the gradient can visually extend beyond the image bounds while remaining clipped by the hero surface.
- Because the rendered width stays fixed at `1400px`, narrowing the window crops the image from the left while the right edge stays locked.

### Why It Is Split Into Two Layers
- A single overflowing image caused visual issues with the rounded top edge.
- Splitting the image preserves the rounded container and still allows the top part of the artwork to sit outside the card.
- The overhang and the surface remain visually seamless because they come from the same source image.

### Desktop-Only Constraint
- This right-anchored overflow behavior is for desktop only.
- Tablet and mobile must fall back to a contained image treatment without the protruding strip unless a layout update explicitly changes that rule.

### When To Reopen This File
- Before changing hero height, image crop, or image anchoring.
- Before changing topbar/hero stacking order.
- Before changing the scroll-driven lower gradient or its progress mapping.
- Before replacing the hero asset with a different aspect ratio.
- Before reworking border-radius or overflow behavior in the hero section.

## Footer Underlay

Use this pattern before changing the footer background treatment, full-bleed behavior, or the way the page terminates at the bottom edge.

### Intent
- Keep the footer card itself constrained to the page container.
- Add a black full-bleed underlay behind the footer area.
- Extend that underlay to the left and right screen edges.
- Extend that underlay through the shell bottom padding so the page ends on black below the footer.

### Current Structure
- `src/components/sections/FooterSection.astro` uses:
  - `footer-stage`: layout wrapper and full-bleed underlay host
  - `footer-card`: the rounded media card itself
- The reveal hook lives on `footer-stage`, so the underlay and the card enter together.

### Current Rules
- `footer-stage::before` creates the black underlay.
- The underlay expands to viewport width with:
  - `left: calc(50% - 50vw)`
  - `right: calc(50% - 50vw)`
- The underlay extends below the component by the current shell padding with:
  - `bottom: calc(var(--page-shell-padding) * -1)`
- `footer-background` fades into that black underlay on the left and right edges with an `80px` mask per side.
- `page-shell` owns the shell padding token:
  - Desktop / tablet: `24px`
  - Mobile: `8px`

### When To Reopen This File
- Before changing footer full-bleed background behavior.
- Before changing the page-ending background below the footer.
- Before moving footer reveal hooks between wrapper and card.
