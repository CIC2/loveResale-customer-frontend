# Styling and Theming

Global styling and theming are split between **global SCSS** in `src/styles/` and **PrimeNG theme** in `src/app/theme.ts`. Component SCSS only uses variables and layout rules; it does not define new global tokens.

## Global Styles Structure

Entry point for global styles is **`src/styles.scss`**, which imports from `src/styles/`. The Angular build uses `stylePreprocessorOptions.includePaths: ["src/styles"]` so SCSS can `@use` or `@import` from that folder.

Directory layout:

```
src/styles/
├── _index.scss          # Forwards base, components, abstracts, vendor
├── abstracts/           # Variables and mixins
│   ├── _variables.scss  # CSS variables (colors, surfaces, typography, spacing)
│   ├── _mixin.scss
│   └── _index.scss
├── base/                # Base styles
│   ├── _font.scss       # Montserrat @font-face
│   └── _index.scss
├── components/          # Global overrides for UI (PrimeNG and custom)
│   ├── _button.scss
│   ├── _input.scss
│   ├── _dialog.scss
│   ├── _select.scss
│   ├── _table.scss
│   ├── _tabs.scss
│   ├── _icons.scss
│   ├── _datepicker.scss
│   ├── _toast.scss
│   ├── _breadcrumb.scss
│   ├── _popover.scss
│   ├── _multiselect.scss
│   ├── _slider.scss
│   ├── _scrollbar.scss
│   └── _index.scss
└── vendor/              # Third-party
    ├── _swiper.scss
    └── _index.scss
```

Additional global assets:

- **flag-icons** – `node_modules/flag-icons/css/flag-icons.min.css` is added in `angular.json` for country flags (e.g. phone input).
- **Swiper** – `src/styles/vendor/_swiper.scss` is bundled as a separate style chunk (`bundleName: "swiper"`) and injected where needed.

## Design Tokens (Variables)

`styles/abstracts/_variables.scss` defines CSS custom properties under `:root`:

- **Colors:** primary (50–900), secondary, neutral, gray scale, surface (0–950), semantic (error, success, warning, info), card and text colors.
- **Spacing / layout:** spacing and layout-related variables.
- **Typography:** font family (e.g. Montserrat), sizes, weights – all via variables.

Rules:

- Component SCSS must **not** hardcode colors or font sizes; use `var(--token-name)`.
- Prefer **rem** for font-size, spacing, width, height (base 16px).
- New tokens that are reused should be added to `_variables.scss`, not in component files.

## PrimeNG Theme

- **File:** `src/app/theme.ts`
- **Usage:** Passed to `providePrimeNG(AppTheme)` in `app.config.ts`.

The theme uses `@primeuix/themes` (Aura preset) and overrides semantic colors (primary, surface, secondary, formField, etc.) to align with the design system. PrimeNG v21 components inherit from this theme. Global PrimeNG overrides (e.g. buttons, inputs) live in `src/styles/components/` so that `theme.ts` stays the single source for theme tokens and component SCSS only refines layout/appearance.

## BEM and Component Styles

- HTML uses **BEM**-style class names: `block__element--modifier`.
- No inline styles in templates; all styling in component SCSS.
- Component SCSS should only reference global variables and layout (flex, grid, gap, padding, margin). Avoid `position: relative/absolute/fixed` for layout unless explicitly required.

## RTL

Arabic is RTL. Layout and components should work in both LTR and RTL. Prefer logical CSS properties (e.g. `margin-inline-start`) or RTL-aware mixins/variables where needed. Language and direction are driven by Transloco and `provideAppLang`; see [I18N.md](I18N.md).
