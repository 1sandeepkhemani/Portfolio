# AGENTS.md — Portfolio

## One-liner
Vanilla HTML/CSS/JS portfolio site for Sandeep Khemani (ASP.NET Developer). No build step, no bundler, no tests.

## Repo layout
```
Portfolio/            ← GitHub Pages root
├── index.html        ← single entrypoint
├── styles.css        ← fully custom CSS (1528 lines, dark-mode)
├── script.js         ← all JS (729 lines, no framework)
├── server.mjs        ← dev server (Node native http)
├── tailwind.config.js← DEAD CONFIG — not wired into any build pipeline
├── data/portfolio.json ← all dynamic content (edit this to change the site)
├── Sandeep_Khemani_Resume_New.pdf  ← downloadable resume
└── .nojekyll         ← required for GitHub Pages
```

## Commands
| Action | Command |
|--------|---------|
| Dev server | `npm run start` (runs `node server.mjs`) |
| Dev URL | http://localhost:5173 |

No lint, typecheck, test, or build commands exist.

## Vercel deployment
Add `vercel.json` at repo root:
```json
{ "rootDirectory": "Portfolio", "buildCommand": null, "framework": null }
```
This tells Vercel to serve files from `Portfolio/` directly (static, no build step). Without it, Vercel looks at repo root, finds no `index.html`, and returns 404.

## Key facts
- **Content-driven**: all text, skills, projects, experience come from `data/portfolio.json`. Edit that file to update the portfolio.
- **No dependencies**: `package.json` has zero dependencies or devDependencies. `tailwind.config.js` is vestigial — ignore it.
- **Server**: custom `server.mjs` using `node:http`. Serves static files with basic path traversal protection. Cache-Control: no-store.
- **GitHub Pages**: deployed from root of `main` branch. `.nojekyll` file present (required for Pages to serve `data/` directory).
- **Gitignore**: excludes `node_modules/`, editor files, OS files, and stale CV/image experiment files.
- **CSS**: fully custom, dark-mode by default (`data-theme="dark"` on `<html>`). Uses CSS custom properties (`--bg`, `--primary`, etc.).
- **No Tailwind in use**: `tailwind.config.js` is present but not consumed by any tool. The entire stylesheet is hand-written CSS.

## Architecture
`index.html` → load → `script.js` fetches `data/portfolio.json` via relative URL → renders all sections (hero, about, skills, experience, services, projects, education, contact) into static HTML. No routing, no SPA framework.
