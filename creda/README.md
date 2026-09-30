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

## Deploy (Vercel + Supabase)

1. Create a project at supabase.com and run `supabase/schema.sql` in the SQL Editor.
2. In Supabase: Authentication > Providers > Email is on by default. For phone login, enable Phone and connect an SMS provider (e.g. Twilio).
3. In Supabase: Authentication > Email Templates, edit "Magic Link" so it shows `{{ .Token }}` (the 6-digit code) instead of only a link.
4. Push to GitHub, import the repo in Vercel (Vite preset is detected).
5. In Vercel > Settings > Environment Variables add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see `.env.example`), then redeploy.

6. For the AI assistant, add `GEMINI_API_KEY` (from Google AI Studio) in Vercel. Optionally set `GEMINI_MODEL`. The `/api/chat` function only answers signed-in users.
