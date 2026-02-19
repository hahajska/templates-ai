# Margin Risk Dashboard — Knowledge

A centralized dashboard for Ops to monitor, manage, and stress-test margin call exposure across the loan book. Replaces spreadsheet tracking with real-time visibility into margin call status and portfolio risk.

## Scope

- Active margin call monitoring with acknowledge workflow
- Book-level risk metrics and price scenario heatmap
- Stress test simulator for hypothetical price scenarios
- Historical cure activity analysis with export

**Out of Scope — Do Not Build:**
- Detailed cure progression tracking (amount delivered vs. required, deadline countdown, step-by-step)
- Assignment/claim workflow for margin calls
- Owner visibility and coordination features
- Impairment price display
- Ack'd-by audit trail (who + timestamp)

## Domain

The business is crypto-backed lending. Borrowers pledge crypto assets (BTC, ETH, SOL) as collateral for dollar-denominated loans. When collateral value drops, loans become riskier — eventually triggering margin calls and, if unresolved, forced liquidation.

## Key Concepts

- **LTV (Loan-to-Value)** — Loan principal ÷ collateral value. Higher = riskier.
- **Margin Call LTV** — The LTV threshold that triggers a margin call. Borrower must post additional collateral or repay.
- **Liquidation LTV** — The LTV threshold that triggers forced liquidation. This is the hard deadline.
- **Distance to Liquidation** — Percentage gap between current LTV and liquidation LTV. Lower = more urgent.
- **Cure** — Borrower resolves a margin call by posting additional collateral or repaying part of the loan.
- **Collateral Shortfall** — Dollar gap between required collateral and actual collateral at a given price.
- **Acknowledge** — Ops marks that a borrower has been contacted about a margin call. Resets if a new margin call event triggers on the same loan.

## Loan Statuses

| Status | Label | Meaning |
|---|---|---|
| At Risk | AT RISK | Approaching margin call LTV, not yet triggered |
| Margin Call | MARGIN CALL | Margin call threshold breached, needs attention |
| Acknowledged | ACKNOWLEDGED | Ops confirmed borrower has been contacted |
| Liquidated | LIQUIDATED | Collateral was liquidated |

## Severity Thresholds

- **LTV:** ≥80% critical, ≥70% warning, ≥60% at-risk, below healthy
- **Distance to liquidation:** ≤5% critical, ≤10% warning, ≤20% at-risk, above normal

## Key Data Fields

- Borrower name, Loan ID, Asset type (BTC/ETH/SOL), Principal amount, Current LTV, Liquidation price, Distance to liquidation, Hours since margin call triggered, Collateral amount and value, Margin call price trigger, Liquidation price trigger

## Key Metrics

- Loans at risk (approaching margin call)
- Active margin calls (threshold breached)
- Critical loans (LTV > 75%)
- Unacknowledged margin calls
- Total book value and exposure
- Cure success rate and average time to cure

## Stress Testing

Ops needs to model hypothetical price drops across collateral assets and see which loans would trigger new margin calls or liquidations, the total exposure affected, and the collateral shortfall.

## Formatting Conventions

- Currency: `$1,234,567` (no decimals for large amounts)
- Crypto prices: `$92,450` (≥$1k), `$3.25` (<$1k)
- Duration: `48h`, `2d 3h`, `45m`
- Dates: `Feb 5, 2026` / Timestamps: `Feb 5, 2026, 02:30 PM`
- Numbers in tables: monospace / `tabular-nums`
