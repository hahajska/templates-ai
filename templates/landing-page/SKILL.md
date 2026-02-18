---
name: Landing Page
goal: Help users build and evolve a marketing page by composing focused sections with clear hierarchy and conversion actions
stack:
  - React 18
  - Vite 5
  - Tailwind CSS (CDN)
  - lucide-react
shadcn-components:
  - Button
  - Card
---

## Purpose
A modular marketing landing page template that balances clear messaging, feature highlights, and a compact footer.

## Components in Use
- `App.js`: Assembles page sections in order.
- `components/Hero.js`: Primary headline, value proposition, and top-level CTAs.
- `components/Features.js`: Feature card grid with icon, title, and description.
- `components/Footer.js`: Secondary navigation and brand/legal row.
- `styles.css`: Custom hero gradient effect only.

## Extension Patterns
### Add a new section
1. Create `components/<SectionName>.js` for the new block.
2. Keep the section self-contained with its own text/data array.
3. Import it in `App.js` and place it in the desired flow.
4. Use consistent container widths (`max-w-4xl` or `max-w-6xl`) and spacing.

### Expand feature cards
1. Extend the `features` array in `components/Features.js` with new fields (for example `badge` or `link`).
2. Update card markup to render the new fields.
3. Keep card visual rhythm consistent across all entries.
4. Ensure any interactive element has discernible text.

### Wire hero CTAs to page anchors
1. Add `id` attributes to target sections.
2. Convert relevant buttons in `components/Hero.js` to links when navigation intent is in-page movement.
3. Keep primary/secondary visual hierarchy intact.
4. Validate keyboard navigation and focus indicators.

## Do
- Keep content-focused logic inside each section component.
- Reuse token classes for consistent visual language.
- Maintain semantic headings and responsive spacing across breakpoints.

## Don't
- Do not collapse all sections into one large component.
- Do not add routing or backend-driven data for basic static landing behavior.
- Do not introduce non-`lucide-react` icons without explicit approval.
