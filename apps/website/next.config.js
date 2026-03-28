/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Static HTML export, see https://nextjs.org/docs/pages/guides/static-exports
  output: "export",

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  distDir: "dist",

  // Workspace root for Turbopack, which is used for development and production builds.
  // Change if 'next' package is not resolved properly in monorepo setups.
  turbopack: {
    root: require("path").resolve(__dirname, "../.."),
  },
};

module.exports = nextConfig;
