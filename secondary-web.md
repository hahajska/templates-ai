# Overview Of App (For Template-Repo AI Agent)

This document explains the product we are building and how template work should be done so template iterations in the web app are high quality and reliable.

## What We Are Building

We are building a web app where users:

1. Pick a starter template.
2. Chat with an AI agent to modify that template.
3. See/apply file changes live as the app evolves.

The goal is fast, safe iteration on real app code, not one-off code snippets.

## How The System Works

High-level flow:

1. Templates are synced from a templates repository.
2. Template files are stored in DB.
3. Users create iterations from a template snapshot.
4. AI receives current files + template guidance context.
5. AI returns complete updated file contents for changed files.
6. Changes are persisted as new iteration revisions.

## Runtime Model And Constraints

The code-generation runtime is a React app sandbox. Assume:

- Entry file: `/index.js`
- Main UI file: `/App.js`
- Extra components in `/components/*`
- JavaScript only (no TypeScript for generated app files)
- Tailwind CSS style workflow

Key quality expectations:

- Preserve existing behavior unless user asks to change it.
- Apply scoped edits, not full rewrites.
- Keep components composable and predictable.
- Keep UX clear and not generic/template-looking.

## Template Guidance Files (Per Template)

Each template should include:

```text
templates/<template-id>/
  rules.md
  skills.md
  ux.md
  frontend.md
  knowledge.md
```

How these are used:

- `rules.md` -> hard Template Rules.
- `skills.md` -> base skill context.
- `ux.md`, `frontend.md`, `knowledge.md` -> appended to skills context.

Instruction priority:

1. System instructions
2. Template Rules (`rules.md`)
3. User request

If user request conflicts with rules, follow rules and provide the nearest compliant implementation.

## Package Policy (Important)

We want flexibility for shadcn:

- AI may add any shadcn/ui component and required dependencies when needed.
- Non-shadcn packages should only be added when explicitly requested or required by template rules.

When writing template guidance, do not include blanket “no npm packages ever” rules that block shadcn.

## What Matters Most To Us

1. Reliability over flashy output.
2. Clear UX hierarchy and accessibility.
3. Domain-appropriate interfaces (not generic cloned layouts).
4. Small, maintainable changes and predictable structure.
5. Guidance that is explicit, testable, and non-contradictory.

## Template Authoring Standards

For every template:

- Include all 5 guidance files.
- Use concrete language (MUST/NEVER where relevant).
- Reference real file paths used in that template.
- Keep guidance concise enough to avoid prompt truncation.
- Keep visual semantics consistent (status labels, action language, terminology).

## Practical Limits To Respect

Current sync validation enforces:

- Maximum template file count: 30
- Maximum total template size: ~250 KB

Keep runtime template files focused. Avoid unnecessary files.

## Definition Of Done (Template Is Ready)

A template is ready when:

1. It runs cleanly in the sandbox structure.
2. Guidance files exist and are coherent.
3. Rules do not conflict with skills/ux/frontend/knowledge.
4. AI can make incremental edits without breaking structure.
5. UI outcomes are user-friendly, accessible, and domain-correct.

## How To Collaborate With This Team

When improving templates:

1. Prefer precision over verbosity.
2. Explain tradeoffs briefly when rejecting conflicting requests.
3. Keep changes backwards-compatible where possible.
4. Optimize for iteration speed and clarity for end users.

Primary objective: help users get high-quality results quickly while keeping generated app code stable and maintainable.