---
title: Hubspot Deployment
description: |
  Handoff's integration with hubspot
weight: 0
image: hero-design
menuTitle: "Accessibility"
metaTitle: "Accessibility | Handoff Design System"
metaDescription: "This page defines the accessibility rules for Handoff web properties."
enabled: true
wide: false
menu:
---


## Deploying to Hubspot with Handoff

Handoff can deploy your site or content directly to Hubspot by using the [`handoff-hubspot`](https://www.npmjs.com/package/handoff-hubspot) npm library in combination with GitHub CI/CD workflows. This setup automates pushing your latest site changes to Hubspot and can be integrated into your project's deployment pipeline for reliable and repeatable results.

### 1. Install `handoff-hubspot`

Add the library to your project with:

```sh
npm install --save-dev handoff-hubspot
```

### 2. Configure Hubspot Access

Obtain a [Hubspot Private App Access Token](https://developers.hubspot.com/docs/api/private-apps) and store it **securely** in your GitHub repository's secrets (`Settings > Secrets and variables > Actions`). For example, name it `HUBSPOT_ACCESS_TOKEN`.

### 3. Setup a GitHub Workflow

Create (or edit) a workflow under `.github/workflows/deploy.yml` to deploy to Hubspot on push to your main branch. Example workflow:

```yaml
name: Deploy to Hubspot

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build # (customize as needed for your project)

      - name: Deploy to Hubspot
        run: |
          npx handoff-hubspot publish ./dist --accessToken="${{ secrets.HUBSPOT_ACCESS_TOKEN }}"
```

- Replace `./dist` with the path to your site's build output.
- The `handoff-hubspot publish` command pushes your site/assets to Hubspot according to the upload method (static files, CMS pages, etc.) supported by the package.

### 4. Customizing Deployments

The `handoff-hubspot` CLI and API support additional configuration, such as specifying target Hubspot portal, folder paths, overwrite strategies, etc. Consult the [`handoff-hubspot` docs](https://www.npmjs.com/package/handoff-hubspot) for more advanced usage.

---

By integrating `handoff-hubspot` with your GitHub actions workflow, you enable automated and repeatable deployments to Hubspot, streamlining the delivery process for your site or apps.


