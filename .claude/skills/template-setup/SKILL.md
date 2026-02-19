# Golden Baseline — Template Development Agent

> For the AI agent that **builds and maintains templates** in the templates repository.
> This file lives at the root of the templates repo as a contributor guide.

---

## Template Structure

Every template MUST follow this folder layout:

```
templates/<template-name>/
  public/
    index.html            # Tailwind CDN + shadcn color config (REQUIRED)
  components/
    ComponentName.js      # Reusable child components
  index.js                # React entry point (NEVER modify, identical across all templates)
  App.js                  # Root component, main app state lives here
  package.json            # Dependencies only (no react/react-dom)
  styles.css              # Optional — only for things Tailwind can't handle
  rules.md                # AI editing constraints (REQUIRED)
  skills.md               # Template purpose + extension patterns (REQUIRED)
  ux.md                   # UX guidance (recommended)
  frontend.md             # Engineering guidance (recommended)
  knowledge.md            # Domain context (recommended)
```

---

## Technical Requirements

| Constraint | Value |
|---|---|
| Language | JavaScript only (`.js`). No `.ts`, `.tsx`, `.jsx` |
| Module system | ES Modules (`import`/`export`). No CommonJS |
| React version | 18.2.0 (provided by Sandpack — NEVER list in package.json) |
| Entry point | `/index.js` (hardcoded, identical across all templates) |
| CSS approach | Tailwind CSS via CDN + optional `styles.css` for keyframes/animations |
| Max files per template | 30 |
| Max total size per template | 250 KB |
| Max lines per file | 300 (soft limit — split into components if exceeded) |
| Runtime | Client-side React only. No SSR, no Node.js APIs, no API routes |

---

## Required Boilerplate

### `/index.js` (identical in every template — do not modify)

```jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### `/public/index.html` (Tailwind CDN + shadcn design tokens)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              background: 'hsl(0, 0%, 100%)',
              foreground: 'hsl(240, 10%, 3.9%)',
              card: 'hsl(0, 0%, 100%)',
              'card-foreground': 'hsl(240, 10%, 3.9%)',
              primary: 'hsl(240, 5.9%, 10%)',
              'primary-foreground': 'hsl(0, 0%, 98%)',
              secondary: 'hsl(240, 4.8%, 95.9%)',
              'secondary-foreground': 'hsl(240, 5.9%, 10%)',
              muted: 'hsl(240, 4.8%, 95.9%)',
              'muted-foreground': 'hsl(240, 3.8%, 46.1%)',
              accent: 'hsl(240, 4.8%, 95.9%)',
              'accent-foreground': 'hsl(240, 5.9%, 10%)',
              destructive: 'hsl(0, 84.2%, 60.2%)',
              'destructive-foreground': 'hsl(0, 0%, 98%)',
              border: 'hsl(240, 5.9%, 90%)',
              input: 'hsl(240, 5.9%, 90%)',
              ring: 'hsl(240, 5.9%, 10%)',
            },
            borderRadius: {
              lg: '0.5rem',
              md: 'calc(0.5rem - 2px)',
              sm: 'calc(0.5rem - 4px)',
            },
          },
        },
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

## Package.json

Every template MUST have a `package.json`. Rules:

- MUST NOT list `react`, `react-dom`, or `next` in dependencies.
- MUST NOT include `devDependencies` with native modules or heavy build tools.
- Only include packages actually imported in the code.
- The `scripts` field is optional for Sandpack but required for WebContainer compatibility.

**Sandpack-only template:**

```json
{
  "dependencies": {
    "lucide-react": "^0.300.0"
  }
}
```

**Dual-runtime template (Sandpack + WebContainer):**

```json
{
  "name": "template-name",
  "private": true,
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 5173 --strictPort",
    "start": "vite --host 0.0.0.0 --port 5173 --strictPort",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.300.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

> Note: WebContainer templates DO list react/react-dom because they run a real npm install. Sandpack templates MUST NOT.

---

## Component Conventions

- Components MUST use `export default function ComponentName()` (function declaration with default export).
- Component files MUST be PascalCase (e.g., `TodoItem.js`, `HeroSection.js`).
- Utility/data files MUST be camelCase (e.g., `helpers.js`, `sampleData.js`).
- Every `.js` file that uses JSX MUST include `import React from "react"` at the top.
- Props MUST be destructured in function parameters (`function Card({ title, children })`).
- Event handlers MUST use `handle` prefix (`handleSubmit`, `handleDelete`).
- Import order: React first, then third-party, then local components, then local utilities/data.
- Use relative imports only (`"./components/Hero"`, never `@/` aliases).

---

## Styling Rules

- MUST use Tailwind CSS utility classes for all layout, spacing, colors, and typography.
- MUST use shadcn/ui design tokens (`bg-primary`, `text-muted-foreground`, `border-border`) — not raw color values.
- MUST NOT use inline `style={}` except for truly dynamic values.
- `styles.css` is only for things Tailwind cannot handle (keyframe animations, scrollbar styling).
- Do not put layout, spacing, colors, or typography in CSS files.

---

## State Management

- Use `useState` for all component state. `useReducer` for complex state logic.
- Primary app state lives in `/App.js`. Lift state to nearest common parent.
- No Redux, Zustand, Jotai, Recoil, or Context unless template-specific requirements demand it.
- Pass callbacks as props for child-to-parent communication.

---

## Runtime Constraints

Templates run inside Sandpack and WebContainer sandboxes:

- MUST NOT use Node.js-only APIs (`fs`, `path`, `child_process`, `process.env`).
- MUST NOT use dynamic `import()` or code splitting.
- MUST NOT load external JS via `<script>` tags (except the Tailwind CDN in `index.html`).
- MUST NOT reference external CDN URLs for critical JS assets (Google Fonts are acceptable).
- MUST NOT include server-side code, API routes, or SSR logic.

---

## Data and Content

- Sample/seed data MUST live in a dedicated file (`/data/sampleData.js` or `/lib/data.js`), not inline in components.
- MUST NOT hardcode API keys, tokens, secrets, or credentials.
- MUST NOT use `dangerouslySetInnerHTML` unless the content is static and developer-controlled.

---

## Accessibility Baseline

- Icon-only buttons MUST include `aria-label`.
- Form inputs MUST have visible labels or `aria-label`.
- Interactive elements MUST have visible focus indicators (`focus:ring-*`).
- Do not rely on color alone for meaning — include text labels or icons.
- Destructive actions MUST have confirmation UI.

---

## Responsive Design

- Templates MUST be usable from 360px to 1440px viewport width.
- MUST NOT use fixed pixel widths on layout containers.
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) for layout shifts.
- Touch targets SHOULD be at least 44x44px on mobile.

---

## Quality Checklist

Before committing a template, verify:

- [ ] `/index.js` is the standard boilerplate (identical across templates)
- [ ] `/public/index.html` includes Tailwind CDN and shadcn color config
- [ ] All JSX files have `import React from "react"` at top
- [ ] All components use `export default function ComponentName()`
- [ ] All imports use relative paths
- [ ] `package.json` does NOT list `react` or `react-dom` (for Sandpack templates)
- [ ] No `.ts` / `.tsx` files — plain `.js` only
- [ ] Total files <= 30, total size <= 250 KB
- [ ] No `console.log` statements
- [ ] No unused imports or variables
- [ ] Tailwind classes used for all visual styling
- [ ] `styles.css` only contains things Tailwind can't do
- [ ] Template renders a complete, working UI with no errors
- [ ] `rules.md` and `skills.md` exist and reference real file paths
- [ ] No contradictions between `rules.md`, `skills.md`, `ux.md`, `frontend.md`, `knowledge.md`

---

## AI Guidance File Authoring

Each template MUST include `rules.md` and `skills.md`. These are synced to the app database and injected into the web app AI's prompt.

- `rules.md`: Hard constraints for the runtime AI agent. Use MUST/NEVER language. Keep under ~8,000 characters.
- `skills.md`: Template purpose, architecture, extension patterns. Include YAML frontmatter with `name`, `goal`, `stack`, `shadcn-components`.
- `ux.md`: UX guidance (information hierarchy, interaction patterns, accessibility).
- `frontend.md`: Engineering guidance (component boundaries, state management, safe editing).
- `knowledge.md`: Domain context (what the template is for, critical fields, terminology).

