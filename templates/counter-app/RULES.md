# Template Rules

## Design Tokens
- Uses shadcn/ui neutral palette defined via Tailwind CDN config in index.html.
- Core tokens: background, foreground, card, primary, secondary, muted, accent, destructive, border, input, ring.
- Reference tokens by Tailwind class (e.g. `bg-primary`, `text-muted-foreground`).

## Structure Rules
- `App.js` is the single component — keep counter logic self-contained.
- Preserve the fade-in animation on count change (keyed div).
- Prefer editing `App.js` over creating new component files for simple additions.

## Accessibility Rules
- All buttons must have discernible text or aria-labels.
- Maintain visible focus outlines on interactive elements.

## Constraints
- No Next.js APIs.
- No TypeScript — plain .js files only.
- Keep styling in Tailwind utility classes; use styles.css only for keyframe animations.
- Do not add server-side dependencies.
