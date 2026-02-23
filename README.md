# VSO real estate e-commerce

A modern real estate e-commerce platform where users can explore projects, compare units, read blogs, and manage transactions

## 🔗 Links

- **Development URL:** [Dev Link](https://vso-dev-customer.nuca-mycluster-eu-de-1-cx-5fc3035946e1f798c7284cb63267e8d1-0000.eu-de.containers.appdomain.cloud)
- **Design File (Figma):** [Design Link](https://www.figma.com/design/sJotkAgvcJmfJprBfHyBny/TMG-%7C-VSO)

## ✨ Features

**🧭 Public Features**

- Advanced Project Search – Browse and filter real estate projects by location, type, price, and more.

- Unit Details View – Explore rich information for each unit, including floor plans, images, and amenities.

- Unit Comparison Tool – Compare multiple units side-by-side by price, size, and key features.

- Blog & News Section – Stay informed with real estate articles, investment tips, and company updates.

**🔐 Authenticated Features**

- User Profile Dashboard – Manage personal information, saved units, and activity history.

- Transactions Page – View and track payments for purchased or reserved units securely.

- Appointments & Meetings – Schedule property visits or meetings with sales representatives.

- Online Payment Integration – Pay directly for units via secure payment gateways.

**⚙️ Technical Highlights**

- Built with Angular – Modular, scalable, and optimized for performance.

- Server-Side Rendering (SSR) – Improved SEO and faster initial load.

- Secure Authentication via Cookies – Token-based login flow with HTTP-only cookies.

- Reusable Components & Custom Pipes – Maintainable, DRY, and extendable codebase.

- Fully Responsive Design – Optimized for mobile, tablet, and desktop screens.

- SEO-Optimized Pages – Designed for high discoverability and performance on search engines.

## 🚀 Development Setup

### Prerequisites

- Install Node.js and npm (compatible version: ^20.19.0 || ^22.12.0 || ^24.0.0) .
- Verify your Node.js version using `node -v`.

### Setting Up the Project

- Install the Angular CLI globally: `npm install -g @angular/cli`
- Navigate to the project directory
- Install dependencies: `npm install`

### Run the Application

- Start the development server: `ng s`
- Open your browser and visit `http://localhost:4200/`

## 🏛️ Project Structure

This folder hosts the application shell and the main building blocks. Below is a quick guide to each subfolder and when to use it.

- `core/`

  - App-wide, non-UI utilities and singletons.
  - Examples: auth services, HTTP interceptors, route guards, tokens, models.
  - Guideline: keep stateless; no feature-specific UI here.

- `features/`

  - Business/domain features and pages.
  - Examples: standalone components, feature services/state, lazy-loaded route setups.
  - Guideline: one folder per feature; encapsulate domain logic inside.

- `layout/`

  - Application shell and shared structural UI.
  - Examples: header, footer, nav bars, sidebars, layout containers, skeletons.
  - Guideline: no domain logic; focus on composition and responsiveness.

- `shared/`
  - Reusable, generic presentation components and helpers.
  - Examples: UI atoms/molecules (buttons, cards), directives, pipes, small utilities.
  - Project note: API clients are placed here (e.g., `shared/api/`) for reuse across features.
  - Guideline: keep API clients presentation-agnostic; domain-heavy APIs can move to a feature or `core/` if needed.

## Documentation

Detailed documentation lives in the **[docs/](docs/)** folder:

- **[docs/README.md](docs/README.md)** – Index of all documentation.
- **Architecture & routing** – [ARCHITECTURE.md](docs/ARCHITECTURE.md), [ROUTING.md](docs/ROUTING.md).
- **Codebase map** – [CORE.md](docs/CORE.md), [FEATURES.md](docs/FEATURES.md), [LAYOUT_AND_SHELL.md](docs/LAYOUT_AND_SHELL.md), [SHARED.md](docs/SHARED.md).
- **Styling & i18n** – [STYLING_AND_THEMING.md](docs/STYLING_AND_THEMING.md), [I18N.md](docs/I18N.md).
- **Development** – [DEVELOPMENT.md](docs/DEVELOPMENT.md).
- **Backend API contract** – [BACKEND_API_SPECIFICATION.md](docs/BACKEND_API_SPECIFICATION.md).
