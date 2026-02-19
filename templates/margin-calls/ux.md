## Design Philosophy

Build like Linear, Attio, Cursor, ElevenLabs: maximum information density, minimum visual noise. The interface recedes so the data comes forward.

## Typography

- Type weight and size establish hierarchy — not color or decoration.
- One heading level per section. Sub-labels: `text-muted-foreground` at smaller size.
- Numeric data: `font-mono` / `tabular-nums` for vertical alignment.
- Table cells: `text-sm`. Headers: `text-xs text-muted-foreground uppercase tracking-wide`.

## Density and Layout

- Rows are compact but not cramped — comfortable for scanning 20–50 items.
- Consistent horizontal padding across all table cells. Misaligned columns break trust.
- Group with `border-border` edges or `bg-card` backgrounds — not shadows or gradients.
- Whitespace is deliberate: more between sections, less within.
- Structure: header → metrics → content. Never scatter KPIs randomly.

## Color

- Color is signal, not decoration. Use sparingly and consistently.
- Severity palette (red → orange → yellow → green) is the primary color language.
- Neutral is the default (`text-muted-foreground`, `bg-muted`, `border-border`). Color appears only when something needs attention.
- Always use design tokens. Semantic overrides for amber/yellow are fine; raw Tailwind color values are not.

## Tables

- The table is the primary work surface — treat it like Linear and Attio treat their list views.
- Alignment: text left, numbers right, status/icons center.
- Row hover: subtle `bg-muted/50`. No borders, no elevation.
- Primary actions stay always-visible in the row. Secondary actions may appear on hover.
- Sortable headers: chevron icon, muted default, active when sorted.
- Badges: small, tight padding, text + color, no shadows.
- No striped rows, heavy cell borders, or alternating backgrounds.

## Interactions

- Feedback is immediate. Action on click, not after delay.
- Single-item actions: low-profile toast with undo where reversible.
- Destructive actions: `AlertDialog`, always. Confirm button says what it does ("Delete", not "OK").
- Row expansion: smooth, inline, chevron rotates, no layout shift.
- Filters apply on change. Search: short debounce.
- Bulk action bar appears only when items are selected.

## Status

- Every status has a text label. Color reinforces, never replaces.
- Consistent severity ladder: red (critical) → orange (elevated) → yellow (at-risk) → green (healthy) → muted (info).
- Same value = same color everywhere in the dashboard.

## Empty and Loading

- Distinguish "no data exists" from "no results match filters" — different messages, different actions.
- Loading: skeleton placeholders shaped like the content. No spinners.
- Never show a blank area without explanation.

## Accessibility

- Visible focus rings on all interactive elements.
- `aria-label` on icon-only controls.
- `<th scope="col">` on table headers.
- Visible labels on form fields.
- No critical info in tooltips only.
