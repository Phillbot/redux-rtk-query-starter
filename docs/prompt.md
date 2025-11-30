# AI regeneration prompt (use with caution)

If you need to recreate a close approximation of this starter via an AI model, you can use the prompt below. Outputs depend on the model and may require manual fixes.

```
Build a minimal React 19 + Vite 7 + TypeScript 5 starter with structure:
src/
  app/ (router, providers, global styles)
  pages/ (common/admin: home/about/dashboard, layouts)
  features/ (counter, health via RTK Query-like, uuid via RTK Query-like)
  state/ ({STATE_LAYER})
  shared/ (ui primitives, configs, libs, dev-tools)
  __generated__/styles (gitignored SCSS module typings)

Requirements:
- Tooling: Vite + React, ESLint 9 (flat) with TS/React hooks/import order, Stylelint, Vitest/RTL, Ladle. Tailwind 3 + SCSS modules (camelCase). Alias "@/…".
- {STATE_LAYER}
- Feature flags: healthCard/uuidCard. FeatureFlagsProvider with localStorage overrides, FeatureFlagsPanel in dev.
- Telemetry: env `VITE_TELEMETRY_ENABLED`, `VITE_TELEMETRY_URL`, `VITE_WEB_VITALS_ENABLED`; send errors/metrics via fetch/Beacon, console fallback only in dev; Web Vitals (LCP/INP/CLS/TTFB) in main.tsx, disabled in dev.
- HTTP logger: wrap createBaseQuery-equivalent to log url/method/status/duration via Result (ok/err/isOk) into telemetry.
- UI: Button, ErrorBoundary, SuspenseFallback; layouts common/admin; pages home/about/not-found; features counter/health/uuid.
- Styles: SCSS modules + Tailwind, reset + base variables.
- Docs: README (stack/structure/commands/telemetry test), docs/modular-cheatsheet.md, docs/state-migration.md.
- Env example: .env.example with `VITE_API_BASE_URL=https://httpbingo.org`, `VITE_FEATURE_FLAGS=healthCard:true`, `VITE_TELEMETRY_ENABLED=false`, `VITE_TELEMETRY_URL=`, `VITE_WEB_VITALS_ENABLED=true`.
- Configs: tsconfig (references), eslint.config.js (flat), stylelint, tailwind/postcss, vite.config (sass-dts, camelCase modules), ladle.config, vitest.setup.
- Tests: health-api.test.ts (mock fetch), button.test.tsx.
- Facades: shared/lib (cn, storage, feature-flag hooks, result ok/err/isOk, telemetry, web-vitals), shared/api (base-query + http-logger), shared/config (env, api endpoints, routes, nav/lang/roles/i18n, telemetry).
- .gitignore: node_modules, dist, .env*, __generated__, Tailwind/SCSS typings, editor files.

Generate all files/code, keep structure/facades, use "@/” imports. Lint/TS must be clean.

Example for {STATE_LAYER}:
“Zustand store with RTK Query–like adapters: state and async flows in Zustand; public hooks useCounter/useHealthCheck/useUuid via '@/state'; no deep imports; no providers; shared fetcher, hooks expose isLoading/isError/isFetching/dataOption.”
```
