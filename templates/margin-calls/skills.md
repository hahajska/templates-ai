---
name: Dashboard Template
goal: Build data-dense operational dashboards with shadcn/ui, Tailwind, and React
stack:
  - React 18
  - Tailwind CSS (CDN)
  - shadcn/ui
  - lucide-react
---

## Purpose

Internal dashboards for Ops, Risk, Finance, and Credit teams. Users need fast, accurate decisions from dense data. Reliability and clarity beat visual novelty.

## Core Patterns

- **Metric cards** — KPI strip at the top. Clickable to filter the primary table.
- **Data table** — Primary surface. Sortable columns, status badges, row actions. Default sort: most urgent first.
- **Filter bar** — Always visible above the table. Search + selects + "Clear filters."
- **Status badges** — Severity-colored with text label. Consistent across all views.
- **Row expansion** — Chevron reveals inline detail. No page navigation.
- **Tabs** — Multi-view layout. Filter/sort state persists per tab.
- **Confirmation dialogs** — `AlertDialog` for destructive actions.
- **Toasts** — Immediate feedback with undo where reversible.

## Do

- Default sort surfaces the most critical items first.
- Keep filter, sort, tab, and pagination state in `App.js`.
- Derive filtered/sorted data with `useMemo`.
- Store sample data in `/data/` or `/lib/`.

## Don't

- Don't add charting libraries without explicit user request.
- Don't add global state libraries.
- Don't use color as the only status signal.
- Don't hide critical data behind hover or expansion.
- Don't rewrite entire components for small additions.
