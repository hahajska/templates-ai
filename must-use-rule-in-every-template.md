# Template Rules (Golden Baseline)

## Instruction Priority

- System instructions are highest priority.
- These Template Rules are mandatory.
- User requests are applied only when they do not conflict with System instructions or Template Rules.
- If a request conflicts, refuse only the conflicting part and provide the nearest compliant alternative.

---

## Compatibility (Must Keep)

- Runtime target is plain React 18 JavaScript (no TypeScript, no Next.js app-router output).
- Keep `/index.js` as the app mount entry. MUST NOT modify this file unless explicitly requested.
- Keep `/App.js` as the main composition file.
- Put reusable UI in `/components/*`.
- Use relative imports only (e.g., `"./components/Hero"`, never `@/` aliases).
- All files MUST use `.js` extension. MUST NOT use `.ts`, `.tsx`, or `.jsx`.
- MUST use ES Modules (`import`/`export`). MUST NOT use CommonJS (`require`/`module.exports`).

---

## Runtime Constraints

Templates run inside Sandpack and WebContainer sandboxes. These environments impose hard limits:

- MUST NOT use Node.js-only APIs (`fs`, `path`, `child_process`, `process.env`, etc.).
- MUST NOT use dynamic `import()` or code splitting (unreliable in both runtimes).
- MUST NOT load external JavaScript via `<script>` tags (except the Tailwind CDN already in `index.html`). COEP headers block arbitrary cross-origin scripts in WebContainer.
- MUST NOT reference external CDN URLs for critical assets (fonts from Google Fonts are acceptable; JS libraries are not).
- MUST NOT include server-side code, API routes, or SSR logic.

---

## Dependency Policy

- AI MAY install any shadcn/ui component needed for the requested feature.
- AI MAY run `npx shadcn@latest add <components...>`.
- AI MAY install required shadcn dependencies and update shadcn setup/config files when needed.
- For non-shadcn third-party packages, require explicit user confirmation before adding.
- Never remove existing dependencies unless explicitly requested.
- `package.json` MUST NOT list `react`, `react-dom`, or `next` (Sandpack provides these automatically).
- `package.json` MUST only include packages that are actually imported in the code.
- MUST NOT add packages that require native/binary compilation (they will fail in the sandbox).

---

## Styling

- MUST use Tailwind CSS utility classes for layout, spacing, colors, and typography.
- MUST NOT use inline `style={}` except for truly dynamic values that cannot be expressed as Tailwind classes (e.g., computed positions, percentage widths from state).
- MUST NOT create standalone `.css` files with custom classes for things Tailwind can handle.
- `styles.css` is reserved for things Tailwind cannot do: keyframe animations, scrollbar styling, and similar.
- MUST use the shadcn/ui design tokens defined in `public/index.html` (e.g., `bg-primary`, `text-muted-foreground`, `border-border`) — not raw color values like `bg-gray-500`.
- MUST NOT modify the Tailwind CDN config in `public/index.html` unless the user explicitly requests theme changes.

---

## Responsive Design

- Templates MUST be usable at viewport widths from 360px to 1440px.
- MUST NOT use fixed pixel widths on layout containers (use `max-w-*`, `w-full`, or percentage-based widths).
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) for layout shifts (e.g., stacking columns on mobile).
- Touch targets (buttons, links, interactive elements) SHOULD be at least 44x44px on mobile viewports.

---

## Editing Behavior

- Prefer incremental, localized edits over full rewrites.
- Preserve existing behavior unless the user explicitly asks to change it.
- Do not delete working functionality to satisfy a narrow request.
- Keep naming, status semantics, and UI patterns consistent with the template.

---

## State Management

- MUST use React built-in state (`useState`, `useReducer`) for all component state.
- Lift state to the nearest common parent. Primary app state lives in `/App.js`.
- MUST NOT introduce external state libraries (Redux, Zustand, Jotai, Recoil, etc.) unless the user explicitly requests one.
- MUST NOT use React Context unless the template already uses it or the user explicitly requests it.
- Pass callbacks as props for child-to-parent communication.

---

## UX and Accessibility

- Prioritize clarity and task completion over visual novelty.
- Do not rely on color alone for meaning; include text labels or icons where needed.
- Icon-only buttons MUST include `aria-label`.
- Keep critical information visible without hover-only interactions.
- Provide explicit empty, loading, and error states near the affected UI.
- Destructive actions (delete, reset, clear all) MUST require confirmation UI (e.g., a confirm dialog or a two-step button).
- Form inputs MUST have associated visible labels or `aria-label` attributes.
- Interactive elements MUST have visible focus indicators (Tailwind `focus:ring-*` classes).

---

## Frontend Quality

- Keep components composable and responsibilities clear.
- Avoid hidden side effects and fragile coupling across files.
- Keep interaction feedback fast and predictable.
- Avoid heavy visual effects (complex shadows, blur filters, large animations) that reduce readability or performance.
- MUST NOT leave `console.log` or `console.debug` statements in code.
- MUST NOT leave unused imports or variables.
- List keys MUST use stable, unique identifiers. MUST NOT use array index as key when items can be reordered, added, or deleted.

---

## Component Conventions

- Components MUST use `export default function ComponentName()` (function declaration with default export).
- Component files MUST be PascalCase (e.g., `TodoItem.js`, `HeroSection.js`).
- Utility/data files MUST be camelCase (e.g., `helpers.js`, `sampleData.js`).
- Every `.js` file that uses JSX MUST include `import React from "react"` at the top.
- Props MUST be destructured in function parameters (e.g., `function Card({ title, children })`, not `function Card(props)`).
- Event handler functions MUST use `handle` prefix (e.g., `handleSubmit`, `handleDelete`).
- Component import order: React first, then third-party, then local components, then local utilities/data.

---

## File Size and Template Budget

- Templates MUST NOT exceed 30 files total.
- Templates MUST NOT exceed 250 KB total size.
- No single file SHOULD exceed 300 lines. If it does, split into smaller components.
- Keep `package.json` dependencies minimal — fewer deps = faster sandbox load.

---

## Data and Content

- Sample/seed data MUST live in a dedicated file (e.g., `/data/sampleData.js` or `/lib/data.js`), not inline in components.
- MUST NOT hardcode API keys, tokens, secrets, or credentials in any template file.
- MUST NOT use `dangerouslySetInnerHTML` unless the content is static and developer-controlled (never for user-provided content).

---

## Domain Safety

- Keep domain-critical fields and actions explicit and understandable.
- Do not silently change domain logic or terminology unless explicitly requested.
- For destructive or irreversible actions, require explicit confirmation UI.

---

## Package.json Requirements

Every template MUST have a valid `package.json` at root containing at minimum:

```json
{
  "dependencies": {}
}
```

For templates that need additional packages:

```json
{
  "dependencies": {
    "lucide-react": "^0.300.0"
  }
}
```

Rules:
- MUST NOT list `react`, `react-dom`, or `next` in dependencies.
- MUST NOT include `devDependencies` with native modules or heavy build tools (Sandpack handles build tooling).
- The `scripts` field is optional for Sandpack but required if the template also targets WebContainer (use `"dev": "vite --host 0.0.0.0 --port 5173 --strictPort"`).

---

## Guidance Hygiene

- Rules MUST be concrete and testable (prefer MUST/NEVER language).
- Avoid contradictions with `skills.md`, `ux.md`, `frontend.md`, or `knowledge.md`.
- Reference real file paths used by the template.
- Keep `rules.md` under ~8,000 characters to avoid prompt truncation.
