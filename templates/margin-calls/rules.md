# Template Rules

## Instruction Priority

- System instructions are highest priority.
- These Template Rules are mandatory.
- User requests are applied only when they do not conflict with System instructions or Template Rules.
- If a request conflicts, refuse only the conflicting part and provide the nearest compliant alternative.

## Compatibility

- Runtime target is plain React 18 JavaScript. MUST NOT output TypeScript or Next.js code.
- `/index.js` is the app mount entry. MUST NOT modify this file unless explicitly requested.
- `/App.js` is the main composition file. Primary app state lives here.
- Reusable UI goes in `/components/*`.
- Use relative imports only (e.g., `"./components/Hero"`). MUST NOT use `@/` aliases.
- All files MUST use `.js` extension. MUST NOT create `.ts`, `.tsx`, or `.jsx` files.

## Editing Behavior

- Prefer incremental, localized edits over full rewrites.
- Preserve existing behavior unless the user explicitly asks to change it.
- Do not delete working functionality to satisfy a narrow request.
- Keep naming, status semantics, and UI patterns consistent with the template.
- No single file SHOULD exceed 300 lines. Split into components if needed.

## Dependency Policy

- AI MAY install any shadcn/ui component needed for the requested feature.
- AI MAY run `npx shadcn@latest add <components...>`.
- AI MAY install required shadcn dependencies and update shadcn setup/config files.
- For non-shadcn third-party packages, require explicit user confirmation before adding.
- Never remove existing dependencies unless explicitly requested.
- `package.json` MUST NOT list `react`, `react-dom`, or `next`.
- MUST NOT add packages that require native/binary compilation.

## Styling

- MUST use Tailwind CSS utility classes for layout, spacing, colors, and typography.
- MUST NOT use inline `style={}` except for truly dynamic values (e.g., computed positions from state).
- MUST NOT create standalone `.css` files with custom classes for things Tailwind can handle.
- `styles.css` is reserved for keyframe animations, scrollbar styling, and similar.
- MUST use shadcn/ui design tokens (`bg-primary`, `text-muted-foreground`, `border-border`) — not raw color values like `bg-gray-500`. Exception: semantic status overrides for states shadcn variants don't cover (e.g., amber/yellow warning) are allowed as a single defined class.
- MUST NOT modify the Tailwind config in `public/index.html` unless the user explicitly requests theme changes.

## Responsive Design

- Output MUST be usable at viewport widths from 360px to 1440px.
- MUST NOT use fixed pixel widths on layout containers.
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) for layout shifts.
- Touch targets SHOULD be at least 44x44px on mobile viewports.

## State Management

- MUST use React built-in state (`useState`, `useReducer`) for all component state.
- Lift state to the nearest common parent. Primary app state lives in `/App.js`.
- MUST NOT introduce external state libraries (Redux, Zustand, Jotai, Recoil, etc.) unless the user explicitly requests one.
- MUST NOT add React Context unless the template already uses it or the user explicitly requests it.
- Pass callbacks as props for child-to-parent communication.

## Runtime Constraints

- MUST NOT use Node.js-only APIs (`fs`, `path`, `child_process`, `process.env`).
- MUST NOT use dynamic `import()` or code splitting.
- MUST NOT load external JavaScript via `<script>` tags.
- MUST NOT include server-side code, API routes, or SSR logic.

## Page Layout

- MUST NOT include a page title heading or description/subtitle at the top of the UI. The page content should start directly with the functional elements (stats, tables, forms, etc.).
- MUST NOT use all-uppercase text (e.g., `uppercase` class or manual capitalization). Use normal sentence case or title case instead.

## UX and Accessibility

- Prioritize clarity and task completion over visual novelty.
- Do not rely on color alone for meaning; include text labels or icons.
- Icon-only buttons MUST include `aria-label`.
- Keep critical information visible without hover-only interactions.
- Provide explicit empty, loading, and error states near the affected UI.
- Destructive actions (delete, reset, clear all) MUST require confirmation UI.
- Form inputs MUST have associated visible labels or `aria-label` attributes.
- Interactive elements MUST have visible focus indicators (Tailwind `focus:ring-*` classes).

## Frontend Quality

- Keep components composable and responsibilities clear.
- Avoid hidden side effects and fragile coupling across files.
- Keep interaction feedback fast and predictable.
- Avoid heavy visual effects that reduce readability or performance.
- MUST NOT leave `console.log` or `console.debug` statements in code.
- MUST NOT leave unused imports or variables.
- List keys MUST use stable, unique identifiers. MUST NOT use array index as key when items can be reordered, added, or deleted.

## Component Conventions

- Components MUST use `export default function ComponentName()`.
- Component files MUST be PascalCase (e.g., `TodoItem.js`).
- Include `import React from "react"` only when required by the runtime (React 17+ with new JSX transform does not need it).
- Props MUST be destructured in function parameters.
- Event handlers MUST use `handle` prefix (e.g., `handleSubmit`, `handleDelete`).

## Data Safety

- MUST NOT hardcode API keys, tokens, secrets, or credentials.
- MUST NOT use `dangerouslySetInnerHTML` unless the content is static and developer-controlled.
- Sample data belongs in `/data/*` or `/lib/*`, not inline in components.

## Domain Safety

- Keep domain-critical fields and actions explicit and understandable.
- Do not silently change domain logic or terminology unless explicitly requested.
- For destructive or irreversible actions, require explicit confirmation UI.
