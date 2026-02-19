# Margin Risk Dashboard — Knowledge

## What This Is

A centralized dashboard for the Ops team to monitor, manage, and stress-test margin call exposure across Maple's loan book. It replaces fragmented spreadsheet tracking with real-time visibility into margin call status, cure progression, and portfolio-wide risk.

---

## Problem

Ops has no centralized real-time view of margin calls. This causes:

- **Missed deadlines** — No visibility into cure progression means liquidation thresholds can be missed.
- **No predictive tooling** — Can't model how price drops would cascade across the book.
- **Manual tracking** — Margin call status lives in spreadsheets and Slack, creating audit gaps and delays.

---

## What We're Building (v1)

1. **Active Margin Calls** — Real-time table of all loans in/approaching margin call, sortable by severity, with acknowledge workflow.
2. **Book-Level Metrics** — Nearest margin call triggers by asset + price scenario heatmap.
3. **Stress Test Simulator** — Hypothetical price inputs → projected margin call / liquidation impact.
4. **Historical Analysis** — Cure activity log with summary metrics, date filtering, CSV export.

### Out of Scope (v2 — Do Not Build)

- Cure progression tracking (amount delivered vs. required, deadline countdown)
- Assignment/claim workflow for margin calls
- Owner visibility and coordination features
- Impairment price display
- Ack'd by borrower audit trail (who + timestamp)

---

## Page Structure

The dashboard has a persistent global header and four tabs.

### Global Header (always visible)

- **Title** — "Margin Risk Dashboard"
- **Live indicator** — pulsing green dot with "LIVE" label
- **Last updated timestamp** — UTC
- **Book Value** — total dollar value of the book

**Summary metric cards** (four, clickable — clicking filters the Active Margin Calls table):

| Metric | Color | Click behavior |
|---|---|---|
| Loans At Risk | Yellow | Filters to At Risk status |
| Active Margin Calls | Orange | Filters to Margin Call status |
| Critical (>75% LTV) | Red | Filters to LTV > 75% |
| Unacknowledged | Blue | Filters to unack'd margin calls |

### Critical Attention Banner

Conditional — only appears when any loans have LTV > 75% AND < 24 hours to cure deadline. Clicking it filters the Active Margin Calls table to show only those loans.

### Tab Navigation

Four peer-level tabs. Switching tabs preserves filter/sort state within the session. URL reflects current tab.

1. **Active Margin Calls** (default)
2. **Book-Level Metrics**
3. **Stress Test**
4. **Historical Analysis**

---

## Tab 1: Active Margin Calls

The primary operational view. A filterable, sortable, expandable table of all loans in or approaching margin call.

### Filters and Controls

- **Search** — by borrower name or loan ID
- **Sort options** — Severity (LTV ↓/↑), Duration (longest/newest), Principal (highest), Distance to liquidation (closest)
- **Status filter** — All, Margin Call, Acknowledged, At Risk, Liquidated
- **Asset filter** — All, BTC, ETH, SOL (dynamic based on portfolio)
- **Clear filters** button when any filter is active
- **Refresh Data** button

**Default sort:** Distance to liquidation ascending (most critical first).

### Table Columns

| Column | Alignment | Notes |
|---|---|---|
| Checkbox | Center | For bulk selection |
| Expand chevron | Center | Toggles expanded row details |
| Status | Left | Badge showing current status |
| Borrower | Left | Company name |
| Loan ID | Left | Clickable link to loan detail page |
| Asset | Left | Icon + ticker (BTC, ETH, SOL) |
| Principal | Right | Dollar amount, monospace |
| LTV | Right | Percentage, color-coded by severity |
| Liquidation Price | Right | Asset price at liquidation threshold |
| Distance to Liquidation | Right | Percentage to trigger |
| Hours Open | Right | Time since margin call triggered |
| Cure Progress | Left | Visual progress bar + percentage |
| Action | Center | Acknowledge button or Ack'd indicator |

### Expanded Row Details

Clicking the chevron expands a row to show a four-column detail grid:

1. **Collateral Details** — collateral amount, current value, current price
2. **Risk Thresholds** — Margin Call LTV, Liquidation LTV, Current LTV
3. **Price Triggers** — Margin Call price, Liquidation price
4. **Actions** — Acknowledge button or ack'd confirmation with timestamp

Plus an **LTV Progress Bar** showing current LTV position against the MC and liquidation thresholds visually.

### Acknowledge Workflow

- Toggle per row for Ops to mark that the borrower has been contacted
- Ack persists until the margin call is fully cured
- Ack resets when a new margin call event triggers on the same loan
- Ack'd status is filterable
- Notification on acknowledge with undo option
- Bulk acknowledge supported via checkbox selection

### Pagination

- Page size options: 10, 25, 50, 100
- First / previous / page numbers / next / last navigation
- "Showing X–Y of Z" counter

---

## Tab 2: Book-Level Metrics

Portfolio-wide risk exposure across two sections.

### Nearest Margin Call Triggers by Asset

One row per collateral asset showing:

| Field | Description |
|---|---|
| Asset | Icon + symbol |
| Current Price | Live market price |
| Next Trigger Price | Price at which the nearest loan triggers MC |
| % Move Required | How far price must drop |
| Loans at Risk | Count of loans that would trigger |
| Exposure | Total principal at risk |

Rows are clickable → filter Active Margin Calls to that asset.

### Price Scenario Heatmap

A grid showing how many loans would trigger margin calls at various price drops, per asset.

Columns: **-5%**, **-10%**, **-15%**, **-20%**
Rows: One per asset (BTC, ETH, SOL, etc.)

Each cell shows:
- Count of loans that would trigger
- Absolute dollar price at that threshold

Color intensity scales with count (0 = neutral, higher = more red).
Cells are clickable → reveal affected loan IDs.

---

## Tab 3: Stress Test

Interactive simulator for modeling hypothetical price scenarios.

### Price Input Cards

One card per collateral asset showing:
- Current market price (read-only)
- Editable absolute price field
- Editable percentage change field
- Both fields stay synced (changing one recalculates the other)

**"Reset to Market Prices"** button restores all inputs to live values.

### Projected Impact Summary

Four metric cards that update in real-time (<500ms) as prices are adjusted:

| Metric | Description |
|---|---|
| New Margin Calls | Count of loans that would newly trigger MC |
| Liquidations Triggered | Count that would hit liquidation |
| Total Exposure | Principal amount affected |
| Collateral Shortfall | Total shortfall amount |

### Affected Loans Table

Simplified table of impacted loans showing: Loan ID, Borrower, Asset, Principal, Current LTV, **Projected LTV**, and Impact type (New MC / Liquidation).

---

## Tab 4: Historical Analysis

Cure activity analysis with exportable data.

### Controls

- **Date range selector** — Last 7 Days, Last 30 Days, Last Quarter, Last Year, Custom Range (default: Last 30 Days)
- **Export CSV** button — exports all visible fields plus timestamps

### Summary Metrics

Four cards with trend indicators (vs. previous period):

| Metric | Trend direction |
|---|---|
| Total Margin Calls | ↑ = worse |
| Avg Time to Cure | ↓ = better |
| Total Value at Risk | ↑ = worse |
| Cure Success Rate | ↑ = better |

### Cure Activity Log

Historical table of all margin call events:

| Field |
|---|
| Loan ID (clickable to loan detail) |
| Borrower |
| Asset |
| Trigger Date |
| Cure Date |
| Time to Cure (hours) |
| Shortfall Amount |
| Cure Amount |
| Resolution Status: Cured / Liquidated / Active |

With pagination.

---

## Loan Statuses

| Status | Display Label | Color | Meaning |
|---|---|---|---|
| At Risk | AT RISK | Yellow | Approaching MC LTV, not yet triggered |
| Margin Call | MARGIN CALL | Red | MC threshold breached, needs attention |
| Acknowledged | ACKNOWLEDGED | Blue | Ops confirmed borrower has been contacted |
| Liquidated | LIQUIDATED | Dark red | Loan was liquidated |

---

## Color Logic

**LTV severity:** ≥80% = red, ≥70% = orange, ≥60% = yellow, below = green

**Distance to liquidation:** ≤5% = red, ≤10% = orange, ≤20% = yellow, above = neutral

**Cure progress:** <40% = red, 40–80% = yellow, ≥80% = green

**Heatmap cells:** 0 = neutral gray, 1–2 = yellow, 3–5 = orange, 6–10 = light red, 11+ = darker red

---

## Key Domain Concepts

- **LTV (Loan-to-Value)** — Ratio of loan principal to collateral value. Higher = riskier.
- **Margin Call LTV** — The LTV threshold at which a margin call is triggered. Borrower must post additional collateral or repay.
- **Liquidation LTV** — The LTV threshold at which the protocol liquidates the collateral. This is the hard deadline.
- **Distance to Liquidation** — Percentage gap between current LTV and liquidation LTV. Lower = more urgent.
- **Cure** — The process of a borrower resolving a margin call by posting additional collateral or repaying part of the loan.
- **Cure Progress** — Percentage of required cure amount that has been delivered.
- **Impairment Price** — (v2) A price threshold below which the loan is considered impaired for accounting purposes.
- **Collateral Shortfall** — The dollar gap between required collateral and actual collateral at a given price.

---

## Formatting Conventions

- **Currency** — `$1,234,567` (no decimals for large amounts)
- **Crypto prices** — `$92,450` for prices ≥ $1,000; `$3.25` for prices < $1,000
- **Duration** — `48h`, `2d 3h`, `45m`
- **Dates** — `Feb 5, 2026`
- **Timestamps** — `Feb 5, 2026, 02:30 PM`
- **Numbers in tables** — monospace font for all financial figures

---

## Interaction Patterns

- **Row expansion** — Chevron click reveals detailed loan info inline
- **Acknowledge** — Single-click button per row; toast notification with undo
- **Bulk actions** — Checkbox selection → bulk acknowledge
- **Clickable metrics** — Header summary cards filter the main table
- **Clickable heatmap cells** — Reveal affected loan IDs
- **Stress test inputs** — Real-time recalculation on every keystroke (<500ms)
- **Reset** — Stress test has a "Reset to Market Prices" button
- **Export** — CSV download from Historical tab
- **Empty states** — "No active margin calls" (all healthy) or "No matching results" (filters too narrow)

---

## Design References

- Lee's prototype: https://claude.ai/artifacts/3d6053d9-80d7-4277-a81b-8ddb4a28f158
- Live reference: https://v0-crypto-loan-risk-dashboard.vercel.app/
- Adrian's prototype: https://claude.ai/artifacts/8591a31f-39a4-446d-9dc2-fa23e2a07e14
- Mueller's prototype: https://claude.ai/artifacts/90952ad2-48e6-435b-8a34-76a3f2e05340