---
name: Dashboard Template
goal: Build high-quality, data-dense ops and financial dashboards with shadcn/ui, Tailwind, and React
stack:
  - React 18
  - Vite 5
  - Tailwind CSS (CDN)
  - shadcn/ui
  - lucide-react
shadcn-components:
  - Table
  - Badge
  - Card
  - Button
  - Select
  - Input
  - Dialog
  - AlertDialog
  - Tabs
  - Tooltip
  - Sheet
---

## Purpose

These templates are operational and financial dashboards for internal teams — Ops, Risk, Credit, and Finance. They display real-time or near-real-time data about loans, borrowers, collateral, margin calls, and portfolio exposure. The goal is fast triage, clear status visibility, and safe actions — not visual novelty.

## Architecture

- `App.js`: Owns top-level state — active tab, filters, sort order, pagination, and modal open state.
- `components/`: One file per logical UI block — tables, metric cards, filter bars, drawers, detail panels. Keep each under 300 lines.
- `data/`: Sample/seed data only. Never inline data in components.
- `styles.css`: Reserved for keyframe animations and scrollbar styling only.

## Core UI Patterns

### Metric Cards
Summary KPIs at the top of the dashboard. Typically 3–5 cards. Cards SHOULD be clickable to filter the main table. Use `bg-card`, `border-border`, clear numeric value + label. Include trend indicator (↑/↓ + delta) when relevant to the domain.

### Data Tables
Primary interaction surface. Use shadcn `Table` components (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`). Every sortable column header MUST have a click handler and a visible sort indicator (chevron icon). Default sort MUST always be defined and MUST surface the most urgent/critical items first. Status badges go in the first data column after any checkbox/expand controls.

### Status Badges
Use shadcn `Badge` with variant matching severity:
- Critical / error: `destructive`
- Warning / elevated: `secondary` with amber Tailwind override
- Success / resolved: `default` or `outline`
- Neutral / informational: `outline`

Never rely on color alone — always include the label text inside the badge.

### Filters and Controls
Filter controls (selects, search input) live above the table in a flex row. Use shadcn `Select` and `Input`. A "Clear filters" button MUST appear when any non-default filter is active. A "Refresh" button is appropriate for live-data contexts.

### Tabs
Use shadcn `Tabs` for multi-view dashboards. Tab switching MUST preserve filter and sort state within the session. The default tab is always the primary operational view.

### Modals and Drawers
Use shadcn `AlertDialog` for destructive action confirmations. Use shadcn `Dialog` for detail panels or forms. Use shadcn `Sheet` for slide-in detail drawers when more space is needed.

### Empty and Error States
Every table MUST have an explicit empty state — context-specific message like "No active margin calls" or "No results match your filters". Render it inline inside the table body, not as a full-page overlay. Loading skeletons are preferred over spinners for table data.

### Toast Notifications
Use for single-action feedback (e.g., acknowledge, export started). Include an undo option where reversal is possible. Toast MUST appear near the triggering action, not just in a corner.

## Extension Patterns

### Add a new table column
1. Add the field to sample data in `/data/`.
2. Add `<TableHead>` to the header row.
3. Add `<TableCell>` to the row component.
4. If sortable, wire up sort handler in `App.js`.

### Add a new filter
1. Add filter state to `App.js`.
2. Add a `Select` or `Input` control to the filter bar component.
3. Update the derived `filteredData` computation in `App.js`.
4. Show "Clear filters" button when the filter is active.

### Add a new metric card
1. Derive the value in `App.js`.
2. Add a card to the metric cards component with value + label.
3. If clickable, wire `onClick` to set the relevant filter in `App.js`.

### Add row expansion
1. Add `expandedRows` state (a Set of IDs) in `App.js`.
2. Add a chevron toggle cell as the first column.
3. Render an expanded detail row conditionally beneath the main row.
4. Pass `isExpanded` and `onToggle` as props to the row component.

## Do
- Keep filter, sort, and pagination state in `App.js`.
- Use shadcn design tokens for all colors — never raw values like `bg-red-500`.
- Use `tabular-nums` font variant for all financial figures in tables.
- Show status labels alongside color — never color alone.
- Keep sample data domain-realistic: realistic names, amounts, statuses, timestamps.

## Don't
- Do not introduce charting libraries (recharts, chart.js, etc.) without explicit user request.
- Do not add global state libraries.
- Do not persist data to localStorage unless explicitly requested.
- Do not use raw Tailwind color values like `bg-red-500` — use token classes or shadcn badge variants.
- Do not rewrite an entire component to add a small feature — edit only the affected section.
