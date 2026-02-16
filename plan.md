# Templates Repository — Complete Setup Instructions

**Purpose:** Create a GitHub repository containing starter templates for the AI Template Platform. The platform syncs these via the GitHub API and renders them live in a browser-based Sandpack preview. Users then use AI chat to modify the code in real time.

---

## Table of Contents

1. [Repository Structure](#repository-structure)
2. [Technical Constraints](#technical-constraints)
3. [Tailwind CSS Setup](#tailwind-css-setup)
4. [Design System](#design-system)
5. [Required Boilerplate Files](#required-boilerplate-files)
6. [React Best Practices](#react-best-practices)
7. [Template Specifications](#template-specifications)
8. [File Organization](#file-organization)
9. [After Creating the Repo](#after-creating-the-repo)

---

## Repository Structure

```
repo-name/
  templates/
    counter-app/
      package.json
      public/
        index.html
      index.js
      App.js
      styles.css
    todo-app/
      package.json
      public/
        index.html
      index.js
      App.js
      components/
        TodoList.js
        TodoItem.js
        AddTodo.js
      styles.css
    landing-page/
      package.json
      public/
        index.html
      index.js
      App.js
      components/
        Hero.js
        Features.js
        Footer.js
      styles.css
```

---

## Technical Constraints

These are hard limits enforced by the platform. Every template MUST comply:

| Constraint | Limit |
|------------|-------|
| Max files per template | **30** |
| Max total size per template | **250 KB** |
| Runtime | **Sandpack** with `template="react"` |
| React version | **18.2.0** (always available, do not list in package.json) |
| Entry point | **`index.js`** (hardcoded default) |
| Module system | **ES Modules** (import/export) |
| CSS approach | **Tailwind CSS via CDN** + minimal custom CSS |
| No server-side | No Next.js, no Node.js APIs, no SSR — client-side React only |

**What Sandpack does automatically:**
- Adds `/` prefix to all file paths (e.g., `App.js` → `/App.js`)
- Reads `dependencies` from `package.json` and installs them
- Strips lock files (`package-lock.json`, `yarn.lock`, etc.)
- Always provides `react` and `react-dom` — never list them in package.json

---

## Tailwind CSS Setup

Tailwind CSS works in Sandpack via the **Play CDN**. Every template must include this setup:

### `public/index.html` (REQUIRED in every template)

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

This gives every template access to:
- All default Tailwind utility classes (`flex`, `p-4`, `text-lg`, `bg-blue-500`, etc.)
- **shadcn/ui default color tokens** (`bg-primary`, `text-muted-foreground`, `border-border`, etc.)
- Consistent design language matching the parent platform

### Using Tailwind in Components

```jsx
// GOOD — use Tailwind classes
export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
    >
      {children}
    </button>
  );
}
```

```jsx
// AVOID — inline styles or custom CSS for things Tailwind handles
export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: '8px 16px', background: '#333' }}>
      {children}
    </button>
  );
}
```

---

## Design System

All templates should share a consistent visual language based on **shadcn/ui's default theme**:

### Colors (available via Tailwind config above)

| Token | Usage | Tailwind Class |
|-------|-------|----------------|
| `primary` | Buttons, links, key actions | `bg-primary`, `text-primary` |
| `secondary` | Secondary buttons, tags | `bg-secondary` |
| `muted` | Backgrounds, subtle areas | `bg-muted`, `text-muted-foreground` |
| `destructive` | Delete, error states | `bg-destructive` |
| `border` | All borders | `border-border` |
| `background` | Page background | `bg-background` |
| `foreground` | Body text | `text-foreground` |

### Typography

- Use `font-sans` (system font stack via Tailwind default)
- Headings: `text-3xl font-bold tracking-tight` for h1, `text-2xl font-semibold` for h2
- Body: `text-base text-foreground` or `text-sm text-muted-foreground` for secondary text
- Monospace for code: `font-mono text-sm`

### Spacing & Layout

- Use Tailwind spacing scale (`p-4`, `gap-6`, `space-y-4`, etc.)
- Max content width: `max-w-4xl mx-auto` or `max-w-6xl mx-auto`
- Page padding: `p-6` or `p-8`
- Card pattern: `rounded-lg border border-border bg-card p-6 shadow-sm`
- Section spacing: `space-y-8` between major sections

### Interactive Elements

- Buttons: `rounded-md px-4 py-2 text-sm font-medium transition-colors`
- Inputs: `rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring`
- Hover states: Use `hover:bg-primary/90`, `hover:bg-accent`, `hover:text-accent-foreground`
- Focus: `focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`

---

## Required Boilerplate Files

Every template must include these 3 files:

### 1. `public/index.html`

The full HTML with Tailwind CDN and shadcn color config (see Tailwind section above).

### 2. `index.js` — Entry Point

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

This file is identical across all templates. Do not modify it.

### 3. `package.json` — Dependencies (only if needed)

```json
{
  "dependencies": {
    "lucide-react": "^0.300.0"
  }
}
```

Rules:
- **NEVER** include `react`, `react-dom`, or `next`
- Only include packages actually imported in the code
- Keep dependencies minimal — fewer deps = faster Sandpack load

### 4. `styles.css` — Minimal Global Styles (optional)

Only for things Tailwind can't handle (animations, scrollbar styling, etc.):

```css
/* Only add CSS that Tailwind utilities can't cover */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
```

Do **not** put layout, spacing, colors, or typography in CSS — use Tailwind classes instead.

---

## React Best Practices

### Component Patterns

```jsx
// CORRECT — function declaration with default export
import React, { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border p-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4 rounded border-input"
      />
      <span className={todo.completed ? "line-through text-muted-foreground" : "text-foreground"}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-auto text-sm text-destructive hover:underline"
      >
        Delete
      </button>
    </div>
  );
}
```

### Rules

| Rule | Do | Don't |
|------|----|-------|
| Exports | `export default function Name()` | `export const Name = () =>` |
| React import | `import React from "react"` (required) | Omit React import |
| Hooks import | `import React, { useState, useEffect } from "react"` | `import { useState } from "react"` without React |
| State | `useState` for local state | External state libraries |
| Side effects | `useEffect` with cleanup | Unmanaged subscriptions |
| Event handlers | Inline or same-file functions | Separate handler files |
| Props | Destructured in function params | `props.something` |
| Keys | Stable unique IDs | Array index as key |
| Conditional render | Ternary or `&&` in JSX | If/else outside return |
| Imports | Relative paths: `"./components/Hero"` | Absolute or alias paths |

### State Management

- Use `useState` for all component state
- Lift state to the nearest common parent
- No Redux, Zustand, or Context — keep it simple
- Pass callbacks as props for child-to-parent communication

### Component Structure

```jsx
import React, { useState } from "react";
// 1. Third-party imports (if any)
// 2. Local component imports
// 3. Component definition
// 4. Default export (inline with function declaration)
```

---

## Template Specifications

Create **3 templates**, each progressively more complex:

---

### Template 1: `counter-app`

**Purpose:** Minimal starter to verify the platform works end-to-end.

**Files:**
```
counter-app/
  public/index.html     ← Tailwind CDN + shadcn colors
  index.js              ← React entry (standard boilerplate)
  App.js                ← Counter UI with state
  styles.css            ← Minimal (only if needed for animations)
```

**Requirements:**
- Display a count number (large, centered)
- Increment (+) and Decrement (-) buttons side by side
- Reset button
- Use `useState` for the counter
- Clean, centered layout with `flex flex-col items-center justify-center min-h-screen`
- Buttons styled as: `bg-primary text-primary-foreground rounded-md px-4 py-2`
- Show the count with `text-6xl font-bold`
- Subtle animation or transition on count change is a nice touch

**Complexity:** ~3 files, < 5 KB

---

### Template 2: `todo-app`

**Purpose:** Multi-component template with real interactivity.

**Files:**
```
todo-app/
  public/index.html
  package.json           ← { "dependencies": { "lucide-react": "^0.300.0" } }
  index.js
  App.js                 ← State management, renders child components
  components/AddTodo.js  ← Input field + add button
  components/TodoList.js ← Maps over todos array
  components/TodoItem.js ← Single todo: checkbox, text, delete button
  styles.css             ← Only for custom animations if any
```

**Requirements:**
- Add new todos via text input + button (or Enter key)
- Toggle todo completion (checkbox with strikethrough)
- Delete individual todos
- Show count: "X items remaining"
- Empty state message when no todos
- Use `lucide-react` for icons (Plus, Trash2, CheckCircle)
- Card-style container: `max-w-lg mx-auto mt-12 rounded-lg border border-border bg-card p-6 shadow-sm`
- Input styled with: `w-full rounded-md border border-input bg-background px-3 py-2 text-sm`
- Each todo item in a row with `flex items-center gap-3 p-3 border-b border-border`

**Complexity:** ~7 files, < 15 KB

---

### Template 3: `landing-page`

**Purpose:** Visually polished, multi-section page that showcases what AI can iterate on.

**Files:**
```
landing-page/
  public/index.html
  package.json           ← { "dependencies": { "lucide-react": "^0.300.0" } }
  index.js
  App.js                 ← Assembles all sections
  components/Hero.js     ← Hero with headline, subtext, CTA buttons
  components/Features.js ← 3-column feature grid with icons
  components/Footer.js   ← Simple footer with links
  styles.css             ← Gradient animations, custom keyframes only
```

**Requirements:**
- **Hero section:**
  - Large headline (`text-4xl font-bold tracking-tight` or bigger)
  - Subtitle paragraph (`text-lg text-muted-foreground max-w-2xl`)
  - Two CTA buttons: primary (`bg-primary`) and secondary/outline
  - Centered layout with generous vertical padding (`py-24`)
  - Optional: subtle gradient background
- **Features section:**
  - Section heading ("Features" or similar)
  - 3-column grid: `grid grid-cols-1 md:grid-cols-3 gap-6`
  - Each feature card: icon (lucide-react), title, description
  - Card style: `rounded-lg border border-border p-6`
- **Footer:**
  - Muted background: `bg-muted`
  - Simple layout with copyright and a few links
  - `text-sm text-muted-foreground`
- Overall: professional, clean, the kind of landing page a startup would use

**Complexity:** ~7 files, < 20 KB

---

## File Organization

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Component files | PascalCase `.js` | `TodoItem.js`, `Hero.js` |
| Entry point | lowercase | `index.js` |
| Styles | lowercase | `styles.css` |
| Directories | lowercase kebab or plain | `components/`, `public/` |
| Component functions | PascalCase | `export default function TodoItem()` |
| Handler functions | camelCase with "handle" prefix | `handleSubmit`, `handleDelete` |
| Props | camelCase | `onToggle`, `isCompleted`, `todoList` |

### Folder Structure Per Template

```
template-name/
  public/
    index.html          ← Always required (Tailwind CDN)
  components/           ← Reusable child components
    ComponentName.js
  index.js              ← Entry point (never modify this)
  App.js                ← Root component
  package.json          ← Dependencies (only if needed)
  styles.css            ← Custom CSS only (prefer Tailwind)
```

---

## Quality Checklist

Before committing each template, verify:

- [ ] `index.js` is the standard React entry boilerplate (identical across templates)
- [ ] `public/index.html` includes Tailwind CDN script and shadcn color config
- [ ] All JSX files have `import React from "react"` at the top
- [ ] All components use `export default function ComponentName()`
- [ ] All imports use relative paths (`./components/Hero`, not `@/components/Hero`)
- [ ] `package.json` does NOT list `react`, `react-dom`, or `next`
- [ ] No TypeScript (`.ts`/`.tsx`) — use plain `.js` files
- [ ] Total files per template ≤ 30
- [ ] Total size per template ≤ 250 KB
- [ ] Template renders a complete, working UI with no errors
- [ ] Tailwind classes are used for all layout, spacing, colors, and typography
- [ ] `styles.css` only contains things Tailwind can't do (animations, keyframes)
- [ ] No `console.log` statements left in code
- [ ] No unused imports or variables

---

## After Creating the Repo

1. Create a GitHub repo (public or private)
2. Commit all 3 templates following the structure above
3. Push to `main` branch
4. If the repo is **private**, create a GitHub Personal Access Token at https://github.com/settings/tokens with `repo` scope

Then add to the platform's `.env.local`:

```bash
TEMPLATES_REPO=your-github-username/repo-name
TEMPLATES_PATH=templates
GITHUB_TOKEN=ghp_xxx   # only if repo is private
```

To test: sign in as owner → go to `/admin` → click "Sync Templates from GitHub" → templates appear on home page.
