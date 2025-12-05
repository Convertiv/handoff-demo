---
title: SASS and CSS Guide
description: |
  This document is designed to help you use the styles that are built here, 
  either as compiled SASS or native CSS.
weight: 0
image: hero-design
menuTitle: "Token Guide"
metaTitle: "Token Guide | Handoff Design System"
metaDescription: "How to use handoff tokens in your project."
enabled: true
menu:
---

import { Hero } from "handoff-app/src/app/components/Hero";

<Hero title={props.title} image={false}>
  <p>{props.description}</p>
</Hero>

## Overview

Handoff's sites are built on a number of different CMS platforms, and use
different build systems and technologies. This guide is designed to help
consolidate the different ways that the frontend styles are built, and
create some rational systems to govern how we build and maintain our styles.

<a target="_blank" href="/snippets/shared.css">
  Download Common SASS Files
</a>

## SASS and CSS

This guide is designed to help you use the styles that are built here, either
as compiled SASS or native CSS. The style tokens that are pulled from Figma
are avaliable either as as SASS or CSS variables.

In addition, all of the style here are written as SASS files, and compiled down
to native CSS. As much as possible, the components are written with isolation
on each level of the component tree, so that they can be easily reused in other
projects.

### Bootstrap

Handoff is consolidating on the Bootstrap 5 framework. This guide will assume that
you are building on this framework.

## Structure

The SASS files are organized in a way that is designed to make it possible to
write the minimal amount of custom styles for each component. Those minimal
custom styles are compiled in such a way that they can be compiled and used
with minimal dependencies.

#### Level 1: Bootstrap

All components depend on Bootstrap. You may include Bootstrap in the following
ways -

```html title="Use Bootstrap CDN in your HTML"
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous"
/>
```

If you are use a package manager -

```scss title="Import into your SASS file"
@import "~bootstrap/scss/bootstrap";
```

#### Level 2: Shared Elements

These are the shared SASS values you will need to build the custom styles for an
element. They are stored in `integration/snippets/shared/common` and are required
in the SASS file for the component in order to build the styles.

These files should be included in this order:

- **[color-palette.scss](/guidelines/styles/color_palette)** - Defines the color pallette for the site
- **[functions.scss](/guidelines/styles/functions)** - Defines common SASS functions
- **[font-face.scss](/guidelines/styles/font_face)** - Create a set of font faces that can be used elsewhere
- **[keyframes.scss](/guidelines/styles/keyframes)** - Defines common keyframes for animations
- **[variables.scss](/guidelines/styles/variables)** - Maps values and Figma tokens to bootstrap variables

#### Level 3: Mixins

These are the SASS mixins that are used to build the styles for an element. They
are required in the SASS file for the component in order to build the styles.

These files should be included in this order:

- **[basics.scss](/guidelines/styles/basics)** - Basic styles for building components
- **[icon-sprite.scss](/guidelines/styles/icon_sprite)** - Mixins for building icon sprites
- **[typo.scss](/guidelines/styles/typo)** - Mixins for building typography
- **[buttons.scss](/guidelines/styles/buttons)** - Mixins for building buttons
- **[links.scss](/guidelines/styles/links)** - Mixins for building links

#### Level 4: Components

Simple atomic components (elements: buttons, alerts, etc) are built by applying Figma
tokens to the Bootstrap variables. More complex components (blocks: heros or cards)
are styled by applying the mixins with custom classes and SASS.

These sections are designed to be as modular as possible, so that they can be
dropped in to any project and used with minimal dependencies. Below each
resource is a code block that will show you html, SASS, and Javascript, as well
as the compiled CSS you will need.
