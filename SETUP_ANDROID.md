# Publish the MHC Level Builder for free from your Android phone

**Do not change your main MHC game repository from Private to Public.**

1. Open https://github.com/new . Enter repository name `MHC-Level-Builder` and set **Public**. Check **Add a README** so `main` exists. Tap **Create repository**.
2. The fastest mobile path: download `MHC_Level_Builder_Public_v0.3.0.html` from ChatGPT, rename it to `index.html` using Files (or use the `index.html` from the extracted ZIP). In the new repository, tap **Add file → Upload files**, upload only `index.html`, then **Commit changes** to `main`.
3. Open the **new public repository's Settings → Pages**. Under **Build and deployment → Source**, choose **Deploy from a branch**. Select **main** and **/(root)** and tap **Save**. (You do not have to upload or configure the optional Actions workflow.)
4. Once GitHub reports **Your site is live**, open the URL it gives. For a repository named `MHC-Level-Builder`, the usual URL format is `https://brockyourworld420.github.io/MHC-Level-Builder/`.
5. Bookmark the website or use Chrome's **Add to Home screen** to open the editor like an app.

**Automatic updates (optional):** If you upload the full repository package, including `.github/workflows/pages.yml`, you can choose **GitHub Actions** as the Pages source instead of **Deploy from a branch**. Every future push to `main` rebuilds the editor-only site. The workflow has an explicit safelist that excludes the game, its artwork, and API secrets.

**Important:** A new public repository has to be created from the GitHub UI first. ChatGPT's currently connected GitHub tools can edit existing repositories but cannot create new repositories. Once that repository exists and the GitHub integration has access to it, further updates can be pushed directly.