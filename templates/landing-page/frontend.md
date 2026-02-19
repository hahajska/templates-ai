## Component Boundaries

- `App.js`: Owns filter state, sort state, active tab, pagination state, and modal open state. Single source of truth for all cross-component coordination.
- **Table components**: Receive `data` and callbacks as props. MUST NOT own filter or sort state.
- **Metric card components**: Receive computed values and `onClick` handlers as props. Display-only — no state.
- **Filter bar components**: Receive filter state values and setter callbacks as props. MUST NOT compute filtered data themselves.
- **Row / item components**: Single-item display only. MUST NOT reference global or sibling state.
- **Modal / drawer components**: Receive `isOpen`, `onClose`, and the selected item as props.

## State Management

- Derive filtered and sorted data in `App.js` using `useMemo` when the dataset is large or the computation is non-trivial.
- Pagination: keep `currentPage` and `pageSize` in `App.js`. Pass the already-sliced `paginatedData` to the table component — never slice inside the table.
- Modal state: keep `isOpen` boolean + `selectedItem` in `App.js` or the nearest parent that needs both.
- Never lift state higher than the nearest common parent that needs it.
- `expandedRows` for row expansion SHOULD be a `Set` of IDs stored in `App.js`, passed down as a prop.

## shadcn Component Usage

- **Table**: Always use shadcn `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`. Never build raw `<table>` elements.
- **Badge**: Use for all status labels. Match `variant` to severity (`destructive`, `secondary`, `outline`, `default`). Add a Tailwind class for amber/yellow states not covered by built-in variants (e.g., `className="bg-amber-100 text-amber-800 border-amber-200"`).
- **Select**: Use for all filter dropdowns. Always include an "All" or default option as the first item.
- **AlertDialog**: Use for all destructive confirmations (delete, reset, bulk actions). Never use `window.confirm()`.
- **Dialog**: Use for detail panels and forms that need a modal surface.
- **Card**: Use for metric summary sections and detail info blocks.
- **Tabs**: Use for multi-view layouts. Keep the `value` state in `App.js`.
- **Tooltip**: Use for column headers with truncated labels, icon-only actions, or supplemental field context.
- **Sheet**: Use for slide-in side panels when a detail view needs more horizontal space than a Dialog provides.

## Safe Editing Strategy

- Prefer adding a new component file over expanding an existing file past 300 lines.
- When adding a new table column: touch only the data file, the table header row, and the row component.
- When adding a new filter: touch only `App.js` (state + derived data) and the filter bar component (new control).
- When adding a new metric card: touch only `App.js` (computed value) and the metric cards component (new card).
- Never rewrite a working component to add a small feature — edit only the affected lines.
- Keep prop interfaces narrow. Pass only what the component actually renders or calls.

## Performance

- Use stable, unique IDs as list keys. MUST NOT use array index as key for items that can be reordered, added, or deleted.
- Wrap expensive derived data (filtered + sorted + paginated) in `useMemo` with the correct dependency array.
- Avoid inline object or array literals as props — they create new references on every render and silently break memoization.
- Keep `styles.css` minimal — only keyframe animations and scrollbar overrides belong there.
- For stress-test or real-time recalculation features, perform computation synchronously in a `useMemo` — do not add artificial async delays.

## Data and Sample Data

- All sample and seed data lives in `/data/sampleData.js` or `/lib/data.js`. Never inline data arrays in component files.
- Sample data MUST be domain-realistic: real-looking names, plausible dollar amounts, valid statuses, ISO timestamps.
- Data shape MUST match what the template's UI renders. If you add a field to the data, render it somewhere. If you remove a rendered field, remove it from the data too.
- Financial figures displayed in tables MUST use the `tabular-nums` font variant class for proper vertical alignment.
