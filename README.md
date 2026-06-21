# DesignScape — Frontend

React 19 + Vite + TypeScript SPA.

## Quick Start

```bash
cp .env.example .env
npm install
npm run dev    # http://localhost:5173
```

Ensure the backend is running at `http://localhost:4000` (or update `VITE_API_URL`).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Modules

- **Start Here** — guided path for beginners (no prior experience needed)
- **Architecture Explorer** — reference architectures with interactive canvas
- **Traffic Simulator** — RPS simulation with bottleneck detection
- **Failure Simulator** — cascade failure visualization
- **Scaling Evolution** — architecture growth timeline
- **Design Challenge** — rule-based interview scoring
- **Interview Prep** — component knowledge base
- **Glossary** — HLD & LLD system design terms
- **Cost Estimator** — infrastructure cost calculator

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL (default `http://localhost:4000/api/v1`) |

## Production Deployment

### Vercel (recommended if using vercel.app)

1. Connect this repo to [Vercel](https://vercel.com).
2. `vercel.json` enables SPA routing — refresh and direct URLs like `/learn` work.
3. Set environment variable:
   ```
   VITE_API_URL=https://your-api.onrender.com/api/v1
   ```
4. Redeploy after changing env vars. Set Render `CORS_ORIGIN` to your Vercel URL (no trailing slash).

### Netlify

1. Connect this repo to [Netlify](https://netlify.com).
2. Build settings are in `netlify.toml` (includes SPA fallback via `public/_redirects`).
3. Set `VITE_API_URL` in the Netlify dashboard and redeploy.

Full guide: [`../docs/DEPLOYMENT.md`](../docs/DEPLOYMENT.md)

## Tech Stack

React 19 · TypeScript · Vite · SCSS Modules · React Flow · Zustand · TanStack Query · React Router · Framer Motion · Recharts
