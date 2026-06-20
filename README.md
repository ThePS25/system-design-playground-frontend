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

## Production Deployment (Netlify)

1. Connect this repo to [Netlify](https://netlify.com).
2. Build settings are in `netlify.toml` (auto-detected).
3. Set environment variable in Netlify dashboard:
   ```
   VITE_API_URL=https://your-api.onrender.com/api/v1
   ```
4. Deploy. Ensure the Render backend has `CORS_ORIGIN` set to your Netlify URL.

Full step-by-step guide: [`../docs/DEPLOYMENT.md`](../docs/DEPLOYMENT.md)

## Tech Stack

React 19 · TypeScript · Vite · SCSS Modules · React Flow · Zustand · TanStack Query · React Router · Framer Motion · Recharts
