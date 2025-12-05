---
title: "Javascript Guidelines"
description: |
  This guide will help you understand how to use Javascript in your project.

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

## Best Practice Javascript tools

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [WebPack](https://webpack.js.org/)

## Dependencies Used in the Handoff Design System

- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [jQuery](https://jquery.com/)
- [Popper.js](https://popper.js.org/)
- [Slick](https://kenwheeler.github.io/slick/)
- [countUp.js](https://inorganik.github.io/countUp.js/)

## Dependency Management

Handoff recommends using npm for dependency management. This allows for easy
installation and updating of dependencies.

```bash title="Install Dependencies"
npm install
```

If you cannot use NPM or another package manager, you can include the javascript
dependencies in your HTML file. Download the code from a secure, trusted source
and verify that it is safe to use before including it. If you are not using
dependency management, you will need to document the dependencies in your project.

## Coding Style and Best Practices

Handoff recommends using ESLint and Prettier to ensure that your Javascript is
written in a consistent style and is free of errors. This will help you
ensure that your code is clean and easy to read.

### Variables

Handoff uses camelCase for variable and function names. This will help you ensure
that your code is consistent and easy to read.

```javascript title="Variable Naming"
// Use camelCase for variable names
const myVariable = "Hello, World!";
```

Handoff recommends using `const` and `let` to declare variables. This will help
you ensure that your variables are scoped correctly and that you are not
accidentally reassigning variables.

```javascript title="Variable Declaration"
// Use const for variables that will not be reassigned
const myVariable = "Hello, World!";
// Use let for variables that will be reassigned
let myOtherVariable = "Goodbye, World!";
```

## Build tooling

To ensure that the Javascript is built correctly, Handoff recommends using WebPack.
This will allow you to bundle your Javascript files and ensure that they are
minified and optimized for production. Using webpack will also allow you to
use the latest ES6 features and ensure that your code is compatible with
older browsers.

The Javascript provided by this design system is written in native browser
Javascript and is designed to be compatible with all modern browsers. This
will allow you to use components in Content Management Systems that do not
allow for a modern build process.

## Linting and Formatting

Handoff recommends using ESLint and Prettier to ensure that your Javascript is
well-formatted and free of errors.

To use ESLint, you will need to install it as a dev dependency in your project.

```bash title="Install ESLint"
npm install eslint --save-dev
```

To use Prettier, you will need to install it as a dev dependency in your project.

```bash title="Install Prettier"
npm install prettier --save-dev
```

You can then configure ESLint and Prettier to work together in your project.

```javascript title="ESLint Configuration"
module.exports = {
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
```

```javascript title="Prettier Configuration"
module.exports = {
  singleQuote: true,
  trailingComma: "all",
};
```

Make ESLint and Prettier executable from npm scripts in your `package.json` file.

```json title="package.json"
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```
