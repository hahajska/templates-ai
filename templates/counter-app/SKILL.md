---
name: Counter App
goal: Help users extend a small counter experience while preserving template constraints and visual consistency
stack:
  - React 18
  - Vite 5
  - Tailwind CSS (CDN)
shadcn-components:
  - Card
  - Button
---

## Purpose
A focused single-screen counter template for quick interaction features (step changes, bounds, reset patterns, and lightweight status messaging).

## Components in Use
- `App.js`: Owns counter state and renders the full UI.
- `styles.css`: Defines the fade animation used when count changes.
- `index.html`: Provides Tailwind CDN setup and shared design tokens.

## Extension Patterns
### Add step-size controls
1. In `App.js`, add `step` state (`useState(1)`).
2. Add an input or button group to update step size.
3. Change increment/decrement handlers to use `step`.
4. Keep `key={count}` on the count display so animation still runs per update.

### Add min/max bounds
1. Add `min` and `max` values in `App.js`.
2. Clamp next count values in update handlers.
3. Disable increment/decrement controls at bounds.
4. Reflect bound state with muted styling and descriptive button labels.

### Add action history
1. Add `history` state in `App.js` to track events.
2. Push entries inside increment/decrement/reset handlers.
3. Render a second card below the counter for recent actions.
4. If layout becomes dense, extract display-only pieces into `components/`.

## Do
- Prefer functional updates (`setCount((current) => current + step)`) when based on previous state.
- Keep styling token-based and Tailwind utility-first.
- Preserve keyboard accessibility and focus visibility on controls.

## Don't
- Do not move simple counter state into global state libraries.
- Do not replace utility classes with large custom CSS blocks.
- Do not add dependencies for behavior that can be built with React state and existing utilities.
