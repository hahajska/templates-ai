## Information Hierarchy

- Lead with the most critical signal. Status, severity, and deadline information MUST be immediately visible without scroll or hover.
- Summary metric cards at the top surface aggregate counts and totals — one glance should tell the user whether action is needed right now.
- Use visual weight (size, contrast, color intensity) to rank importance. Reserve red/destructive styling for genuinely critical states.
- Conditional banners (e.g., "Critical attention required") MUST appear above the primary content area and MUST be resolvable (auto-dismiss when condition clears, or user-dismissible).

## Decision Speed

- Default sort order MUST surface the most urgent items first (e.g., highest severity, nearest deadline, largest exposure).
- Critical data fields — status, primary risk metric, time-sensitive threshold — MUST be visible in the collapsed table row. Do not hide them behind row expansion.
- Clickable metric cards that apply table filters reduce steps for the most frequent triage workflows. Wire them to the most common filter cases.
- Search and filter controls MUST be persistently visible above the table — never behind a settings panel or hidden menu.

## Interaction Patterns

- Row expansion reveals detail inline without leaving the page. The chevron toggle MUST be keyboard-accessible and have an `aria-label`.
- Bulk selection via checkboxes MUST show a contextual action bar with the count of selected items and available bulk actions.
- Destructive actions (delete, liquidate, reset, clear all) MUST require a confirmation step — use shadcn `AlertDialog`, never `window.confirm()`.
- Single-action buttons (e.g., acknowledge, approve) MUST give immediate feedback: toast notification with an undo option where reversal is possible.
- Hover states on table rows SHOULD be subtle (light background shift). Do not hide critical actions behind hover — they MUST be visible or keyboard-accessible at all times.
- Stress-test and real-time inputs MUST recalculate derived values in under 500ms — no loading state needed for in-memory computation.

## Status and Color Semantics

- Status labels MUST always include text. Never rely on color alone.
- Use a consistent severity ladder across the entire dashboard:
  - **Red / destructive** — action required now, hard deadline, critical threshold breached
  - **Orange / warning** — approaching threshold, elevated risk
  - **Yellow / at-risk** — monitoring recommended, not yet critical
  - **Green / success** — healthy, resolved, cured
  - **Muted / neutral** — informational, no action needed
- Color thresholds MUST be consistent. If 80% LTV is red in the table, it is red everywhere in the dashboard.
- Do not introduce new color semantics without updating all related views.

## Accessibility

- All interactive elements (buttons, selects, checkboxes, row toggles) MUST have visible focus indicators (`focus:ring-*` Tailwind classes).
- Icon-only buttons MUST have `aria-label` matching their action.
- Status badges MUST include label text — do not use color-only badges.
- Tables MUST use proper `<th scope="col">` for column headers.
- Form inputs MUST have associated visible labels or `aria-label` attributes.
- Do not hide critical information in hover-only tooltips. Tooltips are for supplemental context only.

## Visual Quality Bar

- Use shadcn/ui design tokens consistently. Never use raw Tailwind color values like `text-red-500` or `bg-gray-300`.
- Financial figures in tables MUST use tabular/monospace font variant for vertical alignment.
- Maintain clear visual separation between sections: use `border-border` dividers or `bg-card` backgrounds, not spacing alone.
- Avoid decorative complexity — no heavy gradients, blur filters, or animation for its own sake.
- Empty states MUST be informative. Include a short context-specific message and, where appropriate, a suggested next action (e.g., "No active margin calls — the book is healthy").
- Loading states SHOULD use skeleton placeholders, not spinners, for table rows.
