# Solidcore

<p align="center">
  <a href="https://github.com/azirali/Solidcore/actions/workflows/pages.yml"><img src="https://github.com/azirali/Solidcore/actions/workflows/pages.yml/badge.svg?branch=main" alt="Deploy"></a>
  <a href="https://github.com/azirali/Solidcore/actions/workflows/ci.yml"><img src="https://github.com/azirali/Solidcore/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React 18">
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind 4">
</p>

Enterprise workflow & employee-enablement web app: onboarding documents, training
materials, knowledge tests and team mood analytics — with separate **employee** and
**admin** workspaces.

**Live demo:** https://azirali.github.io/Solidcore/ — pick a role on the login
screen (any phone number / code works, the data is mocked).

## Features

| Area | Employee workspace | Admin workspace |
|---|---|---|
| Home | Daily digest, notifications, mood check-in | Dashboard with KPIs and activity |
| Documents | Document library + in-app viewer | Content management (documents, courses, tests) |
| Training | Course catalogue with progress | — |
| Tests | Timed tests, instant results | Results per employee / per test |
| People | Profile | Employee management |
| Analytics | Personal mood history | Team mood analytics |

## Tech stack

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · React Router 7 · shadcn/ui (Radix)
· Material UI icons · Recharts · react-hook-form · motion

## Quick start

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # → dist/
```

Deployed automatically to GitHub Pages from `main` (`.github/workflows/pages.yml`).

## Project structure

```
index.html            Vite entry
src/main.tsx          mounts <App /> into #root
src/app/routes.ts     hash-based route tree (employee/* and admin/*)
src/app/layouts/      EmployeeLayout, AdminLayout (navigation shells)
src/app/screens/      employee/ and admin/ screens
src/app/components/   ui/ (shadcn) + figma/ helpers
src/app/data/         mock data used by every screen
src/assets/figma/     logo artwork referenced as figma:asset/* in the design export
src/styles/           Tailwind + design tokens (theme.css)
```

The UI was designed in Figma and exported with Figma Make; `vite.config.ts`
resolves the `figma:asset/*` imports that the export leaves behind.
