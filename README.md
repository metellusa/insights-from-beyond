# Insights from Beyond — Launch Site

A single-page React + Tailwind site for the book launch (Vite).

## Quick start

```bash
npm i
npm run dev
```

Visit http://localhost:5173

## Build & deploy
```bash
npm run build
npm run preview  # or deploy the dist/ folder to Netlify/Vercel
```

## Configure Mailchimp
- Open `src/App.jsx`, search for `MAILCHIMP_URL` and paste your exact form action URL.
- Update the hidden input name (honeypot) if Mailchimp requires a different one.

## Update retailer links
- In `PreorderPage` within `src/App.jsx`, replace the `#` with your Amazon/B&N URLs once live.

## Images
- Public images live in `/public/images`.
