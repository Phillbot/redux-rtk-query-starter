# Modular starter cheat sheet

This template keeps only four top-level areas:

- `app` — shell, providers, router, and global styles.
- `pages` — screens grouped by area (e.g., `common`, `admin`) with their layout + styles.
- `features` — reusable domain/UI blocks (e.g., health card) extracted when they’re used across pages.
- `state` — Redux Toolkit store in a dedicated layer so it can be replaced or removed. Public hooks here act as adapters/facade; keep reducers/RTK Query internals private.
- `shared` — UI kit, configs, and helpers (`RoutePath`, `cn`, `Button`, etc.).

## Adding a page/screen

1) Create a folder in `src/pages/<area>/<screen>` with UI + styles (e.g., `src/pages/common/about`).  
2) Export entry points via `src/pages/<area>/<screen>/index.ts` if you want a facade.  
3) Register the screen in `src/app/router.tsx` and link it from navigation if needed.

## Adding a feature

1) Create `src/features/<name>` with pure UI + styles.  
2) Add `src/features/<name>/index.ts` as a facade; if you need a feature flag, wrap the pure component there.  
3) Import only via `@/features`. Linter blocks deep paths.

## Adding a shared UI component

- Place the component in `src/shared/ui/<component>` with its own `index.ts`, add it to `src/shared/ui/index.ts`.  
- Keep styles nearby, use BEM in SCSS modules, import through the `@/shared/ui` facade.

## Working with Redux Toolkit / RTK Query

- Store lives in `src/state`. Use `useAppDispatch` / `useAppSelector` from that folder.
- RTK Query endpoints live in `src/state` too (see `health-api.ts`), and middleware/reducer are added in `store.ts`.
- Keep slices colocated with UI when they are page-specific, then import them into `src/state/store.ts`. When a UI block is reused across pages, lift it into `src/features/<name>` with its own entry point.
- Want to swap the state layer (e.g., to Zustand or React Query)? Remove `StateProvider` usage inside `AppProviders`, drop Redux pieces from `src/state`, and wire your alternative provider/hooks—but keep the public adapter hooks the same signature so the UI doesn't change.

## Feature flags

- Declare flags in `src/shared/config/feature-flags.ts`, dev override via `VITE_FEATURE_FLAGS=flag:false`.  
- Use `useFeatureFlag('flag')` (facade `@/shared/lib`); in dev there is `FeatureFlagsDevPanel` (mounted in `App`), which persists overrides to `localStorage`.

## Routing & guards

- Routes are lazy-loaded in `src/app/router.tsx`.
- `RoleGuard` wraps elements to restrict by role; roles live in `shared/config/roles`. Replace `getCurrentRole` with real auth logic and limit routes as needed.

## API base URL

- Set `VITE_API_BASE_URL` in `.env` (see `.env.example`). Falls back to `https://httpbingo.org`.
- API base query in `shared/api/base-query.ts` (header stub). Errors are reported via `shared/api/error-reporter`.
- Keep DTO → domain mappers next to the endpoint (e.g., `state/<domain>/mappers.ts`). Validate with Zod.

## Styling & UX

- SCSS modules plus Tailwind utilities; use nested BEM in kebab-case (`.block { &__elem { ... } &__elem--mod { ... } }`). CamelCase imports are generated under `src/__generated__/styles` via `vite-plugin-sass-dts`.
- Keep reusable primitives in `src/shared/ui`. Keep page-specific styles next to components.

## Tests & playground

- Vitest + Testing Library are prewired (see `shared/ui/button/button.test.tsx`).
- Ladle stories can live next to components (`*.stories.tsx`) for quick previews.

## Query params

- Use `useQueryState` from `@/shared/lib` (nuqs). The adapter already wraps `RouterProvider` in `AppRouter`.  
- Use `parseAs*` parsers for types; avoid manual `URLSearchParams`.

## Storage & env

- `storage` from `@/shared/lib` — safe wrapper over `localStorage`.  
- Env validated with Zod in `shared/config/env.ts` (`VITE_API_BASE_URL`).
