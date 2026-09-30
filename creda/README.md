# Creda

Your business. Your financial identity. A Ghana-focused fintech platform that helps small businesses
build a verified financial profile, understand cash flow, manage invoices and access financing.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run lint` | Type-check with TypeScript |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |

## Brand assets

- `src/components/common/Logo.tsx` holds the `LogoMark` and `Wordmark` components. Use these instead of drawing the logo by hand.
- `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` and `logo-512.png` are the app icons.
- Brand colors are defined as `creda-*` tokens in `src/index.css`.
