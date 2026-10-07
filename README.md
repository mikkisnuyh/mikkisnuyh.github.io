# mikkisnuyh.github.io

Personal portfolio of Hyunsik Kim, served at <https://mikkisnuyh.github.io>.

Plain HTML, CSS and JavaScript with no build step. Push to `main` and GitHub Pages publishes it.

| File | Purpose |
| --- | --- |
| `index.html` | All page content (about, projects, toolbox, contact) |
| `styles.css` | Styles; light/dark colors are the `light-dark()` tokens at the top |
| `script.js` | Scroll effects, active nav link, footer year, light/dark toggle (saved in `localStorage`; an inline script in `index.html`'s `<head>` applies it before first paint) |
| `favicon.svg` | Tab icon |

To preview locally: `python3 -m http.server` and open <http://localhost:8000>.

To add a project, copy an `<article class="card">` block in `index.html`.
