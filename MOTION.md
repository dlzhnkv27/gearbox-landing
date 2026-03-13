# Motion Patterns

## When to open this file
- Open this file before adding any new scroll reveal, staggered entrance, hover motion, or looping marquee animation.
- Use it when a component needs motion behavior that should stay consistent with the existing site.
- Check it before changing durations, easing, or reveal rules in `public/app.js` or `src/styles/global.css`.

## Principles
- Motion must support hierarchy, not decorate randomly.
- Entrance animations should replay only on downward re-entry when the pattern explicitly calls for scroll-based reveal.
- If an element enters the viewport while the user scrolls upward, it should appear in its final state without replaying the reveal.
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
- Upward entry: reveal instantly with no animation.
- After the element leaves the viewport, reset it so the next downward re-entry can animate again.

## Section Reveal Pattern
- Block hook: `[data-motion-block]`
- Visibility trigger: `data-motion-min-visible="150"`
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
- Minimum visible area in viewport: `150px`
- Duration: `700ms`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Distance:
  - Desktop / tablet: `28px`
  - Mobile: `18px`

### Behavior rules
- Downward entry: reveal the whole block at once on every new re-entry.
- Upward entry: show the block immediately in its final state.
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

## Implementation Rule
- If a new motion request matches one of these patterns, extend the existing hooks and timing tokens instead of inventing a new custom animation model.
