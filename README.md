# Handoff Demo

This is a demo of the handoff design token toolchain. It uses the open source
library handoff-app to fetch design data and abstract it as json. Then that 
json data is read into a react app which can be published to a static host.

This library is designed to be run either on a schedule and published to a 
central host or run adhoc by a developer.

The code in this project falls into three categories - Configuration, Exported 
artifacts, and specific customizations. All of the principle fetch and build 
logic is provided by the handoff-app npm repository.

### Artifacts

This project is designed to generate two things

1. A json specification describing the design standards from your figma project
2. A single page react app providing a web app for working with the design standards

## Current State

This application is currently focused on providing design foundations. The foundations
are as follows

- Colors
- Fonts
- Logos
- Iconongraphy
- Image styles

In subsequent releases we expect to expand the documentation here to further areas including

- Figma Changelog
- Component structures
- Spacing and layout
- Change notification
- Module layout

This document will be updated to reflect latest state.

### Requirements

- Node 16 and NPM 8
- Git (For making commits back to the repo if you want automated change tracking)

### Quickstart

- Your figma project must be set up according to Convertiv Design standards and published
- Clone this repository
- Run `npm install`
- Copy the .env.example to .env
- Generate a figma personal access token
  - Log in to www.figma.com
  - Click on your profile dropdown in the top left corner
  - Click on settings
  - Create a personal access token
  - Paste that personal access token into DEV_ACCESS_TOKEN in your .env
- Get the figma project id.
  - You can find it by navigating to your project in figma
  - The id is in the url https://www.figma.com/file/{id}/{project}
  - Paste that personal access token into FIGMA_PROJECT_ID in your .env
- Edit `handoff.config.json` in the root of the project to set up any project specs.
  - This file allows rich configuration of large sets of the project. We'll continue
    to document the settings in this readme file.
- Run `npm run fetch`.
  - This will read the figma file and export the spec to the `exported` folder
  - You will find two files
    - tokens.json with the specification
    - changelog.json documented the ongoing changes of the project (WIP)
- Run `npm run build` to build the react app
  - This will build the exported data and the configuration
  - The built site will be published to `out`.
  - This `out` folder can be served from any web server

### Use in your CI

This project is designed to be built and run regularly to keep the online
documentation up to date. You can see an example github action in
`.github/workflows/deploy_production.yml`.

To run in a CI, make sure your CI has node 16 and npm 8. Then script the
following steps in the task runner

#### CI Prerequisites

The following env vars must be set

- FIGMA_PROJECT_ID
- DEV_ACCESS_TOKEN

#### CI Build

- `npm install`
- `npm run fetch`
- `npm run build`
- Then publish the dist folder to a webserver
