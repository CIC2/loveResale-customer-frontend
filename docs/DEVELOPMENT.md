# Development Guide

This document covers environment setup, proxy, scripts, SSR, and testing. For first-time setup and prerequisites, see the root [README.md](../README.md).

## Prerequisites

- Node.js (compatible versions: ^20.19.0, ^22.12.0, or ^24.0.0). Check with `node -v`.
- Angular CLI: `npm install -g @angular/cli`
- Dependencies: `npm install`

## NPM Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **start** | `ng serve` | Development server (default port 4200). Uses proxy when configured. |
| **build** | `ng build` | Production build (browser + server for SSR). |
| **watch** | `ng build --watch --configuration development` | Development build with watch. |
| **test** | `ng test` | Run unit tests (Karma/ Jest as configured). |
| **serve:ssr** | `node dist/vso-revamp/server/server.mjs` | Run the built app in SSR mode locally. |

Run with `npm run <script>` (e.g. `npm start`, `npm run build`).

## Environment Files

- **Development:** `src/environments/environment.ts`
- **Production:** `src/environments/environment.prod.ts` – used when building with the `production` configuration.

Production build uses **fileReplacements** in `angular.json`: `environment.ts` is replaced by `environment.prod.ts`. Use these files for environment-specific API base URLs or feature flags.

## Proxy

Development server can proxy API requests to avoid CORS and point to a backend.

- **Config file:** `proxy.config.json` at the project root.
- **Example:** Proxies `/api` to a backend URL (e.g. `https://...eu-de.containers.appdomain.cloud/`) with `changeOrigin: true` and optional `pathRewrite`.

To use the proxy, start the dev server with proxy config, for example:

```bash
ng serve --proxy-config proxy.config.json
```

If your `package.json` `start` script does not include `--proxy-config`, add it or run the above command when you need to hit the backend.

## Server-Side Rendering (SSR)

- The app is built with **Angular SSR** (output mode: server).
- **Entry:** `src/main.ts` (browser), `src/main.server.ts` (server), `src/server.ts` (Express server).
- **Build output:** `dist/vso-revamp/` with `browser/` and `server/` (including `server.mjs`).
- **Run SSR locally:** After `ng build`, run `npm run serve:ssr` to execute the Node server.

SSR uses the same routes and components; the server renders the initial HTML. Cookie forwarding for auth is handled by `cookiesSSRInterceptor` (see [CORE.md](CORE.md)).

## Testing

- **Unit tests:** `ng test` (config in `angular.json` under `test` and in `tsconfig.spec.json`).
- Keep tests next to source or in a dedicated test folder as per project convention.

## Project Name

The Angular project name in `angular.json` is **`vso-revamp`**. Build output and SSR script paths use this name (e.g. `dist/vso-revamp/`).
