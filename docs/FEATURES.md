# Features

Each feature lives under `src/app/features/<feature-name>/`. Features are lazy-loaded via the router (see [ROUTING.md](ROUTING.md)). This document lists each feature, its route(s), main container, and key child components.

## Home

- **Route:** `home` (path `''` redirects here)
- **Container:** `Home` (`features/home/home.ts`)
- **Responsibility:** Landing page: hero, featured properties, process steps, projects listing, promotional banner.
- **Key components:** HeroSection, FeaturedProperties, ProcessSteps, ProjectsListing, PromotionalBanner.

## Search

- **Route:** `search` (lazy child routes: `SEARCH_ROUTES`)
- **Container:** `Search` (`features/search/search.ts`)
- **Responsibility:** Search experience; uses shared search state/API.
- **Key components:** (Defined inside the search feature.)

## All Units

- **Route:** `all-units` (lazy child: `ALL_UNITS_ROUTES` → single route to `AllUnitsPage`)
- **Container:** `AllUnitsPage` (`features/all-units/all-units-page.ts`)
- **Responsibility:** Browse and filter all units with search header and filters sidebar.
- **Key components:** SearchHeader, FiltersSidebar, units grid (e.g. unit card).

## Model Details (Unit Details)

- **Route:** `model/:id` (resolver: `ModelResolver`)
- **Container:** `ModelDetails` (`features/model-details/model-details.ts`)
- **Responsibility:** Single unit page: gallery, info header, overview, features, payment plan, contact salesman, similar units, map.
- **Key components:** UnitGallery, UnitInfoHeader, UnitOverview, UnitFeatures (project-features), PaymentPlan, ContactSalesman, SimilarUnits, UnitMap.

## Projects

- **Route:** `projects` (lazy child: `PROJECTS_ROUTES` → `Projects`)
- **Container:** `Projects` (`features/projects/projects.ts`)
- **Responsibility:** List all projects with hero and project cards.
- **Key components:** ProjectsHero, ProjectCard.

## Project Details

- **Route:** `project-details/:id` (lazy child: `PROJECT_DETAILS` → `ProjectDetails`)
- **Container:** `ProjectDetails` (`features/project-details/project-details.ts`)
- **Responsibility:** Single project page: hero, overview, features, gallery, map, model types carousel, about sidebar, contact form.
- **Key components:** ProjectHero, ProjectOverview, ProjectFeatures, ProjectGallery, ProjectMap, ModelTypesCarousel, AboutProjectSidebar, ProjectContactForm.

## Add Property (Sell Property)

- **Route:** `sell-property`
- **Container:** `AddProperty` (`features/add-property/add-property.ts`)
- **Responsibility:** Multi-step form to add/sell a property: details, media, payment, contact; includes preview card.
- **Key components:** PropertyDetailsForm, PropertyMediaForm, PropertyPaymentForm, PropertyContactForm, PropertyPreviewCard.

## About Us

- **Route:** `about-us`
- **Container:** `AboutUs` (`features/about-us/about-us.ts`)
- **Responsibility:** About TMG, mission/vision, trust partner, watch-learn-grow, family CTA.
- **Key components:** AboutHero, AboutTmg, MissionVision, TrustPartner, WatchLearnGrow, FamilyCta.

## Blog

- **Route:** `blog` (lazy child: `BLOG_ROUTES` → `Blog`)
- **Container:** `Blog` (`features/blog/blog.ts`)
- **Responsibility:** Blog listing with hero, featured blogs, and all articles.
- **Key components:** BlogHero, BlogCard, FeaturedBlogs, AllArticles.

## Contact Us

- **Route:** `contact-us`
- **Container:** `ContactUs` (`features/contact-us/contact-us.ts`)
- **Responsibility:** Contact page: hero, get-in-touch, register interest, map.
- **Key components:** ContactHero, GetInTouch, RegisterInterest, ContactMap.

## Payment

- **Route:** `payment`
- **Container:** `Payment` (`features/payment/payment.ts`)
- **Responsibility:** Payment flow: methods, summary, preview.
- **Key components:** PaymentMethods, PaymentSummary, PaymentPreview.

## Profile

- **Route:** `profile`
- **Container:** `Profile` (`features/profile/profile.ts`)
- **Responsibility:** User profile: my info, reserved units (offers), appointments. May be protected by auth guard depending on configuration.
- **Key components:** (Profile-specific components under `features/profile/components/`.)

---

Feature routes are defined in `src/app/layout/main-layout.route.ts`. Sub-routes for search, all-units, projects, project-details, and blog are in each feature’s `*.route.ts` (e.g. `search.route.ts`, `all-units.route.ts`).
