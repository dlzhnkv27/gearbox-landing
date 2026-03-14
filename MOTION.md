# Motion Patterns

## When to open this file
- Open this file before adding any new scroll reveal, staggered entrance, hover motion, or looping marquee animation.
- Use it when a component needs motion behavior that should stay consistent with the existing site.
- Check it before changing durations, easing, reveal rules, or scroll-driven visual responses in `public/app.js` or `src/styles/global.css`.

## Principles
- Motion must support hierarchy, not decorate randomly.
- Entrance animations should replay only on downward re-entry when the pattern explicitly calls for scroll-based reveal.
- If an element enters the viewport while the user scrolls upward, it should appear in its final state without replaying the reveal.
- Scroll-driven visual responses should be continuous unless a design explicitly calls for discrete steps.
- Respect `prefers-reduced-motion: reduce` by revealing content without movement.
- Reuse data-attribute hooks before introducing component-specific JS.

## Viewport Reveal Pattern
- Group hook: `[data-motion-group]`
- Item hook: `[data-motion-item]`
- Animated content hook: `[data-motion-content="move-up-fade-in"]`
- Current reference implementation: `stats-strip`

### Current reference settings
- Threshold: `0.5`
- Stagger step: `150ms`
- Duration: `700ms`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Distance:
  - Desktop / tablet: `18px`
  - Mobile: `10px`

### Behavior rules
- Downward entry: animate with move-up + fade-in on every new re-entry.
- In `stats-strip`, the animated target is the whole `stat-pill`, not only the inner copy.
- Upward entry: reveal instantly with no animation as soon as the item starts intersecting the viewport; do not wait for the downward threshold.
- After the element leaves the viewport, reset it so the next downward re-entry can animate again.

## Section Reveal Pattern
- Block hook: `[data-motion-block]`
- Visibility trigger: `data-motion-min-visible="100"`
- Animated content hook: `[data-motion-content="block-reveal"]`
- Current reference implementations:
  - `constraints-panel`
  - `accounts-panel`
  - `demo-panel`
  - `partners-group`
  - `products-panel`
  - `security-panel`
  - `footer-card`

### Current reference settings
- Minimum visible area in viewport: `100px`
- Duration: `700ms`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Distance:
  - Desktop / tablet: `28px`
  - Mobile: `18px`

### Behavior rules
- Downward entry: reveal the whole block at once on every new re-entry.
- Upward entry: show the block immediately in its final state as soon as it starts intersecting the viewport; do not wait for `data-motion-min-visible`.
- After the block leaves the viewport, reset it so the next downward re-entry can animate again.

## Hover Expansion Pattern
- Reference: buttons
- Use a pseudo-element for the visual expansion so layout does not move.
- Current reference settings:
  - Background expansion: `4px`
  - Duration: `100ms`
  - Easing: `cubic-bezier(0.6, 0, 1, 1)`

## Arrow Loop Pattern
- Reference: arrow inside CTA button circle
- Keep the circle as a mask and animate only on hover-in.
- Current reference settings:
  - Duration: `300ms`
  - Easing: `ease-in-out`
- Hidden arrow states must stay fully outside the mask before and after animation.

## Marquee Pattern
- Reference: `Trusted Partners`
- Use duplicated tracks for a seamless loop.
- Apply a soft edge fade on the marquee viewport so logos do not hard-cut at the left and right edges.
- Current edge fade: `32px` per side.
- Disable the animation under `prefers-reduced-motion: reduce`.

## Scroll-Driven Hero Darkening Pattern
- Reference: solid black overlay in `hero`
- Use a continuous scroll-progress value, not stepped thresholds.
- Keep the overlay mapped directly to hero scroll progress.

### Current reference settings
- Progress source: `window.scrollY / hero height`
- Progress clamp: `0..1`
- Overlay mapping:
  - progress `0` → opacity `0`
  - progress `1` → opacity `1`
- The lower hero gradient is no longer scroll-driven. It stays static at:
  - Desktop: `180px`
  - Tablet: `130px`
  - Mobile: `138px`
  - top stop: `0`
  - bottom stop: `1`

### Behavior rules
- Downward scroll: increase overlay opacity smoothly as progress grows.
- Upward scroll: reduce overlay opacity smoothly as progress decreases.
- Under `prefers-reduced-motion: reduce`, keep the overlay at `0` opacity with no scroll response.

## Decorative Spin Pattern
- Reference: `Constraints` cycles artwork
- Use for slow decorative background rotation only, not for primary content.

### Current reference settings
- Direction: clockwise
- Duration: `72s`
- Timing: `linear`
- Iteration: `infinite`

### Behavior rules
- Decorative spin must remain subtle and slow enough to read as atmospheric motion, not as interactive feedback.
- Disable the rotation under `prefers-reduced-motion: reduce`.

## Constraint Card Expansion Pattern
- Reference: desktop cards in `Constraints`
- Use a container-held active state so pointer travel across gaps does not reset the expanded card.

### Current reference settings
- Scope: desktop only (`min-width: 1200px`)
- Active state host: `.constraint-list[data-active-index]`
- Card size model:
  - default: each card `25%`
  - active: one card `45%`
  - remaining three cards share the remaining `55%`
- Size transition:
  - property: `flex-grow`
  - duration: `250ms`
  - easing: `cubic-bezier(0.42, 0, 0.22, 1.04)`
- Body text reveal:
  - font: `Inter`
  - size: `15px`
  - weight: `400`
  - line-height: `1.4`
  - reveal duration: `250ms` for layout/transform, `200ms` for opacity

### Behavior rules
- The active card stays expanded while the pointer remains anywhere inside `.constraint-list`.
- The active state resets only when the pointer leaves the whole list.
- Body copy is visible only for the active desktop card.
- On mobile, the body copy stays hidden.

## Implementation Rule
- If a new motion request matches one of these patterns, extend the existing hooks and timing tokens instead of inventing a new custom animation model.
