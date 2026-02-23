# Layout and Shell

The application uses a single shell: **MainLayout**. All customer routes render inside this layout. The layout composes the header, main content (router outlet), and footer.

## MainLayout

- **File:** `src/app/layout/main-layout.ts`
- **Selector:** `app-main-layout`
- **Template structure:**
  - **Header** – `<app-header>` at the top
  - **Main** – `<main class="grow">` containing `<router-outlet />` and an optional comparison floating button (when comparison is active and drawer is not open)
  - **Footer** – `<app-footer>` at the bottom

MainLayout injects `ComparisonService` and `UserStateService`; the comparison button and badge are shown based on comparison state. Styling is in `main-layout.scss`.

## Child Routes (CUSTOMER_LAYOUT)

Child routes are not defined in the layout component itself. They are defined in **`src/app/layout/main-layout.route.ts`** and exported as **`CUSTOMER_LAYOUT`**. The root `app.routes.ts` assigns these as the `children` of the MainLayout route. See [ROUTING.md](ROUTING.md) for the full route table.

## Layout Components

Exported from `src/app/layout/components/index.ts`:

| Component | Path | Purpose |
|-----------|------|---------|
| **Header** | `layout/components/header/header.ts` | Top navigation: logo, nav links, language switch, auth/profile, comparison. |
| **Footer** | `layout/components/footer/footer.ts` | Site footer; may include links and contact form. |
| **ContactForm** | `layout/components/footer/contact-form/contact-form.ts` | Contact form used in the footer (or elsewhere). |

Layout components are presentational/shell-only: they do not contain domain-specific business logic. Domain logic (e.g. auth, search) is delegated to services or feature components.

## Responsiveness and Styling

Layout spacing and responsiveness are handled via SCSS (Flexbox/Grid, gap, padding, margin). Global design tokens and layout helpers live in `src/styles/`. Component-specific styles are in each component’s `*.scss` file. No `position: absolute`/`relative`/`fixed` for layout; see project layout rules.
