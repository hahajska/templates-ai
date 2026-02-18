# Template Rules

## Architecture
- `App.js` MUST compose page sections and MUST keep section order as `Hero`, then `Features`, then `Footer` unless the user explicitly asks to change the flow.
- `Hero.js`, `Features.js`, and `Footer.js` MUST own their section markup and section-local data.
- `styles.css` MUST stay reserved for CSS that utilities cannot cover (currently the hero background effect).

## File Rules
- New sections MUST be added as separate files in `components/` and imported into `App.js`.
- Section-specific arrays and text content SHOULD stay in the section component unless multiple sections need the same data.
- `index.html` MUST preserve the Tailwind CDN script and existing token names.

## Constraints
- Use plain JavaScript (`.js`) files only; NEVER introduce TypeScript.
- NEVER use Next.js APIs, server-side code, routing frameworks, or Node-only APIs.
- Icons MUST come from `lucide-react` unless the user explicitly approves another icon source.
- NEVER add npm packages without explicit user approval.
- Keep template changes within platform limits (maximum 30 files and 250 KB total template size).

## Style
- Use Tailwind utility classes and shadcn-style tokens (`bg-background`, `text-foreground`, `border-border`, etc.).
- Maintain semantic heading hierarchy (`h1` in hero, `h2` for features section heading).
- All links and buttons MUST have discernible text and visible focus styles.
