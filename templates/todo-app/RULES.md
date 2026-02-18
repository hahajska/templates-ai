# Template Rules

## Architecture
- `App.js` MUST own the `todos` state and the core handlers for add, toggle, and delete.
- `AddTodo`, `TodoList`, and `TodoItem` MUST remain separate components with data passed via props.
- Derived values (like remaining count and filtered lists) SHOULD be computed in `App.js` and passed down.

## File Rules
- When adding todo fields (for example `priority` or `dueDate`), update the todo object shape in `App.js` first, then propagate props to `components/`.
- New UI pieces for this template MUST live in `components/` unless the change is tiny and local to one existing component.
- `index.html` MUST preserve the Tailwind CDN setup and existing token names.

## Constraints
- Use plain JavaScript (`.js`) files only; NEVER introduce TypeScript.
- NEVER use Next.js APIs, server-side code, Node-only APIs, or backend calls.
- Do not add persistent storage (localStorage, indexedDB, database sync) unless explicitly requested.
- Icons MUST come from `lucide-react` unless explicitly approved otherwise.
- NEVER add npm packages without explicit user approval.
- Keep template changes within platform limits (maximum 30 files and 250 KB total template size).

## Style
- Use Tailwind utility classes and existing token classes (`bg-card`, `text-muted-foreground`, `border-border`, etc.).
- Keep the card-based layout and simple list readability patterns (borders, spacing, muted metadata text).
- Icon-only buttons MUST include an `aria-label`, and all interactive controls MUST keep visible focus styles.
