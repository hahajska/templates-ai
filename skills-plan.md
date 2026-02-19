# Template Repo AI Guidance Guide

Use this guide in your templates repository so AI behavior is consistent when users iterate on templates in the web app.

## Goal

For each template, define:

- Hard constraints (`rules.md`)
- General implementation skill (`skills.md`)
- UX design guidance (`ux.md`)
- Frontend engineering guidance (`frontend.md`)
- Template/domain context (`knowledge.md`)

This keeps AI output predictable, high-quality, and template-specific.

## Required Structure

For every template folder:

```text
templates/<template-id>/
  rules.md
  skills.md
  ux.md
  frontend.md
  knowledge.md
  ...template runtime files
```

## What The App Does With These Files

During template sync:

- `rules.md` is stored as Template Rules (`ai_rules`) and treated as hard constraints.
- `skills.md` is used as base Agent Skills context.
- `ux.md`, `frontend.md`, and `knowledge.md` are appended to Agent Skills as labeled sections.

Prompt behavior:

- Instruction precedence is:
  1. System instructions
  2. Template Rules (`rules.md`)
  3. User request
- Skills context (`skills.md` + `ux.md` + `frontend.md` + `knowledge.md`) guides implementation, but does not override rules.

## File-by-File Authoring

## 1) `rules.md` (hard constraints)

Use strict, testable rules. Prefer MUST/NEVER wording.

Include:

- Allowed/blocked dependency policy
- File/architecture boundaries
- Domain safety constraints
- Conflict behavior (reject conflicting part, propose compliant alternative)

Recommended shadcn policy block:

```md
- AI MAY install any shadcn/ui component needed for the request.
- AI MAY run `npx shadcn@latest add <components...>`.
- AI MAY install required shadcn dependencies and update shadcn setup files.
- Non-shadcn third-party packages require user confirmation.
```

## 2) `skills.md` (base implementation skill)

Describe the template’s core purpose, architecture, and extension patterns.

Optional frontmatter (recommended):

```md
---
name: Margin Calls Dashboard
goal: Build a fast, user-friendly risk triage interface
stack: React, Tailwind CSS, shadcn/ui
shadcn-components:
  - Table
  - Badge
  - Select
---
```

Then add:

- Purpose
- Main UI structure
- Extension patterns
- Do / Do not guidance

## 3) `ux.md` (user experience guidance)

Focus on decision speed, clarity, and accessibility.

Include:

- Information hierarchy
- Interaction patterns
- Accessibility expectations
- Visual quality bar

## 4) `frontend.md` (engineering guidance)

Focus on maintainable implementation.

Include:

- Component boundaries
- State management expectations
- Performance constraints
- Safe editing strategy (incremental edits over rewrites)

## 5) `knowledge.md` (domain/template context)

Explain domain semantics and goals.

Include:

- What this template is for
- Primary user jobs
- Critical data fields and their meaning
- Domain-specific constraints or terminology

## High-Quality Writing Rules

- Keep statements concrete and executable.
- Avoid contradictory instructions across files.
- Avoid vague phrases like “make it better” without criteria.
- Reference real file paths used by the template.
- Keep rules short and enforceable.

## Recommended Size Budgets

To reduce prompt truncation risk:

- `rules.md`: keep under ~8,000 characters
- Combined skills context (`skills.md` + `ux.md` + `frontend.md` + `knowledge.md`): keep under ~12,000 characters when possible

If content is too long, the app may truncate parts of guidance.

## Example (Minimal Starter)

`rules.md`

```md
## Priority
- System > Template Rules > User request.

## Dependencies
- AI MAY install any shadcn component and required dependencies.
- Non-shadcn package installs require user confirmation.

## Boundaries
- Do not modify /index.js unless explicitly requested.
- Keep edits incremental; avoid full rewrites.
```

`skills.md`

```md
---
name: Dashboard Starter
goal: Enable fast, accurate triage workflows
stack: React, Tailwind CSS, shadcn/ui
---

## Purpose
Operations dashboard focused on scan speed and safe actions.
```

`ux.md`

```md
## UX
- Keep critical status visible without hover.
- Use labels and icons, not color alone.
```

`frontend.md`

```md
## Frontend
- Keep reusable UI in /components.
- Prefer localized edits over full file rewrites.
```

`knowledge.md`

```md
## Domain
- Show risk level, due time, and owner in the main table.
```

## Review Checklist Before Commit

- `rules.md` exists and is explicit.
- `skills.md` exists and includes clear purpose.
- `ux.md`, `frontend.md`, `knowledge.md` exist and are not contradictory.
- shadcn install policy is explicitly allowed.
- File paths mentioned in guidance exist in the template.

## Migration Notes

If an older template uses `RULES.md` / `SKILL.md`, you can keep them temporarily.  
Preferred standard going forward is lowercase:

- `rules.md`
- `skills.md`
- `ux.md`
- `frontend.md`
- `knowledge.md`
