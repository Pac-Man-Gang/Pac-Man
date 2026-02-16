This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contribution & Review Process

- All changes must be submitted through a Pull Request (PR).
- Direct commits to `main` are not allowed.
- Every PR must be reviewed and approved **before it can be merged**.
- The repository uses GitHub branch protection rules to enforce this:
  - `main` is a protected branch.
  - Merges into `main` require at least one approval.

Step 1: Make sure main is up to date

```bash
git checkout main
git pull origin main
```

Step 2: Create a new branch from main

```bash
git checkout -b BRANCH_NAME
```

Step 3: Make changes

Step 4: Commit changes

```bash
npm run lint:fix
npm run format
git add *
git commit -m "COMMIT MESSAGE"
```

Step 5: Push changes

```bash
git push origin BRANCH_NAME
```

Step 6: Open a Pull Request
Come to this GitHub Repository and create a Pull Request for this branch

## Naming Conventions

- **Files**: Use `kebab-case` (e.g., `page.tsx`, `player-stats.ts`).
- **Components**: Use `PascalCase` (e.g., `GameBoard.tsx`, `PlayerStats.tsx`).
- **Constants**: Use `UPPER_SNAKE_CASE` (e.g., `MAX_SCORE`, `PLAYER_SPEED`).
- **Variables and Functions**: Use `camelCase` (e.g., `updateScore`, `playerPosition`).