# Templates Repo Migration Plan (Adjusted)

**Target repository:** `https://github.com/hahajska/templates-ai`  
**Platform using these templates:** `/Users/tomasschlogl/Downloads/testaiv2`  
**Primary objective:** Make each template run in WebContainers while preserving Sandpack fallback compatibility.

## 1. Why This Plan Exists

Your platform now supports:
- Sandpack fallback preview
- WebContainer preview (feature-flagged, diagnostics available)
- AI template rule injection from `RULES.md`

To benefit from WebContainers, each template must be runnable with:
- `npm run dev` (preferred)
- or `npm run start` (fallback)

## 2. Hard Constraints (Current Platform)

- Max files per template: `30`
- Max total template size: `250 KB`

Operational constraints:
- Keep templates as React app templates (not Next.js app-router projects)
- Keep core entry files predictable (`index.js`, `App.js`)
- Avoid server-only dependencies and Node-only APIs in client code

## 3. Runtime Contract (Dual Runtime)

Baseline folder shape (required + optional):

```text
templates/<template-name>/
  package.json
  index.html                    # Vite/WebContainer entry
  index.js                      # React mount entry (also used by current AI prompt assumptions)
  App.js
  styles.css                    # optional for Profile A, required for Profile B
  components/...
  RULES.md                      # recommended (AI quality)
  vite.config.js                # optional in Profile A, recommended in Profile B
  tailwind.config.js            # optional (Profile B only)
  postcss.config.js             # optional (Profile B only)
```

Notes:
- `index.html` at template root is required for Vite/WebContainer.
- Keep `index.js` + `App.js` for compatibility with current platform behavior.
- `RULES.md` is extracted during sync and stored separately (already implemented in platform `lib/github.ts`).

## 4. Styling Profiles (Choose One)

### Profile A: Compatibility-first (Recommended now)
Use Tailwind CDN in `index.html`.

Why:
- Best compatibility with current Sandpack fallback.
- Minimal moving parts.
- Lower risk during migration.

Example `index.html` head:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Profile B: Vite-processed Tailwind (Optional)
Use real Tailwind build pipeline via PostCSS.

Use only if you intentionally standardize templates around Vite processing.

Required additions:

`package.json` devDependencies:

```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

`styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`tailwind.config.js`:

```js
export default {
  content: ["./**/*.{js,jsx}"],
};
```

`postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

`index.html` should link stylesheet instead of CDN script:

```html
<link rel="stylesheet" href="/styles.css" />
```

Important:
- Do not force Profile B unless you are ready to validate fallback behavior thoroughly.
- If fallback path does not process Tailwind directives, styles can break in Sandpack.

## 5. Package and Script Standard

Baseline `package.json` for all templates:

```json
{
  "name": "template-name",
  "private": true,
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 5173 --strictPort",
    "start": "vite --host 0.0.0.0 --port 5173 --strictPort",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

`vite.config.js` (recommended baseline):

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

## 6. RULES.md Standard (Recommended)

Per template, add `RULES.md`:

```md
# Template Rules

## Design Tokens
- Define core colors/spacing used in this template.

## Structure Rules
- Preserve component boundaries unless explicitly asked.
- Prefer editing existing files over creating new ones.

## Accessibility Rules
- Interactive elements require accessible labels.
- Maintain keyboard focus visibility.

## Constraints
- No Next.js APIs.
- Keep styling in Tailwind utility classes.
```

Implementation note:
- Platform sync already extracts `RULES.md` / `.ai-rules` and stores rules separately (`lib/github.ts`).

## 7. File Budget Guidance

If using Profile B (Vite + Tailwind config stack), baseline setup is typically around 9-10 files before real template content.

With a hard limit of 30 files, that leaves roughly **20 files** for actual template UI/features.

Designers should plan component granularity with this budget in mind.

## 8. Prompt Constraint Note (Current vs Future)

Current platform prompt (`/Users/tomasschlogl/Downloads/testaiv2/app/api/chat/route.ts`) still says:
- “Plain .js files only, NO TypeScript”

So for now:
- Keep templates `.js`-based to align with active prompt behavior.

When platform prompt is later relaxed to extension-aware behavior, templates can migrate to `.ts/.tsx` if desired.

## 9. Migration Steps (Repo-Wide)

### Phase A: Inventory and gap report
Run in templates repo root:

```bash
find templates -maxdepth 1 -mindepth 1 -type d | sort

for d in templates/*; do
  [ -d "$d" ] || continue
  echo
  echo "== $d =="
  [ -f "$d/package.json" ] && echo "package.json: OK" || echo "package.json: MISSING"
  [ -f "$d/index.html" ] && echo "index.html: OK" || echo "index.html: MISSING"
  [ -f "$d/index.js" ] && echo "index.js: OK" || echo "index.js: MISSING"
  [ -f "$d/App.js" ] && echo "App.js: OK" || echo "App.js: MISSING"
  [ -f "$d/RULES.md" ] && echo "RULES.md: OK" || echo "RULES.md: MISSING (recommended)"
done
```

### Phase B: Normalize runtime files
For each template:
1. Ensure `package.json` exists.
2. Ensure `scripts.dev` and/or `scripts.start` exist.
3. Ensure root `index.html` exists.
4. Ensure `vite.config.js` exists if using Vite plugin workflow.
5. Choose styling profile (A recommended now).

### Phase C: Add/upgrade RULES.md
Add concise template-specific rules (avoid generic placeholders).

### Phase D: Local execution test
Inside each template folder:

```bash
npm install
npm run dev
```

Expected:
- dev server starts without errors
- initial template render has no runtime crash

### Phase E: Platform validation
Back in `testaiv2`:
1. Open `/admin` and click `Sync Templates from GitHub`.
2. Confirm each template syncs without errors.
3. If template health/runtime checks are implemented, verify warnings there.
4. If checks are unavailable, create an iteration and inspect browser console + diagnostics panel during WebContainer boot.
5. Enable runtime flags:
   - `PREVIEW_RUNTIME=webcontainer`
   - `ENABLE_WEBCONTAINER=true`
6. Run at least one full edit cycle per template.

## 10. Acceptance Criteria

A template is considered migrated when:
- It has runnable scripts (`dev` or `start`)
- It boots in WebContainer preview without manual recovery
- It still works under Sandpack fallback path
- It remains under sync limits (`<=30 files`, `<=250 KB`)
- `RULES.md` is present and AI behavior reflects the rules

Repo-wide done when:
- Templates sync cleanly
- WebContainer diagnostics pass for representative templates
- AI edit flow remains stable: prompt -> file update -> preview refresh

## 11. Common Pitfalls

- Missing root `index.html` for Vite templates
- Scripts only for build, no dev/start
- Forcing Profile B Tailwind too early and breaking fallback styles
- Using aliases/import paths without resolver config
- Heavy deps causing long install/boot times in browser runtime
- Exceeding 30-file / 250KB sync limits

## 12. Suggested PR Sequence (`templates-ai`)

1. **PR 1: Runtime baseline**
   - Add missing `package.json`, scripts, and root `index.html`
2. **PR 2: Rules rollout**
   - Add `RULES.md` per template
3. **PR 3: Optional Tailwind profile migrations**
   - Move selected templates to Profile B only where validated
4. **PR 4: cleanup + budget enforcement**
   - Remove dead files, reduce size, keep under sync limits
