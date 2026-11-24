# MHC Public Tools — Level Builder + The Forge Game Asset Studio

This **public** repository contains only standalone, browser-friendly tool webpages and one example level JSON. It is deliberately separate from the **private** [Motorcycle Hill Climb Racing game repository](https://github.com/brockyourworld420/Motorcycle-hill-climb-racing), which remains private.

## Open the webpages

- **[MHC Level Builder](https://brockyourworld420.github.io/MHC-Level-Builder/)** — shape courses, paint independent surface/physics/underground materials, edit checkpoints and decks, import/export `mhc-level-v1` JSON.
- **[The Forge — Asset Studio](https://brockyourworld420.github.io/MHC-Level-Builder/asset-studio/)** — design boulders, logs, stumps, grass, mud, timber and UI asset requests; select prompt and model quality; review drafts from ZIPs; export approved PNGs.

Both work in an Android landscape browser. The Forge page also works for editing/reviewing without any authentication.

**No game, motorcycle or rider image, sound effects, physics code, full game assets, or OpenAI API key are included in the published webpages.** Only `index.html`, `asset-studio/index.html`, and `levels/alberta-foothills.json` are uploaded to Pages. The allowlist in `.github/workflows/pages.yml` enforces this at deployment.

## Forge Studio: using API credits

Forge never calls OpenAI directly from the public page. It targets **the private MHC GitHub Actions workflow** `asset-workshop.yml`, where API keys live as encrypted GitHub Actions secrets. Two ways to work:

1. **Without a token:** use Create → choose a preset and edit the prompt → **Copy JSON** or **Download JSON**. In the private game repo, run [Game Asset Workshop](https://github.com/brockyourworld420/Motorcycle-hill-climb-racing/actions/workflows/asset-workshop.yml) with the `request_json` input. Or use its built-in quick asset preset without JSON editing. No credits are spent by simply opening or editing the public page.
2. **Connected mode (optional):** in Forge → Connect, paste a short-lived **fine-grained GitHub personal access token** restricted to **only** the private MHC repository, with Actions read/write permission. To upload personal photo references, grant Contents read/write too. The browser stores the token **in memory only**, not in the HTML or browser local storage. Disconnect or close the tab to clear it. Forge prompts for explicit confirmation before any paid run.

The private workflow limits batches to 1–3 images with no automatic retries and a planning allowance. **The allowance is not a guaranteed API billing cap.** Check account spend limits in OpenAI Platform. Generated outputs are **drafts** in a review ZIP, never automatically replacing approved game assets. Uploaded references are placed on temporary branches of the *private* game repo; delete these branches when finished.

## Level Builder and privacy

The Level Builder is an **illustrative level editor** and does not include the live proprietary game renderer or game physics. Export levels as JSON and validate/playtest separately in the newest privately held game source. The standard MHC gravity QA uses 0.45g and 0.90g.

The public tools store working drafts locally in your browser, so download JSON and approved artwork exports as backups. GitHub Pages displays the **public** HTML source for anyone to inspect; do not place private content, secrets, or sensitive images in this repository. No CDN/runtime account service is required merely to open either page. A public visitor cannot launch paid generation in your private game repo without authorized credentials.

## GitHub Pages deployment

GitHub Pages is available free for **public** repositories. This project already has its own successful Pages deployment. The [Publish workflow](.github/workflows/pages.yml) rebuilds automatically when `main` changes, and publishes exactly the static site allowlist.

If publishing stops working, in this **public repo** open [Settings → Pages](https://github.com/brockyourworld420/MHC-Level-Builder/settings/pages) and choose **Build and deployment → GitHub Actions**; then rerun [Deploy public MHC Level Builder](https://github.com/brockyourworld420/MHC-Level-Builder/actions/workflows/pages.yml).

The private MHC repository is **not** required to be publicly hosted or have GitHub Pages enabled.

## License

This repo's public source is viewable, but no reuse license is granted by default. If external reuse is intended, add a license deliberately.
