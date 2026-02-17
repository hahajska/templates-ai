# Template Rules

## Design Tokens
- Uses shadcn/ui neutral palette defined via Tailwind CDN config in index.html.
- Core tokens: background, foreground, card, primary, secondary, muted, accent, destructive, border, input, ring.
- Reference tokens by Tailwind class (e.g. `bg-primary`, `text-muted-foreground`).

## Structure Rules
- Page is composed of three section components: `Hero`, `Features`, `Footer`.
- Add new sections as separate component files in `components/`.
- Preserve the Hero → Features → Footer ordering unless explicitly changed.

## Accessibility Rules
- All links and buttons must have discernible text.
- Maintain semantic heading hierarchy (h1 in Hero, h2 in Features).
- Ensure sufficient color contrast on all text.

## Constraints
- No Next.js APIs.
- No TypeScript — plain .js files only.
- Keep styling in Tailwind utility classes; use styles.css only for custom gradients.
- Icons come from `lucide-react` only.
- Do not add server-side dependencies or routing.
