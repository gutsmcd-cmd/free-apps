# M@ Free Apps

Marketing site for Mat’s free offline app family.

**Pitch:** Truly free forever · no login · works offline · no ads.

**Live apps featured**

| App | Line | URL |
| --- | --- | --- |
| Three Things | General | https://gutsmcd-cmd.github.io/three-things/ |
| Long Shot | General | https://gutsmcd-cmd.github.io/long-shot/ |
| 画像しぼる | Japanese-first | https://gutsmcd-cmd.github.io/gazou-shiboru/ |
| ポコ・ア・ポコ スペイン語 (Poco a Poco) | Japanese-first | https://gutsmcd-cmd.github.io/poco-a-poco/ |
| あと何日 | Japanese-first | https://gutsmcd-cmd.github.io/ato-nannichi/ |
| 旅の持ち物 | Japanese-first | https://gutsmcd-cmd.github.io/tabi-no-mochimono/ |
| 定型ぶん | Japanese-first | https://gutsmcd-cmd.github.io/teikei-bun/ |
| モザイク一発 | Japanese-first | https://gutsmcd-cmd.github.io/mosaic-ippatsu/ |
| 矢印一発 | Japanese-first | https://gutsmcd-cmd.github.io/yajirushi-ippatsu/ |
| さっとメモ | Japanese-first | https://gutsmcd-cmd.github.io/satto-memo/ |
| QR一発 | Japanese-first | https://gutsmcd-cmd.github.io/qr-ippatsu/ |
| わりかん | Japanese-first | https://gutsmcd-cmd.github.io/warikan/ |
| カウント一発 | Japanese-first | https://gutsmcd-cmd.github.io/count-ippatsu/ |
| キッチンタイマー | Japanese-first | https://gutsmcd-cmd.github.io/kitchen-timer/ |

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
- ポコ・ア・ポコ スペイン語 — rojo `#e2574c` (icon: `assets/poco-a-poco-icon.svg`, wraps the app’s icon-192.png)
- あと何日 — `#ff7e5a` (icon: `assets/ato-nannichi-icon.svg`)
- 旅の持ち物 — `#16a88e` (icon: `assets/tabi-no-mochimono-icon.svg`)
- 定型ぶん — `#606dff` (icon: `assets/teikei-bun-icon.svg`)
- モザイク一発 — `#8061f1` (icon: `assets/mosaic-ippatsu-icon.svg`)
- 矢印一発 — `#f5b21d` (icon: `assets/yajirushi-ippatsu-icon.svg`)
- さっとメモ — `#f9b30a` (icon: `assets/satto-memo-icon.svg`)
- QR一発 — `#3d84fa` (icon: `assets/qr-ippatsu-icon.svg`)
- わりかん — `#22bc5b` (icon: `assets/warikan-icon.svg`)
- カウント一発 — `#9149fa` (icon: `assets/count-ippatsu-icon.svg`)
- キッチンタイマー — `#f9693c` (icon: `assets/kitchen-timer-icon.svg`)

The ten Japanese-first utilities above use the shared `.mock-accent` / `.btn-accent` classes with a per-card `--accent` inline style; each icon SVG wraps that app’s `public/icons/icon-192.png`.

UI mocks on the cards are labeled placeholders, not product screenshots.
