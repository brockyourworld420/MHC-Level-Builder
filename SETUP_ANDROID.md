# MHC Level Builder — Android setup

The **public** Level Builder repository is already created and the editor is already uploaded: https://github.com/brockyourworld420/MHC-Level-Builder . The original Motorcycle Hill Climb Racing game repository remains **private**.

## One-time action: enable GitHub Pages

1. On your Android phone open https://github.com/brockyourworld420/MHC-Level-Builder/settings/pages
2. Under **Build and deployment → Source**, select **GitHub Actions**. This is different from the original private MHC repository settings.
3. If the Pages menu is collapsed on mobile, tap the page heading and scroll down; Chrome's **Desktop site** can help.
4. GitHub's first editor deployment ran before Pages was enabled, so it may show a failed workflow. After enabling Pages, open https://github.com/brockyourworld420/MHC-Level-Builder/actions/workflows/pages.yml and tap **Run workflow** (or ask ChatGPT to rerun it through GitHub).
5. When the workflow succeeds, the editor link should be https://brockyourworld420.github.io/MHC-Level-Builder/ . Check **Settings → Pages** for GitHub's actual live URL before bookmarking.

## Working in the editor

Rotate the phone to landscape. Drag terrain points, paint surface materials, add signs and checkpoints, import or export JSON, and save copies periodically. Drafts are saved locally in that browser only.

The standalone editor has illustrative scenery, not the private MHC game renderer. Never put your API key into this public repository. For AI-generated terrain, use the separate GitHub Actions workflow in the private MHC repo and import its JSON output.

## Updating this editor

The GitHub Actions workflow `.github/workflows/pages.yml` publishes the allow-listed `index.html` and example level files automatically on later changes to `main`. It does not publish the private game source, assets or secrets.
