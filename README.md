# Smart Food Rescue

Next.js App Router shell for the Smart Food Rescue prototype.

## Run locally

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

Import this repository into Vercel. The default Next.js settings are sufficient. Vercel will run `npm run build` automatically.

The current prototype UI remains in `h.html` and `js/`. Next serves it through the `/legacy` route while the app is migrated incrementally into native React components.
