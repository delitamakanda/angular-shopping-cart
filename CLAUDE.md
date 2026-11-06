# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Angular 22 shopping cart demo app: product catalogue with filtering/search, cart management, auth-gated admin area, all backed by a hosted REST API (`https://merchstoreapi.applikuapp.com/api`). Standalone components throughout (no NgModules except `SharedModule` for pipes/directives), zoneless change detection, signals for state.

## Commands

- `npm start` — dev server at `http://localhost:4200` (uses `environment.development.ts`)
- `npm run build` — production build to `dist/angular-shopping-cart`
- `npm run watch` — incremental dev build on file changes
- `npm test` — run the full unit test suite (Vitest via `@angular/build:unit-test`, configured through `tsconfig.spec.json` and the `testing` build configuration in `angular.json`)
- `npm run extract-i18n` / `npm run localize` — i18n source extraction / localized builds (source locale `en-US`, additional locale `fr` at `src/locale/messages.fr.xlf`)

To run a single test file, use `--include` (and `--watch=false` for a one-shot run):
```
npx ng test --include src/app/core/services/cart.service.spec.ts --watch=false
```

CI (`.github/workflows/node.js.yml`) runs `npm ci`, `npm run build --if-present`, then `npx ng test --watch=false` on Node 24.15.x.

End-to-end tests (Playwright, `e2e/`): `npm run e2e` (starts `ng serve` if nothing listens on :4200). They must never hit the hosted API: stub every call with `stubApi(page, …)` from `e2e/helpers/api.ts`.

Node/npm versions are pinned in `package.json` `engines` (Node 24.15.0, npm 11.12.1).

## Architecture

### Routing & bootstrap
- `src/app/app.config.ts` is the composition root: registers the router, zoneless change detection, the `authInterceptor`, a custom `RouteReuseStrategy` (`custom-route-reuse-strategy.ts`, opt-in per-route via `data.reuseRoute`), a custom `TitleStrategy` (`title.strategy.ts`), the service worker (enabled only outside dev mode), locale (`fr` via `LOCALE_ID`, with `en-US` as i18n source locale), and DI tokens `API_URL`/`APP_ENVIRONMENT` (from `src/app/constants.ts`).
- Routes (`src/app/app.routes.ts`) are all lazy-loaded via `loadComponent`/`loadChildren`. Top-level `HomeComponent` hosts child routes (product list, cart, product detail, static pages); `admin/*` and `login`/`signup` are siblings. Product detail and static-page routes use `ResolveFn`s to set the page title reactively.
- Admin routes (`pages/admin/admin.routes.ts`) are presumably guarded by `authGuard` (`core/guards/auth.guard.ts`) — verify per-route when touching admin.

### Feature/module layout
- `src/app/core/features/` — feature UI components used across pages (cart, products, navbar, search-bar, pagination, price-filter, sort-by, comments, footer). Nested feature dirs (e.g. `products/card`, `products/category-list`, `navbar/avatar`) group a feature with its sub-widgets.
- `src/app/core/services/` — singleton (`providedIn: 'root'`) services: `CartService`, `AuthService`, `ProductService`, `ToastService`, `LoaderService`, `DialogService`, `LoggerService`, `AppConfigService`.
- `src/app/core/state/` and `pages/static-pages/state/` — signal-based store services (e.g. `ProductStoreService`) that wrap a service call + a `signal<State>` + `computed` selectors, exposing imperative methods (`loadProducts`, `setOffset`, `nextPage`, …) instead of NgRx/Redux-style actions/reducers. Follow this pattern for new domain state.
- `src/app/core/interfaces/` — shared domain types, re-exported through `index.ts`.
- `src/app/core/guards/`, `core/interceptors/`, `core/resolvers/`, `core/validators/` — routing/HTTP cross-cutting concerns.
- `src/app/pages/` — route-level container components (home, product, admin/*, login, signup, static-pages, not-found), each typically pairing a component with its own services/state when the page has non-trivial local logic (see `pages/static-pages`).
- `src/app/shared/` — reusable, presentation-only building blocks: `components/` (dialog, loader, rate), `directives/` (`confirm.directive.ts`), `pipes/` (`avatar.pipe.ts`, `product-filter.pipe.ts`), and `helpers/`. Exposed as standalone imports; `shared.module.ts` re-bundles the pipes/directive for any remaining NgModule-style consumers.

### State & data flow conventions
- Prefer signals (`signal`/`computed`) over RxJS subjects for component/service state; RxJS remains the norm for HTTP calls and async streams (`HttpClient` observables piped with `tap`/`catchError`/`switchMap`).
- Store services centralize a state shape + patch pattern: `patchState(partial)` merges into a single `signal<State>`, with public `computed` getters per field — see `ProductStoreService` as the reference implementation. `CartService` predates this pattern and is mid-migration to signals (see its `todo` comment on `cartMap`); don't assume all services follow the store pattern yet.
- `CartService` persists cart state to `localStorage` (key `cart_data`) and auto-clears after 1 hour (`CART_EXPIRATION_DELAY`); it exposes `cartMap`/`cartItemsQuantity` internally but derives a signal (`cartItemsWithQuantity`) for templates.

### Auth
- `AuthService` stores `access_token`/`refresh_token` in `localStorage` and as signals; `isAuthenticated` is derived from `access_token()`.
- `authInterceptor` (functional HTTP interceptor) attaches the bearer token to outgoing requests and handles 401s by refreshing the token, queuing concurrent requests via a `BehaviorSubject` until refresh completes, and logging out on refresh failure.
- `authGuard` (functional `CanActivateFn`) redirects unauthenticated users to `/login`.

### Environments & config
- `src/environments/environment.ts` (production) and `environment.development.ts` are swapped via `fileReplacements` in the `development` build configuration (`angular.json`). Note `app.config.ts` currently hardcodes `API_URL`/`APP_ENVIRONMENT` as DI tokens rather than reading from `environment.ts` — check both when changing API configuration.
- `AppConfigService` expects an injected `'env'` string token (`'prod'`/otherwise) — this doesn't match the `APP_ENVIRONMENT` token used elsewhere; be aware of the mismatch if extending config loading.

### Deployment
- Hosted on Cloudflare Pages: `main` → production, PRs → preview. Needs GitHub secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`; deploys `dist/angular-shopping-cart/browser` (`npx wrangler pages deploy …`).
- `public/_redirects` (SPA fallback) and `public/_headers` (`no-cache` for `index.html`, `ngsw.json`, `ngsw-worker.js`) are copied to the build root via the `public` asset entry in `angular.json`.

### Build tooling notes
- Uses the new `@angular/build:application` / `@angular/build:unit-test` esbuild-based builders (Angular 22), not the legacy webpack/Karma builders — despite `karma`/`jasmine-core` still listed in `devDependencies`, the active test runner is Vitest.
- PWA/service worker: `ngsw-config.json`, only registered in non-dev builds (`registerWhenStable:30000`).
- Angular Material theme: `@angular/material/prebuilt-themes/magenta-violet.css`; `notyf` is used for toast notifications outside Angular Material.

## Agentic workflow (GitHub Actions)

Issues are turned into reviewed pull requests by Claude agents, driven by labels:

| Label | Meaning |
| --- | --- |
| `agent:refine` | `agent-refine.yml` writes a spec into the issue body → `spec:review` |
| `spec:review` | Spec to be validated by a human |
| `agent:ready` | `agent-implement.yml` implements it on `agent/issue-<n>-<slug>` and opens a PR (also picks the oldest ready ticket every 3 h) |
| `agent:working` / `agent:review` / `agent:blocked` | Set by the agent while working, once the PR is open, or when it needs a human |

- Comment `@claude …` on a PR to have `agent-review.yml` apply review feedback on its branch.
- `agent-board.yml` mirrors these labels onto the GitHub Project board.
- Prompts live in `.github/agent/prompts/`; the Playwright MCP config (iPhone 13, local app + hosted API only) in `.github/agent/mcp.json`; helper scripts in `scripts/agent/`.
- The agent never edits `.github/` and never merges: human review is required.
