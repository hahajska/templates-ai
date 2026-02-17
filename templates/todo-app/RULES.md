# Template Rules

## Design Tokens
- Uses shadcn/ui neutral palette defined via Tailwind CDN config in index.html.
- Core tokens: background, foreground, card, primary, secondary, muted, accent, destructive, border, input, ring.
- Reference tokens by Tailwind class (e.g. `bg-primary`, `text-muted-foreground`).

## Structure Rules
- State lives in `App.js` and is passed down via props.
- Components: `AddTodo` (form), `TodoList` (list wrapper), `TodoItem` (single item).
- Preserve component boundaries — do not merge components without explicit request.
- New features should follow the existing prop-drilling pattern.

## Accessibility Rules
- Form inputs must have associated labels or placeholder text.
- Interactive elements (checkboxes, delete buttons) must be keyboard accessible.
- Maintain visible focus outlines on all interactive elements.

## Constraints
- No Next.js APIs.
- No TypeScript — plain .js files only.
- Keep styling in Tailwind utility classes.
- Icons come from `lucide-react` only.
- Do not add server-side dependencies or persistent storage.
