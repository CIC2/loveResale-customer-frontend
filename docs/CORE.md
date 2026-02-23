# Core Layer

The core layer (`src/app/core/`) contains app-wide singletons: API clients, guards, interceptors, injections, constants, validators, utilities, and directives. It has no feature-specific UI.

For backend endpoint contracts and request/response shapes, see [BACKEND_API_SPECIFICATION.md](BACKEND_API_SPECIFICATION.md).

## API Domains

Each domain typically has `models/`, `services/`, and optionally `resolver/` and an `index.ts` that re-exports them.

| Domain | Path | Purpose | Main service(s) / resolvers |
|--------|------|---------|-----------------------------|
| **auth** | `core/api/auth` | Sign-in, OTP, register, forget/reset password | Auth API service, active-form handling |
| **profile** | `core/api/profile` | User profile, reserved units, appointments, purchases, nominations | Profile API service; reserved-units resolver |
| **search** | `core/api/search` | Units list, model details, comparison | UnitApi (`search/services/unit`); ComparisonResolver |
| **model-details** | `core/api/model-details` | Resolver for unit (model) by ID | ModelResolver – loads model data for `model/:id` route |
| **project-details** | `core/api/project-details` | Project detail data, features, facilities | Models (feature-item, facilities-swipe, etc.) |
| **layout** | `core/api/layout` | Projects for shell (e.g. header/footer) | Projects API service |
| **offers** | `core/api/offers` | Offers related to user/units | Offers API service |
| **appointment** | `core/api/appointment` | Appointments and meetings | Appointment API service |
| **about-us** | `core/api/about-us` | About-us content (exports may be commented) | — |

## Interceptors

Registered in `core/interceptors/index.ts` and passed to `provideHttpClient(withInterceptors(interceptors))` in `app.config.ts`. Order matters.

| Interceptor | File | Role |
|-------------|------|------|
| **httpErrorInterceptor** | `core/interceptors/http-error.interceptor.ts` | Global HTTP error handling: 404 → navigate to not-found; 401 → show session expired message; other errors handled and optionally redirect or show messages. Uses Router, MessageService, DialogService, UserStateService. |
| **cookiesSSRInterceptor** | `core/interceptors/cookies-ssr.interceptor.ts` | On the server, forwards the incoming request’s `Cookie` header to outgoing HTTP requests so auth cookies are sent to the API. |
| **responseMessageInterceptor** | `core/interceptors/response-message.interceptor.ts` | Shows success/error toasts (e.g. via MessageService) for API responses; skips certain URLs (e.g. i18n, static assets). Browser-only for toasts. |

## Guards

| Guard | File | Role |
|-------|------|------|
| **authGuard** | `core/guards/auth.guard.ts` | Ensures the user is authenticated (uses `UserStateService.currentUser`). Redirects to `/home` if not; returns a boolean for route activation. |
| **comparisonGuard** | `core/guards/comparison.guard.ts` | Syncs comparison drawer state (opens compare view, closes drawer when needed). Used on comparison-related routes. |

## Injections (initializers / app-wide providers)

Exported from `core/injections/index.ts` and used in `app.config.ts` or feature code.

| Injection | File | Role |
|-----------|------|------|
| **AppInitializeService** | `core/injections/app-initialize.ts` | Runs on app init (e.g. load user, set language). |
| **TranslocoHttpLoader** | `core/injections/transloco-loader.ts` | Loads translation JSON via HTTP (`/i18n/{lang}.json`). |
| **IconLoaderService** | `core/injections/icon-loader.ts` | Loads SVG icons; registered via `provideEnvironmentInitializer`. |
| **provideAppLang** | `core/injections/app-lang.ts` | Provides language/locale and RTL support. |
| **SwiperRegister** | `core/injections/swiper-register.ts` | Registers Swiper (e.g. for carousels). |
| **SocketService** | `core/injections/socket-service.ts` | Socket.io client for real-time features. |
| **CookieService** | `core/injections/cookie-service.ts` | Cookie read/write (SSR-safe where used). |

## Constants

| Constant | Path | Purpose |
|----------|------|---------|
| **App** | `core/constants/app` | App-wide constants: `AvailableLangs`, socket config, language defaults (see `app.constants.ts`, `language.constants.ts`, `socket.constants.ts`). |
| **Nationality** | `core/constants/nationality.constant.ts` | Nationality options for forms. |

## Validators

| Validator | File | Purpose |
|-----------|------|---------|
| **confirmPassword** | `core/validators/confirm-password.validators.ts` | Cross-field validation for password confirmation. |

## Utility

| Utility | File | Purpose |
|---------|------|---------|
| **removeEmptyKeys** | `core/utility/remove-empty-keys/remove-empty-keys.ts` | Removes empty or null/undefined keys from objects (e.g. before sending API payloads). |

## Services (non-API)

| Service | File | Purpose |
|---------|------|---------|
| **LoadingService** | `core/services/loading/loading.service.ts` | Global loading state (e.g. show/hide full-screen loader). |
| **ZoomService** | `core/services/loading/zoom.service.ts` | Zoom SDK integration for meetings. |

## Directives

| Directive | File | Purpose |
|-----------|------|---------|
| **DefaultImg** | `core/directives/default-img.ts` | Fallback image on error: `[defaultImg]="url"` sets a default when the image fails to load. |

## Models (general)

`core/models/` holds shared API types (e.g. `general-api.ts`) used across domains. Feature- or domain-specific types live in the corresponding `core/api/<domain>/models/` folders.
