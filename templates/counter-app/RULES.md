# Template Rules

## Architecture
- `index.js` MUST remain the React mount bootstrap and MUST NOT contain feature logic.
- Counter state MUST live in `App.js` as local React state.
- `styles.css` MUST stay limited to global CSS that Tailwind utilities cannot express (for this template: animation keyframes).

## File Rules
- For typical counter changes (step size, bounds, extra buttons), edit `App.js` first instead of creating new files.
- Create `components/` only when adding a clearly separate UI block that improves readability or reuse.
- `index.html` MUST keep the Tailwind CDN setup and the existing token names (`background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`).

## Constraints
- Use plain JavaScript (`.js`) files only; NEVER introduce TypeScript.
- NEVER use Next.js APIs, server-side rendering, or Node-only APIs.
- NEVER add npm packages without explicit user approval.
- Keep template changes within platform limits (maximum 30 files and 250 KB total template size).

## Style
- Use Tailwind utility classes and token-based classes such as `bg-primary` and `text-muted-foreground`.
- Preserve the centered card layout and the count-change fade animation behavior.
- Interactive controls MUST keep visible keyboard focus styles and discernible labels.
