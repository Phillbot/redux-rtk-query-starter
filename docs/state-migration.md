# Swapping the state layer

Goal: replace Redux Toolkit / RTK Query with another state/data solution (e.g., Zustand, React Query) without touching UI/screens.

## Principles

- Keep the `@/state` facade stable (export the same hooks/signatures).
- Providers live in `app/providers/app-providers.tsx`; swap state providers there.
- Domain logic stays close to UI/features; only adapter hooks leak out.

## Steps

1) **Decide the facade hooks**  
   - Keep `useCounter`, `useHealthCheck`, `useUuid`, etc. with the same return shape. If you add/remove fields, update consumers explicitly.

2) **Replace the provider**  
   - In `app/providers/app-providers.tsx`, remove `StateProvider` and wrap children with your new provider(s) (e.g., Zustand context, QueryClientProvider). Keep FeatureFlagsProvider.

3) **Reimplement hooks**  
   - Rewrite `src/state/<domain>/hooks.ts` to use the new store/client. Return the same contract (data, status flags, helper actions).
   - For async data, replicate RTK Query flags (`isLoading`, `isError`, `isFetching`, `isUninitialized`) or provide clear equivalents.

4) **Rewire API calls**  
   - If using React Query, create client in `app/providers` and use `useQuery`/`useMutation` inside hooks.  
   - If using custom fetchers, keep mappers (`mappers.ts`) and types (`types.ts`) to convert DTO → domain.

5) **Drop Redux/RTK Query wiring**  
   - Remove `healthApi`/`uuidApi`/middleware/reducers from `state/store.ts` or delete the store entirely.  
   - Remove `useAppDispatch`/`useAppSelector` if not needed; or keep thin adapters to your new store.

6) **Update tests**  
   - Replace store/provider setup in tests with the new provider.  
   - Keep component tests targeting facade hooks/contracts, not implementation details.

7) **Clean up tooling**  
   - Remove unused deps (RTK, React Redux, RTK Query) from `package.json`.  
   - Adjust ESLint/tsconfig paths if you move files.

## Checklist

- [ ] `@/state` exports only adapter hooks, unchanged signatures.  
- [ ] `app/providers/app-providers.tsx` wraps new provider(s).  
- [ ] API/domain mappers/types kept or migrated.  
- [ ] UI builds and lint/tests pass with the new state layer.  
- [ ] Old Redux/RTK Query deps and wiring removed.  
