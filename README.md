# MHC Level Builder — public, asset-free editor

A lightweight, standalone HTML level editor for Motorcycle Hill Climb Racing (MHC). This public project contains only the standalone editor and sample level data. **It does not include the private game source, actual game textures, rider artwork, motorcycles, physics engine, OpenAI API key, or builds of the playable game.**

## Open on Android

When this repository's GitHub Pages deployment is enabled, open its Pages URL and rotate to landscape. You can also open `index.html` locally, though some Android file managers restrict opening HTML.

## Publish with free GitHub Pages

The editor is already uploaded to the public repository [MHC-Level-Builder](https://github.com/brockyourworld420/MHC-Level-Builder). To turn on the direct browser link, open **[Settings → Pages](https://github.com/brockyourworld420/MHC-Level-Builder/settings/pages)**, find **Build and deployment → Source**, and select **GitHub Actions**. The existing `.github/workflows/pages.yml` then publishes only the editor and its example level. Re-run that deployment from Actions if the initial run failed before Pages was enabled. When GitHub confirms deployment, open `https://brockyourworld420.github.io/MHC-Level-Builder/`. Public repositories can use GitHub Pages on GitHub Free.

A browser link is available only after that repository has been created and Pages has finished its first deployment. Do not change the visibility of the main MHC game repository.

## Using the editor

- **Generate:** Create a course from an offline preset, without API credits.
- **Move / select:** Tap and drag terrain points; tap to edit details.
- **Add point / smooth:** Reshape the track. Starting and ending terrain endpoints cannot be moved horizontally.
- **Paint:** Select separate physics, surface appearance and underground, then tap the terrain at the boundary.
- **Checkpoint / sign / deck:** Add authored objects and edit their positions and text. Decks require at least two points before export.
- **Zoom / pan:** Pinch to zoom, two-finger pan or use the +/- buttons.
- **Save JSON:** Export a file compatible with the `mhc-level-v1` custom-course schema. Import JSON to continue editing. A local browser draft is also saved.

## Using AI credits safely

The public editor does **not** call the OpenAI API. Use **Open private AI workflow** to link to the OpenAI-enabled GitHub Actions workflow in the private MHC repo; prompts are copied manually, and the resulting JSON is downloaded and imported here. Never store API keys in GitHub Pages code, JavaScript, or HTML.

## Important limits

The scenic view is **illustrative**, not the actual MHC asset renderer, which remains private. The current verified game source in GitHub may lag the newest project version; do not present browser previews as physics playtests. To test a level, import it into the latest verified MHC private game build separately and test at 0.45g and 0.90g.

## Data and privacy

The editor stores drafts in the device's `localStorage`, which is not synchronized between devices. Download JSON regularly for backups. Exported JSON may be shared publicly only if you choose to publish it. No tracking scripts, CDNs or third-party runtime dependencies are loaded.

The editor code may be viewed when the repository is public. No software license has been granted automatically; set a license explicitly if you later want third parties to copy or redistribute it.