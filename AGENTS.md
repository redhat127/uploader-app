# Agent Instructions

## Project: Uploader App

A TanStack Start (React) application with Better Auth, Drizzle ORM, PostgreSQL, Tailwind CSS v4, and shadcn/ui.

## Workflow Rules

1. **Don't make changes unless I ask** — Do not modify or remove any files or code until I explicitly tell you to. This includes refactoring, renaming, deleting, or reorganizing.

2. **Use `bun` and `bunx`, never `npm` or `npx`** — Always use `bun` for installing packages (`bun add <pkg>`) and `bunx` for running binaries. Never use `npm`, `npx`, `yarn`, or `pnpm`.

3. **Don't run type-checkers, linters, or formatters** — Do not run `tsc`, `eslint`, or `prettier`. These are handled via lint-staged and husky (to be set up later).

4. **Don't commit without approval** — Never run `git commit`, `git push`, or any git write operation. Write the code, then show me the suggested commit message and wait for my confirmation.

## Technology Stack

- **Runtime:** Bun
- **Framework:** TanStack Start (React 19, TanStack Router, TanStack Query)
- **Styling:** Tailwind CSS v4, tw-animate-css, shadcn/ui
- **Database:** PostgreSQL + Drizzle ORM
- **Auth:** Better Auth
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Password Strength:** zxcvbn-ts
- **Theme:** next-themes

## Path Aliases

- `#/*` maps to `./src/*`
