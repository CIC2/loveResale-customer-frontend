# Shared Layer

The shared layer (`src/app/shared/`) provides reusable UI components, pipes, directives, and shared API (user state, search). It is used by the layout and by features.

## Shared Components

Exported from `src/app/shared/components/index.ts`:

| Component | Path | Purpose |
|-----------|------|---------|
| **EmptyStateComponent** | `shared/components/empty-state/` | Shown when a list or section has no data (e.g. no units, no results). |
| **ValidationError** | `shared/components/error/validation-error.ts` | Displays validation errors; uses a validation pipe for messages. |
| **MobileAppPromo** | `shared/components/mobile-app-promo/` | Promotional block for the mobile app. |
| **MobileNumberInput** | `shared/components/mobile-number-input/` | Phone input with country code (uses `mobile-number-data.ts` for dial codes). |
| **ModelInfoCard** | `shared/components/model-info-card/` | Card displaying unit/model summary (e.g. beds, baths, price). |
| **NotFoundComponent** | `shared/components/not-found/app-not-found.ts` | 404 page used for route `404` and wildcard redirect. |

Additional components in the folder but not in the barrel (used locally or imported directly where needed):

- **TermsDialog** – `shared/components/terms-dialog/` – Terms and conditions dialog; content in `terms_EN.ts` and `terms_AR.ts`.
- **SharedInputRange** – `shared/components/shared-input-range/` – Range/slider input for filters (e.g. price range).

Components are standalone and use BEM-style class names. They consume design tokens from global SCSS (no hardcoded colors or font sizes in component SCSS).

## Pipes

| Pipe | Path | Purpose |
|------|------|---------|
| **CountdownPipe** | `shared/pipe/countdown.ts` | Countdown display (e.g. for offers or timers). |
| **Validation pipe** | `shared/components/error/pipe/validation.pipe.ts` | Maps validation errors to user-facing messages (e.g. for ValidationError component). |

## Directives

Exported from `src/app/shared/directives/index.ts`:

| Directive | File | Purpose |
|-----------|------|---------|
| **ImageFallback** | `shared/directives/image-fallback.directive.ts` | Fallback image when the primary image fails to load (similar in spirit to core’s `DefaultImg`). |

## Shared API

Shared API lives under `shared/api/`. Used across features and layout.

### User State

- **UserStateService** – `shared/api/user-state/service/user-state.ts`
  - Holds the current user (signal: `currentUser`).
  - Fetches profile and profile image via `ProfileApi`; used for auth state and header profile display.
  - Injected in layout (e.g. header) and in guards (e.g. `authGuard`).

### Search

- **SearchStore** – `shared/api/search/store/search-store.ts`
  - NgRx Signals store for search results and pagination (models, currentPage, totalElements, totalPages, loading, error, currentFilters).
  - Uses `SearchService`; `searchModels` rxMethod triggers search when filters change (e.g. locationId required).
- **SearchModelStore** – `shared/api/search/store/search-model-store.ts` – Related search/model state if used.
- **SearchService** – `shared/api/search/services/search.ts` – Calls backend for search/filter.
- **ComparisonService** – `shared/api/search/services/comparison.ts` – Manages unit comparison list and drawer state (used by MainLayout and comparison feature).

Models and types for search are in `shared/api/search/models/`. For backend contract see [BACKEND_API_SPECIFICATION.md](BACKEND_API_SPECIFICATION.md).
