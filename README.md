# M@ Free Apps

Marketing site for Mat’s free offline app family.

**Pitch:** Truly free forever · no login · works offline · no ads.

**Live apps featured**

| App | Line | URL |
| --- | --- | --- |
| Three Things | General | https://gutsmcd-cmd.github.io/three-things/ |
| Long Shot | General | https://gutsmcd-cmd.github.io/long-shot/ |
| 画像しぼる | Japanese-first | https://gutsmcd-cmd.github.io/gazou-shiboru/ |

Private apps (e.g. personal travel kits) are intentionally **not** listed.

## Local preview

No build step. From this folder:

```bash
# Python
python3 -m http.server 8080

# or Node
npx --yes serve -l 8080 .
```

Open http://localhost:8080

Pages: `index.html` (apps), `about.html`, `suggest.html` (mailto form, no backend).

## Deploy to GitHub Pages

1. Create a public repo (e.g. `free-apps-site` or `gutsmcd-cmd.github.io`).
2. Push this folder to `main` (or `master`).
3. **Repo → Settings → Pages → Build and deployment → Source: GitHub Actions.**
4. The workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) uploads the repo root and deploys with `actions/deploy-pages`.
5. After the first green run, the site is at `https://<user>.github.io/<repo>/` (or the custom/`user.github.io` URL).

Asset links use relative paths (`./styles.css`), so the site works at a project-pages subpath or at the domain root.

### Manual upload alternative

Copy everything except `.git` into the repo and enable Pages from the root (or use the Actions workflow above). A ready-to-upload tree is prepared beside this project as `free-apps-site-upload`.

## Suggest form

`suggest.html` builds a `mailto:gutsmcd@gmail.com` link in the browser. Update the address in `script.js` (`SUGGEST_EMAIL`) if it changes.

## Brand accents (app cards)

- Three Things — amber `#e8a838`
- Long Shot — teal `#2dd4bf`
- 画像しぼる — coral `#f4837d`

UI mocks on the cards are labeled placeholders, not product screenshots.
