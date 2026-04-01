# Developer portfolio

A single-page portfolio tailored for a **Full Stack / .NET / Angular / Azure** profile. Static HTML, CSS, and JavaScript — no build step — so it deploys cleanly to **GitHub Pages**.

## Customize before you publish

1. **All outbound links (resume, AZ-204, GitHub, awards, internship, etc.):** edit **`config/links.js`** — one object `PORTFOLIO_LINKS`. Keys match `data-link="…"` on anchors in `index.html`. Résumé uses **`resumePdf`** (direct download) and **`resumeViewBrowser`** (open/preview in the browser, e.g. Google Drive “view” link). See **`config/links.example.js`** for a template.
2. Open `index.html` for copy and structure; keep `data-link` keys in sync when you add new links.
3. **Theme:** Use the sun/moon control in the header for **light** or **dark** mode. Your choice is saved in `localStorage` (`portfolio-theme`). First visit follows the system preference.
4. Optional: change accent colors in `styles.css` under the `:root` and `html[data-theme="light"]` variable blocks (`--accent`, `--accent-2`, etc.).

## Deploy on GitHub Pages

1. Create a new repository on GitHub and push this folder (or make this folder the repo root).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **main** (or **master**) and folder **/ (root)**, then save.
5. After a minute, the site is available at `https://<username>.github.io/<repo>/`  
   - If the repo is named `<username>.github.io`, the site URL is `https://<username>.github.io/`.

No `jekyll` configuration is required; everything is plain static files.

## Local preview

Open `index.html` in a browser, or from this directory run a small static server, for example:

```bash
npx --yes serve .
```

Then visit the URL shown in the terminal (often `http://localhost:3000`).

## Files

| File        | Role                                      |
| ----------- | ----------------------------------------- |
| `index.html`| Structure and content                     |
| `styles.css`| Layout, theme, responsive behavior        |
| `main.js`   | Mobile nav, scroll reveals, theme, links    |
| `config/links.js` | **Central URLs** (resume, certs, social) |
| `config/links.example.js` | Example keys for a fresh clone   |
| `assets/profile.png` | Hero portrait (replace to update photo) |

License: use and modify freely for your personal portfolio.
