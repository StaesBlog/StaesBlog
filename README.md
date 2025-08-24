# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## GitHub Pages

This project is configured for static export so it can be hosted on GitHub Pages.

- Run `npm run export` to generate the site in the `out` directory.
- Pushing to `main` triggers the workflow in `.github/workflows/gh-pages.yml` which builds and deploys the site.
- Assets are served from a base path using the `NEXT_PUBLIC_BASE_PATH` environment variable.
