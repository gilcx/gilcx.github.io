# Portfolio - Christopher Gil Icaza

Personal portfolio showcasing my software engineering, systems, AI/LLM, and development projects.

🌐 **Live site:** [https://gilcx.github.io](https://gilcx.github.io)

## About

This portfolio highlights projects I’ve worked on across software development, systems engineering, AI infrastructure, and other technical areas.

The site was built from scratch using vanilla HTML, CSS, and JavaScript with a focus on a polished, responsive experience without relying on a frontend framework.

## Highlights

- Recruiter-focused homepage with current experience, featured work, skills, and education
- Concise Handfluence, KVWatch, GIL-NAS, Arrow Dynamix, and QGDC case studies with on-demand media and expandable technical notes
- Responsive design for desktop, tablet, and mobile
- Smoky charcoal, muted purple, and wine-red dark theme on the redesigned pages
- Lightweight static architecture with no frontend framework or runtime dependencies
- Hosted through GitHub Pages

## Technologies

- HTML5
- CSS3
- JavaScript
- Git / GitHub
- GitHub Pages

## Design & Implementation

The portfolio is intentionally implemented as a lightweight static website rather than using a larger frontend framework.

The homepage, Handfluence, KVWatch, GIL-NAS, Arrow Dynamix, and QGDC share the new design. They share `css/portfolio.css`, use native links and disclosure controls, and do not load JavaScript or animated backgrounds. Handfluence and Arrow Dynamix videos play only when requested. KVWatch uses compact screenshot previews with links to the full-resolution images, plus expandable architecture and validation notes. Smooth anchor scrolling respects reduced-motion preferences.

All project pages now use the shared design. The original `css/style.css` and `js/main.js` remain in the repository as unused legacy files.

GIL-NAS credits Michael Klements for the original enclosure and baseline build. Arrow Dynamix links to its public itch.io release; its source repository remains private.

Handfluence's source code is private. The case study describes Christopher's contribution through August 2025 and credits continuing development to Perceivable Design Studios.

## Local Preview

From the repository root, run:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/` for the homepage. The redesigned case studies are under `/projects/handfluence.html`, `/projects/kvwatch.html`, `/projects/gil-nas.html`, `/projects/arrow-dynamix.html`, and `/projects/game-design-club.html`. No build step or dependency installation is required.

## Repository Structure

```text
.
├── index.html
├── css/
│   ├── portfolio.css  # Redesign pilot
│   └── style.css      # Original project pages
├── projects/
│   ├── handfluence.html
│   ├── kvwatch.html
│   ├── gil-nas.html
│   └── arrow-dynamix.html
├── js/
│   └── main.js
└── assets/
    └── ...
```

## Deployment

The site is continuously hosted from this repository using GitHub Pages.

Changes pushed to the production branch are reflected on the live portfolio at:

**https://gilcx.github.io**
