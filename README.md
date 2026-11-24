# MHC Public Tools — Level Builder + The Forge Game Asset Studio

This **public** repository contains only standalone, browser-friendly tool webpages and one example level JSON. It is deliberately separate from the **private** [Motorcycle Hill Climb Racing game repository](https://github.com/brockyourworld420/Motorcycle-hill-climb-racing), which remains private.

## Open the webpages

- **[MHC Level Builder](https://brockyourworld420.github.io/MHC-Level-Builder/)** — shape courses, paint independent surface/physics/underground materials, edit checkpoints and decks, import/export `mhc-level-v1` JSON.
- **[The Forge — Asset Studio](https://brockyourworld420.github.io/MHC-Level-Builder/asset-studio/)** — design boulders, logs, stumps, grass, mud, timber and UI asset requests; select prompt and model quality; review new drafts directly from private GitHub jobs; approve and send PNGs to the private game asset library without ZIP downloads. An offline ZIP fallback remains.

Both work in an Android landscape browser. The Forge page also works for editing/reviewing without any authentication.

**No game, motorcycle or rider image, sound effects, physics code, full game assets, or OpenAI API key are included in the published webpages.** Only `index.html`, `asset-studio/index.html`, and `levels/alberta-foothills.json` are uploaded to Pages. The allowlist in `.github/workflows/pages.yml` enforces this at deployment.

## Forge v5 — remember your browser workspace

Forge now automatically saves **draft prompts and settings per game, current project, local job history, review notes, approval choices, last Review tab and downloaded/generated artwork previews**. Up to eight recent review batches plus two compressed personal reference images are stored in browser IndexedDB when permitted. Reopening the same Forge address in the **same browser/profile** restores the last workspace; no ZIP download is needed just to resume reviewing.

Under **Connect**, an optional **Remember my GitHub connection on this device** checkbox saves a token encrypted with a non-extractable browser key and verifies it again on reopening. This is convenient but **not secure against malicious scripts from the same site or someone with access to your unlocked browser**; leave it off on shared devices. Disconnect forgets the locally saved token. The OpenAI API key is still never stored or exposed on the public page. The user can clear all browser saves from Connect. Browser data can be erased by incognito mode, storage cleanup, or OS eviction; GitHub files/jobs are not erased by that action. Avoid ChatGPT in-app previews if that browser doesn't retain site data; open and bookmark Forge in Chrome or Samsung Internet for a stable browser profile.

## Forge Studio: using API credits

Forge never calls OpenAI directly from the public page. It targets **the private MHC GitHub Actions workflow** `asset-workshop.yml`, where API keys live as encrypted GitHub Actions secrets. Two ways to work:

1. **Without a token:** use Create → choose a preset and edit the prompt → **Copy JSON** or **Download JSON**. In the private game repo, run [Game Asset Workshop](https://github.com/brockyourworld420/Motorcycle-hill-climb-racing/actions/workflows/asset-workshop.yml) with the `request_json` input. Or use its built-in quick asset preset without JSON editing. No credits are spent by simply opening or editing the public page.
2. **Connected mode (optional):** in Forge → Connect, paste a short-lived **fine-grained GitHub personal access token** restricted to **only** the private MHC repository, with Actions read/write permission. For direct review, photo references and one-tap approval publishing, also grant Contents read/write. The browser stores the token **in memory only**, not in the HTML or browser local storage. Disconnect or close the tab to clear it. Forge prompts for explicit confirmation before any paid run.

The private workflow limits batches to 1–3 images with no automatic retries and a planning allowance. **The allowance is not a guaranteed API billing cap.** Check account spend limits in OpenAI Platform. A completed connected job also publishes **private draft previews** on an isolated `forge-drafts/` branch. In Jobs, tap **Review here · cost** to open the images without downloading a ZIP. In Review, select **Approve** and **Send approved to GitHub** to commit selected PNGs and review metadata into `assets/forge-approved/<request-id>/` on private game `main`. The playable game still does not load them automatically. Historical runs retain their ZIP fallback. The Studio shows a usage-based **estimated API charge in USD**, distinct from the planning allowance; verify final charges on the OpenAI Platform dashboard. Uploaded references are placed on temporary branches of the *private* game repo; delete these branches when finished.

## Level Builder and privacy

The Level Builder is an **illustrative level editor** and does not include the live proprietary game renderer or game physics. Export levels as JSON and validate/playtest separately in the newest privately held game source. The standard MHC gravity QA uses 0.45g and 0.90g.

The public tools store working drafts locally in your browser, so download JSON and approved artwork exports as backups. GitHub Pages displays the **public** HTML source for anyone to inspect; do not place private content, secrets, or sensitive images in this repository. No CDN/runtime account service is required merely to open either page. A public visitor cannot launch paid generation in your private game repo without authorized credentials.

## GitHub Pages deployment

GitHub Pages is available free for **public** repositories. This project already has its own successful Pages deployment. The [Publish workflow](.github/workflows/pages.yml) rebuilds automatically when `main` changes, and publishes exactly the static site allowlist.

If publishing stops working, in this **public repo** open [Settings → Pages](https://github.com/brockyourworld420/MHC-Level-Builder/settings/pages) and choose **Build and deployment → GitHub Actions**; then rerun [Deploy public MHC Level Builder](https://github.com/brockyourworld420/MHC-Level-Builder/actions/workflows/pages.yml).

The private MHC repository is **not** required to be publicly hosted or have GitHub Pages enabled.

## License

This repo's public source is viewable, but no reuse license is granted by default. If external reuse is intended, add a license deliberately.
