# Redux + RTK Query starter

Minimal React 19 boilerplate with a modular folder layout, Redux Toolkit instead of Zustand, RTK Query for async flows, and handy-ts-tools for small TypeScript helpers.

## Stack

- React 19 + React Router 7
- Vite 7 + TypeScript 5
- Redux Toolkit + React Redux (state lives in `/state`)
- RTK Query for data fetching/caching (in the same store)
- handy-ts-tools for runtime asserts and type helpers
- zod for schema/validation
- nuqs for query params (React Router)
- Tailwind CSS 3 + SCSS modules (camelCase typings)
- ESLint 9 (flat config) + strict tsconfig

## Highlights

- **Layout**: `app`, `pages`, `features`, `state`, `shared`—no FSD layers. Pages live in `src/pages` next to their styles; shared UI/logic sits in `features` or `shared`.
- **State facade**: only hooks (`useCounter`, `useHealthCheck`) are exported from `@/state`. Treat them as adapters/public contract to the state layer; reducers, RTK Query API, and types stay internal. `StateProvider` is imported directly only inside `app/providers`.
- **Swap the state layer**: replace Redux/RTK Query by editing `src/app/providers/app-providers.tsx` and the `src/state` contents; the rest of the code only touches the `@/state` adapter hooks. ESLint blocks deep imports (`@/state/*`).
- **RTK Query demo**: health check against `https://httpbin.org/get` showcasing statuses, cache, and refetch.
- **Styling**: global SCSS + Tailwind utilities. Write kebab-case selectors in `.module.scss` with nested BEM (`.block { &__elem { ... } &__elem--mod { ... } }`); camelCase typings are generated to `src/__generated__/styles` by `vite-plugin-sass-dts`.
- **Utilities**: `cn` for class merging; `handy-ts-tools` for type guards; `zod` for env/data schemas; `nuqs` re-exported for query params.
- **Testing & playground**: Vitest + Testing Library; Ladle stories under `*.stories.tsx`.

## Architecture notes

- State hooks are the adapter contract. UI depends only on `useCounter` / `useHealthCheck`; the implementation behind them can change.
- Data mapping lives in `src/state/health/mappers.ts` to decouple API DTOs from domain types.
- Optional data is expressed as `Option` (see `src/shared/lib/result.ts`) and checked via `isSome`; expand to `Result<T,E>` for richer error handling.
- Feature flags: configure in `src/shared/config/feature-flags.ts` (env override `VITE_FEATURE_FLAGS`), read via `useFeatureFlag` from `@/shared/lib`.
- ESLint enforces facade imports: no deep imports from `@/state/*` or `@/features/*`; shared utilities are re-exported via `@/shared/lib`.
- Dev-only flags UI: in dev builds, `FeatureFlagsDevPanel` (mounted in `App`) lets you toggle flags and persists overrides to `localStorage` under `feature_flags_overrides`.
- Swapping state layer? See `docs/state-migration.md` for a step-by-step guide to replace Redux/RTK Query while keeping the `@/state` facade stable.

See `docs/modular-cheatsheet.md` for quick guidelines on adding pages and wiring data.

## TODO / Considerations

- Split route configs per area (e.g., `common`/`admin`) and compose them in `app/router` as the app grows.
- Extend `createBaseQuery` with retries/auth headers/Accept-Language once backend requirements are clear.
- Add Zod schemas for API responses beyond the demo health/uuid endpoints.

## Structure

```
src/
├─ app/                 # shell, providers, router, global styles
├─ features/            # reusable domain blocks (e.g., health card)
├─ pages/               # screens grouped by area (common, admin)
├─ state/               # Redux store/RTK Query, hooks, provider (publicly exposed only via '@/state')
├─ shared/              # ui kit, configs, libs
└─ __generated__/styles # SCSS module typings (gitignored)
```

## Requirements

- Node.js ≥ 20.19 (or ≥ 22.12) and pnpm ≥ 10.22
- Install deps: `pnpm install`
- Run dev server: `pnpm dev`

## Commands

Install dependencies once with `pnpm install`, then use:

| Script | Description |
| --- | --- |
| `pnpm dev` | Start Vite dev server with HMR |
| `pnpm build` | Type-check (`tsc -b`) + production Vite build |
| `pnpm preview` | Serve the built app locally |
| `pnpm lint` | ESLint for TS/JS sources |
| `pnpm lint:styles` | Stylelint for SCSS/Tailwind files |
| `pnpm test` / `pnpm test:watch` | Vitest in run/watch modes (happy-dom) |
| `pnpm ladle` | Launch Ladle UI playground |
| `pnpm clean:modules` | Remove `node_modules` + lockfile and reinstall dependencies |
| `pnpm clean:style-types` | Delete generated `*.module.scss.d.ts` files if they get out of sync |
| `pnpm clean:all` | Run both clean scripts sequentially |
| `pnpm verify` | Run lint + stylelint + tests + build sequentially |

## Getting started

1. Clone the repo and install dependencies (`pnpm install`).
2. Run `pnpm dev` to start the app.
3. Use `src/pages/common/home` as a reference: Redux counter + RTK Query health check in one screen.
4. Add pages under `src/pages/<area>/<screen>` (e.g., `common`, `admin`) and wire routes in `src/app/router.tsx`.
5. Use state only via `import { useCounter, useHealthCheck } from '@/state'`; deep imports are linted as errors.
6. To swap out Redux/RTK Query, change `src/app/providers/app-providers.tsx` and the contents of `src/state`; no other code should need edits.

## API layer

- `src/shared/api/base-query.ts` — `createBaseQuery` over `fetchBaseQuery` with a stubbed auth-header hook; `API_BASE_URL` comes from `VITE_API_BASE_URL` (fallback to `https://httpbin.org`).
- `src/shared/api/error-reporter.ts` — centralized error reporter; `ErrorBoundary` reports here. Swap `setErrorReporter` for Sentry/etc.
- `src/state/health/health-api.ts` — timed wrapper around the base query hitting the httpbin placeholder endpoint.

## Error handling & guards

- Global `ErrorBoundary` wraps the app shell (`shared/ui/error-boundary`) and reports via `reportError`.
- Role checks via `RoleGuard` + roles in `shared/config/roles` (replace stubbed `getCurrentRole` with real auth).

## Routing, guards, and lazy loading

- Routes are lazy-loaded via `React.lazy` and wrapped in `Suspense` with a shared fallback.
- `RoleGuard` lives in `shared/lib/guards/role-guard` and uses roles from `shared/config/roles`. By default everyone (`guest/user/admin`) is allowed; replace `getCurrentRole` with real auth logic and restrict routes as needed.
- Query params: `lang` syncs via `nuqs` (`useQueryState`); helpers are re-exported from `@/shared/lib`.
- Navigation/lang options centralized in `src/shared/config/navigation.ts` and `src/shared/config/languages.ts`.

> ⚠️ Vite requires Node.js ≥ 20.19 or ≥ 22.12. Upgrade if you use an earlier version to avoid warnings.
