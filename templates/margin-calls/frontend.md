## Component Architecture

- `App.js` owns: active tab, filters, sort, pagination, expanded rows, selected rows, modal state. Single source of truth.
- **Table components** — Props only. No internal filter/sort/pagination state.
- **Metric cards** — Display-only. Computed values + `onClick` as props.
- **Filter bar** — Receives state + setters as props. Never computes filtered data.
- **Row components** — Single-item display. No sibling or global state access.
- **Modals/drawers** — Receive `isOpen`, `onClose`, and target item as props.

## shadcn/ui Components

- **Table** — `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`. Never raw `<table>`.
- **Badge** — Status labels. Match `variant` to severity. Amber/yellow: use a semantic Tailwind class override.
- **Checkbox** — Bulk selection. Controlled via `checked` + `onCheckedChange`.
- **Select** — Filters. Always include an "All" default option.
- **AlertDialog** — Destructive confirmations. Never `window.confirm()`.
- **Dialog** — Detail panels, forms. **Sheet** — Slide-in panels for wider content.
- **Card** — Metric summaries. **Tabs** — Multi-view, `value` in `App.js`. **Tooltip** — Supplemental context only.
- Install: `npx shadcn@latest add <component>`.

## State and Data Flow

- Derive filtered + sorted + paginated data with `useMemo` in `App.js`. Pass sliced result to table.
- `expandedRows` and `selectedRows`: `Set` of IDs in `App.js`, passed as props.
- Real-time derived values: synchronous `useMemo`, no async or loading state.
- Sample data in `/data/sampleData.js` or `/lib/data.js`. Never inline.

## Code Quality

- Stable unique IDs as list keys. Never array index.
- No inline object/array props. No files over 300 lines.
- No `console.log`, unused imports. `styles.css` for keyframes only.
