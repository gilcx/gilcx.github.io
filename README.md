# Portfolio — Christopher Gil Icaza

A one-page portfolio website built with vanilla HTML, CSS, and JavaScript.
No frameworks, no build step — just open it in a browser.

## Features

- Animated "wireframe" particle background that reacts to your cursor
- Horizontally scrollable project carousel with arrow controls
  (exactly 3 cards per view on desktop, 2 on tablet, 1 on mobile)
- Color-coded project badges and a wine/burgundy dark theme
- Fully static — deployable to GitHub Pages or any static host

## Getting started

Option 1 — open `index.html` directly in a browser.

Option 2 — run a local server:

```bash
python3 -m http.server
```

Then visit <http://localhost:8000>.

## Project structure

```
.
├── index.html            # All page content (edit text, cards, badges here)
├── css/
│   └── style.css         # Theme colors, layout, animations
├── js/
│   └── main.js           # Particle background + carousel logic
└── assets/
    └── *.svg             # Placeholder project images (swap for real screenshots)
```

## Customization

- **Text & cards** — edit `index.html`. To add a project, copy-paste any
  `<article class="card">` block and change the `img src`, title, and description.
- **Colors** — the `:root` variables at the top of `css/style.css`
  (`--bg`, `--accent`, `--panel`, …). Change one value, the theme follows.
- **Badge colors** — the `.badge-*` classes in `css/style.css`.
- **Background particles** — brightness/speed constants in `js/main.js`
  (the `alpha` value in `draw()` for line brightness; `MOUSE_FORCE` for cursor physics).
- **Images** — replace the placeholder SVGs in `assets/` with real screenshots
  (any PNG/JPG works; cards use a 16:10 image area).

## Deploying to GitHub Pages

1. Create a GitHub repository.
2. Push this folder so `index.html` sits at the repo root.
3. In the repo: **Settings → Pages → Deploy from a branch** → select your
   branch and `/ (root)` → Save.
4. Your site is live at `username.github.io/repo-name` within a couple of minutes.
