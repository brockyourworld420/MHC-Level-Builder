# Android setup — public MHC tools

This **public** repository hosts the Level Builder and Forge Studio. The separate full MHC game repository remains **private**.

## Open on your phone

1. Level Builder: https://brockyourworld420.github.io/MHC-Level-Builder/
2. Forge Asset Studio: https://brockyourworld420.github.io/MHC-Level-Builder/asset-studio/
3. Rotate your Android browser to landscape for the level editor. Bookmark both pages.

Both HTML pages are standalone and do not require installation or access to the private game for their offline functions.

## Keep your settings when closing the tab

In Forge v5, prompts, per-game settings, local job history, reference images, approved/rejected artwork and review notes are saved on your phone in browser storage, and the last artwork review reopens automatically. Open the **same URL in the same browser**; Chrome and Samsung Internet generally provide a persistent profile, while some in-app previews or private tabs may not.

To avoid pasting the GitHub token each time, choose **Connect → Remember my GitHub connection on this device** before connecting. It is an explicit opt-in: the token is saved encrypted with a local browser key. Anyone with access to your unlocked browser, or scripts running with this site's permissions, could potentially use it. Restrict token scope and expiration, and turn this off on shared devices. **Disconnect and forget token** clears remembered authentication; **Clear all Forge browser saves** clears local workspace data after confirmation. Neither action deletes your GitHub project files.

## First-use notes

**Level Builder:** Edit terrain with tap/drag, add points, paint independent surface/physics/underground, use JSON import/export and save backups. The scenic view is illustrative, not a playable private game render.

**Forge:** Select an asset preset and edit prompt/style/size/quality. Free offline editing and ZIP review work without a GitHub token or OpenAI key. To generate artwork, use the private [Asset Workshop GitHub Actions](https://github.com/brockyourworld420/Motorcycle-hill-climb-racing/actions/workflows/asset-workshop.yml), or optionally connect Forge with a short-lived fine-grained GitHub token that can access only that private repository (Actions read/write, Contents read/write to review and publish images directly).

Forge does not store a token across sessions and does not include an OpenAI key. Image jobs use the private repo's encrypted Actions secret and require paid opt-in; their dollar allowance is for planning, not an enforced billing cap. After a completed paid run, open **Jobs → Review here · cost**, approve desired images, and tap **Send approved to GitHub**. This saves selected PNGs to the private game repository under `assets/forge-approved/`, without exporting or uploading ZIPs. This is an asset library, not automatic game integration. The reported cost is a usage-derived USD estimate, not the final API invoice.

## Publishing

The public Pages workflow already exists and runs when `main` changes. If website publishing reports GitHub Pages is not configured, visit [Settings → Pages](https://github.com/brockyourworld420/MHC-Level-Builder/settings/pages), choose **Source: GitHub Actions**, and rerun [the Pages deployment](https://github.com/brockyourworld420/MHC-Level-Builder/actions/workflows/pages.yml). This is **the public tools repository's settings**, not the private game repository.

Do not change the private game's visibility to Public. The publishing workflow copies only two standalone HTML pages and one non-sensitive sample level JSON; all other repository files are excluded.
