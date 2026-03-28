# Simple App Template

A monorepo template with multiple apps and shared packages, using npm
workspaces.

## Package Manager

This repo is designed to use **Deno** as the package manager. Deno is
npm-compatible, so Deno and npm can be mixed freely in this project — all
standard `npm` commands work alongside `deno`.

### Install dependencies

```bash
deno i
```

Or with npm:

```bash
npm install
```

> **Note:** The `workspace:*` version specifier used in some packages (e.g.
> `@packages/router`) is supported by Deno but **not by npm**. If you need to
> install with npm, replace `workspace:*` entries in `package.json` with
> explicit versions (e.g. `"@packages/router": "^0.0.0"`) and then run
> `npm install`.

## Project Structure

```
├── apps/
│   ├── api/          # Node.js HTTP API server
│   ├── app/          # Lit web component app (Vite)
│   └── website/      # Next.js website (static export)
├── packages/
│   └── router/       # Shared router package
└── scripts/
    ├── clear-modules.sh   # Remove all node_modules
    └── pkg-update.sh      # Manipulate a package.json inside workspace
```

### apps/api

A minimal Node.js HTTP server. Runs on port `8001` by default (configurable via
`PORT` env variable).

### apps/app

A [Lit](https://lit.dev/) web component application built with
[Vite](https://vite.dev/). Uses the shared `@packages/router` package. The Vite
dev server proxies `/api` requests to the API server at `localhost:8001`.

### apps/website

A [Next.js](https://nextjs.org/) application configured for static HTML export
(`output: "export"`). Uses Turbopack for development and production builds.

### packages/router

A shared router package (`@packages/router`) consumed by the app workspace via
`workspace:*` (Deno) or an explicit version like `^0.0.0` (npm).

## Scripts

Run individual apps from the repo root:

```bash
# Start the API server
npm run api

# Start the Lit/Vite app
npm run app

# Start the Next.js website
npm run website
```

### Utility scripts

```bash
# Remove all node_modules directories
npm run clear

# Update a package version in a specific workspace
npm run pkg -- <package[@version]> [--dev] [--path|-p <dir>]
```

`pkg` examples:

```bash
npm run pkg -- react
npm run pkg -- react@19
npm run pkg -- lodash --dev
npm run pkg -- @angular/core --path apps/website
```
