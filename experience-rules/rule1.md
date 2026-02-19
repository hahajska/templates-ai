# Experience Rules — UI & Component Patterns

Captured from real feedback sessions. Use these to build better UIs faster.

---

## Layout & Structure

### App Shell
- Sidebar should default to **collapsed** (`defaultOpen={false}`) unless content demands it open
- Stats/summary bar sits **directly below the navbar** as a full-width strip with `border-b` — no card wrapper, no padding, just flush to the edge
- Stats bar uses `divide-x divide-border` for vertical dividers between cells
- Main content area below the stats bar gets `p-6` padding
- The page title in the navbar replaces breadcrumbs — a single `<span>` with the current page name is enough

### Two-Container Layout
- When you have a summary strip + a table, they are **two separate visual blocks** stacked vertically
- The summary strip has `border-b` separating it from the content below
- The table section gets its own padding container (`p-6`)

---

## Sidebar

- **Remove** the `SidebarHeader` (logo/app name block) — it wastes vertical space
- **Remove** `SidebarGroupLabel` ("Navigation") — labels are noise
- **Remove** Help and Settings from `SidebarFooter` unless explicitly required
- **Keep** sidebar collapsible to icon mode (`collapsible="icon"`)
- Use `SidebarRail` for the collapse toggle affordance
- Nav items: use descriptive domain names, not generic ones
  - "Dashboard" → "Loanbook"
  - "Alerts" → "Collateral Management"

---

## Navbar

- Keep it minimal: **toggle button | divider | page name | spacer | action button**
- Replace breadcrumbs with a plain `<span className="text-sm font-medium text-foreground">` showing the current page name
- `SidebarTrigger` icon should be small: `!size-3.5` (14px)
- No breadcrumbs unless there is genuine deep navigation hierarchy

---

## Tables (TanStack Table + shadcn/ui)

### Alignment — The Rule
- **All cells align left. Always.** No `text-right` on any column by default
- Alignment is controlled on `<TableHead>` and `<TableCell>` elements, NOT on inner `<div>` or `<span>` wrappers
- `TableHead` has `text-left` as default — do not override unless explicitly requested

### Sortable Headers
- Use a plain `<button>` element, NOT `<Button variant="ghost">` from shadcn
- `<Button>` adds `px-4 py-2` padding that misaligns the header text relative to cell content
- Correct pattern:
  ```jsx
  <button
    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    Column Name
    <ArrowUpDown className="h-3.5 w-3.5" />
  </button>
  ```
- No background hover, no border, no padding — only text color change on hover

### Table Container
- Wrap in `<div className="overflow-x-auto max-w-full rounded-lg border border-border">`
- `max-w-full` is **required** — without it the wrapper can exceed the parent's width and cause the table to overflow the page layout (not just scroll within its container)
- Table itself: `<Table className="min-w-full">` — fills parent but scrolls horizontally when needed
- `whitespace-nowrap` on both `TableHead` and `TableCell` to prevent row content from wrapping to 2 lines
- Never use `min-w-max` — it prevents the table from filling available width
- Full correct wrapper: `overflow-x-auto max-w-full` together — `max-w-full` caps the container, `overflow-x-auto` enables scroll when content is wider

### Table Header Styling
- `bg-secondary` on `<TableHeader>` to distinguish it from body rows
- Header `<TableRow>` gets `hover:bg-secondary` to disable the default hover effect change

### Column Meta Pattern
- Use `meta: { className }` on column definitions to pass alignment or other classes to both header and cell
- Read it as `header.column.columnDef.meta?.className` and `cell.column.columnDef.meta?.className`

---

## Stats / KPI Strip

```jsx
<div className="flex divide-x divide-border border-b border-border">
  <div className="flex-1 px-8 py-6">
    <p className="text-sm text-muted-foreground">Label</p>
    <p className="text-xl font-semibold text-foreground mt-1">Value</p>
  </div>
  {/* repeat for each stat */}
</div>
```

- No card border, no rounded corners on the strip itself
- `border-b` creates the visual separation from content below
- `divide-x divide-border` creates vertical dividers between cells
- `flex-1` on each cell for equal width distribution

---

## Component Decisions

### Agentation Setup (Vite + React)
- Install: `npm install agentation` in each template directory
- Import and add to `App.js`:
  ```jsx
  import { Agentation } from "agentation";
  // Inside return, after main content:
  {process.env.NODE_ENV === "development" && <Agentation />}
  ```
- Wrap existing JSX in a Fragment `<>...</>` to accommodate the extra component
- Only loads in development — safe to commit

### React Import
- These Vite projects require `import React from "react"` explicitly — JSX transform is not configured for implicit React
- Even if the linter shows a hint that React is unused, keep the import

---

## Feedback Patterns (What Users Flag)

| Problem | Root Cause | Fix |
|---|---|---|
| Header and cell text misaligned | `<Button>` in header adds padding | Use plain `<button>` with no padding |
| Table content wrapping to 2 lines | No `whitespace-nowrap` on cells | Add `whitespace-nowrap` to `TableHead` and `TableCell` |
| Table cut off at viewport edge | `min-w-max` locks table to content width | Use `min-w-full` + `overflow-x-auto` on wrapper |
| Table overflows the page layout (not just its container) | Missing `max-w-full` on wrapper div | Add `max-w-full` to the outer wrapper div alongside `overflow-x-auto` |
| Stats strip looks like a card | Unnecessary border/rounded on strip | Remove card wrapper, just use `border-b` |
| Sidebar too busy | Header, labels, footer items cluttering | Remove SidebarHeader, labels, Help/Settings |
| Breadcrumbs overkill | Multi-level nav for flat app | Replace with single page name span |
| Sort button hover changes background | Using `Button variant="ghost"` | Plain `<button>` with only text color change |

---

## General Principles

1. **Remove before adding** — default UI components (shadcn sidebar, breadcrumbs) come with features that often need to be stripped back
2. **Alignment is on the container element**, not the content inside it
3. **Padding kills alignment** — any button or wrapper with padding in a table header will cause header/cell misalignment
4. **Fill, then scroll** — tables should fill available width (`min-w-full`) and only scroll when content exceeds it. The wrapper always needs both `max-w-full` (cap to parent) and `overflow-x-auto` (enable scroll)
5. **Domain language** — rename generic labels ("Dashboard", "Alerts") to domain-specific ones ("Loanbook", "Collateral Management")
6. **No decorative chrome** — remove group labels, sub-headers, and section dividers unless they carry meaning
