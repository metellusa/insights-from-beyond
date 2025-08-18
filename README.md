# Insights from Beyond — Launch Site

A single-page **React + Tailwind CSS** site built with **Vite** for the official launch of the book **Insights from Beyond** by Anaja Metellus.

The site is **automatically deployed on Netlify** whenever changes are pushed to the GitHub repository’s `main` branch.

---

## ✨ Features

* 📖 **Book overview**: themes, key ideas, and inside-the-book highlights
* ⏳ **Countdown timer**: dynamically ticking down to launch day
* 🛒 **Pre-order page**: retailer links + email signup form (via Jotform)
* 👤 **About page**: author bio + rotating image gallery
* 📝 **Contact page**: direct contact info + form
* ✅ **Thank-you page**: friendly confirmation after form submission
* 📱 **Responsive**: styled with Tailwind and optimized for mobile/desktop

---

## 🚀 Local Development

Clone the repo, install dependencies, and start the dev server:

```bash
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).

---

## 🛠️ Build

To test a production build locally:

```bash
npm run build
npm run preview
```

The optimized build output goes to the `/dist` folder.

---

## 🌐 Deployment (Netlify)

* This site is deployed on **Netlify** via GitHub integration.
* **Workflow:**

  1. Push changes to the `main` branch on GitHub.
  2. Netlify automatically builds (`npm run build`) and publishes the `/dist` folder.
* **Build settings (preconfigured in Netlify):**

  * **Build command:** `npm run build`
  * **Publish directory:** `dist`
* **Branch deploys:** Feature branches can be pushed to preview deploys (Netlify auto-generates unique URLs).

---

## 📂 Project Structure

* **`/src/App.jsx`** → App entry point (navigation + routing)
* **Pages:** Home, Preorder, About, Contact, Thank You
* **Components:** Countdown, NotifyForm, RotatingGallery, SiteNav, SiteFooter
* **Styling:** Tailwind CSS with palette inspired by the book cover

---

## 🖼️ Images

All images live in `/public/images`.
Replace placeholders with high-res launch assets (book cover, author portraits, etc.).

---

## 🔗 External Integrations

* **Retailer links**: Amazon, Barnes & Noble, etc. (edit in `PreorderPage`).
* **Jotform forms**: Power email signups and contact messages (IDs are hardcoded, swap if needed).
* **Social links**: Configurable in `ThankYouPage` and `SiteFooter`.

---

## 👩‍💻 Developer Notes

* **Countdown date**: Update in `Hero` (`Countdown targetDate={new Date('2025-09-26T00:00:00-04:00')}`)
* **Color theme**: Palette defined in `App.jsx` comments (edit Tailwind classes)
* **Forms**: Replace Jotform IDs if you switch accounts
* **Retailers**: Add/update pre-order buttons in `PreorderPage`
