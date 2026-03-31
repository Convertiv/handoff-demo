---
title: HubSpot Transpiler Pipeline
description: |
  Technical reference for the handoff-hubspot CLI: installation, configuration,
  all commands, Handlebars-to-HubL conversion rules, and the complete field type mapping.
weight: 1
image: hero-effects
menuTitle: "Transpiler Pipeline"
metaTitle: "HubSpot Transpiler Pipeline | SS&C Design System"
metaDescription: "Full reference for the handoff-hubspot transpiler: CLI commands, HubL conversion rules, and field type mappings."
enabled: true
wide: false
menu:
---

## Installation

```bash
npm install -g handoff-hubspot
```

Requires Node 20 and a running Handoff instance reachable over HTTP.

## Configuration

Run the interactive wizard to create `handoff.config.json` in the current directory:

```bash
handoff-hubspot config
```

### Configuration reference

<table class="table table-sm">
<thead><tr><th>Key</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>url</code></td><td>string</td><td><code>https://localhost:3000/api/</code></td><td>Base URL of the Handoff API</td></tr>
<tr><td><code>modulesPath</code></td><td>string</td><td><code>modules</code></td><td>Directory where <code>.module</code> folders are written</td></tr>
<tr><td><code>cssPath</code></td><td>string</td><td><code>css/uds.css</code></td><td>Output path for the shared CSS bundle</td></tr>
<tr><td><code>jsPath</code></td><td>string</td><td><code>js/uds.js</code></td><td>Output path for the shared JS bundle</td></tr>
<tr><td><code>modulePrefix</code></td><td>string</td><td><code>UDS:</code></td><td>Prefix prepended to each module label in HubSpot</td></tr>
<tr><td><code>moduleCSS</code></td><td>boolean</td><td><code>true</code></td><td>Write per-module CSS; <code>false</code> writes a blank stub</td></tr>
<tr><td><code>moduleJS</code></td><td>boolean</td><td><code>false</code></td><td>Write per-module JS; <code>false</code> writes a blank stub</td></tr>
<tr><td><code>username</code></td><td>string</td><td><code>""</code></td><td>HTTP Basic Auth username (if Handoff instance is protected)</td></tr>
<tr><td><code>password</code></td><td>string</td><td><code>""</code></td><td>HTTP Basic Auth password</td></tr>
<tr><td><code>import</code></td><td>object</td><td><em>absent</em></td><td>Per-type / per-component import rules (see below)</td></tr>
</tbody>
</table>

## CLI commands

```bash
handoff-hubspot list
```
Lists all components available from the Handoff API.

```bash
handoff-hubspot docs [component-id]
```
Opens the Handoff documentation page for a component in the browser.

```bash
handoff-hubspot validate [component-id]
handoff-hubspot validate:all
```
Runs validation against every component (or just one). No files are written. Exits
with a non-zero code if any component has errors.

```bash
handoff-hubspot fetch [component-id] [--force]
handoff-hubspot fetch:all [--force]
```
Validates, transpiles, and writes the `.module` folder(s). Without `--force`, the
entire run aborts on the first validation error.

```bash
handoff-hubspot styles
```
Fetches the shared `main.css` bundle from the Handoff API and writes it to `cssPath`.

```bash
handoff-hubspot scripts
```
Fetches the shared `main.js` bundle from the Handoff API and writes it to `jsPath`.
Skipped automatically when `moduleJS: true`.

## Import configuration

The `import` key controls which components are included and how they are built.

```json
{
  "import": {
    "element": false,
    "block": {
      "hero_chart": false
    },
    "data": {
      "bar_chart": {
        "target_property": "data",
        "mapping_type": "xy",
        "js": true
      }
    }
  }
}
```

<table class="table table-sm">
<thead><tr><th>Config value</th><th>Effect</th></tr></thead>
<tbody>
<tr><td><code>import.{type}: false</code></td><td>Skip all components of that type</td></tr>
<tr><td><code>import.{type}: true</code> (or absent)</td><td>Import all components of that type normally</td></tr>
<tr><td><code>import.{type}: { id: false }</code></td><td>Import all except those set to <code>false</code></td></tr>
<tr><td><code>import.{type}: { id: { type: "hubdb", ... } }</code></td><td>Import with HubDB data mapping</td></tr>
<tr><td><code>import.{type}: { id: { js: true } }</code></td><td>Fetch per-component JS even when <code>moduleJS: false</code></td></tr>
<tr><td><code>import.{type}: { id: { css: true } }</code></td><td>Fetch per-component CSS even when <code>moduleCSS: false</code></td></tr>
</tbody>
</table>

## Validation rules

Validation runs before transpilation. Components that fail with **errors** are not
built unless `--force` is passed. **Warnings** are surfaced but never block the build.

### Module-level errors

- `code`, `title`, `tags`, `categories`, and `properties` must all be present and non-empty
- `categories` values must be one of: `blog`, `body_content`, `commerce`, `design`,
  `functionality`, `forms_and_buttons`, `media`, `social`, `text`

### Field-level errors

- Every field must have a valid `type`, a `name`, and `rules.required` set to a boolean
- `text` and `number` fields must declare `rules.content` (with `min` and `max`)
- `image` fields must declare `rules.dimensions.min` (with `width` and `height`)
- `link` defaults must include `href` and `text`; `button` defaults must include `url` and `label`
- `select` fields must provide an `options` array
- `array` fields must declare `rules.content`, `items`, and `items.type`
- `object` fields must declare a `properties` map

### Warnings (non-blocking)

- Missing `description` or `default` on any field
- Missing `rules` block on any field

## Handlebars → HubL transpilation

The transpiler converts Handlebars source to HubL by walking the template AST.

### Namespace

All `properties.*` references are rewritten to `module.*`:

```handlebars
{{properties.headline}}  →  {{ module.headline }}
```

Inside `{{#each}}` loops, `this` becomes the loop variable:

```handlebars
{{#each properties.items}}
  {{this.label}}
{{/each}}
```
becomes:
```hubl
{% for item_i in module.items %}
  {{ item_i.label }}
{% endfor %}
```

Loop metadata variables:

<table class="table table-sm">
<thead><tr><th>Handlebars</th><th>HubL</th></tr></thead>
<tbody>
<tr><td><code>@index</code></td><td><code>loop.index</code> (1-based)</td></tr>
<tr><td><code>@first</code></td><td><code>loop.first</code></td></tr>
<tr><td><code>@last</code></td><td><code>loop.last</code></td></tr>
</tbody>
</table>

### Conditionals

```handlebars
{{#if properties.show_cta}}
  <a href="...">Click</a>
{{else}}
  <span>No CTA</span>
{{/if}}
```
becomes:
```hubl
{% if module.show_cta %}
  <a href="...">Click</a>
{% else %}
  <span>No CTA</span>
{% endif %}
```

`{{#unless}}` becomes `{% unless %}...{% endunless %}`.

### Type-aware variable output

The transpiler uses the property schema to decide how each variable is rendered.
For `link` and `button` properties:

<table class="table table-sm">
<thead><tr><th>Handlebars sub-path</th><th>HubL output</th></tr></thead>
<tbody>
<tr><td><code>properties.cta.href</code> or <code>.url</code></td><td><code>module.cta_url.href|escape_attr</code></td></tr>
<tr><td><code>properties.cta.label</code> or <code>.text</code></td><td><code>module.cta_text</code></td></tr>
<tr><td><code>properties.cta.target</code></td><td><code>module.cta_url.type == 'EXTERNAL'</code></td></tr>
</tbody>
</table>

For `image` properties:

```handlebars
<img src="{{properties.hero_img.src}}" alt="{{properties.hero_img.alt}}">
```
becomes:
```hubl
<img src="{{ module.hero_img.src }}" alt="{{ module.hero_img.alt }}">
```

### Menu fields

`{{#field properties.nav}}` injects the HubL menu lookup and redirects subsequent
`{{#each}}` to iterate `.children`:

```handlebars
{{#field properties.nav}}
  {{#each properties.nav}}
    <li>{{this.label}}</li>
  {{/each}}
{{/field}}
```
becomes:
```hubl
{# field properties.nav type="menu" #}
{% set menu_xxxxx = menu(module.nav) %}
{% for item_n in menu_xxxxx.children %}
  <li>{{ item_n.label }}</li>
{% endfor %}
{# end field #}
```

## Field type mapping

Each Handoff property type maps to one or more entries in `fields.json`:

<table class="table table-sm">
<thead><tr><th>Handoff type</th><th>HubSpot field(s)</th></tr></thead>
<tbody>
<tr><td><code>text</code></td><td><code>text</code></td></tr>
<tr><td><code>richtext</code></td><td><code>richtext</code></td></tr>
<tr><td><code>number</code></td><td><code>number</code> (with <code>min</code>, <code>max</code>, <code>step: 1</code>)</td></tr>
<tr><td><code>boolean</code></td><td><code>boolean</code> (checkbox display)</td></tr>
<tr><td><code>select</code></td><td><code>choice</code> (with choices array)</td></tr>
<tr><td><code>image</code></td><td><code>image</code> (responsive, lazy-loaded, with dimension constraints)</td></tr>
<tr><td><code>icon</code></td><td><code>text</code></td></tr>
<tr><td><code>link</code></td><td><code>{key}_url</code> (url type) + <code>{key}_text</code> (text type)</td></tr>
<tr><td><code>button</code></td><td><code>{key}_url</code> (url type) + <code>{key}_text</code> labeled "Label"</td></tr>
<tr><td><code>url</code></td><td><code>url</code> (all link types supported)</td></tr>
<tr><td><code>video_file</code></td><td><code>{key}</code> (file) + <code>{key}_title</code> (text)</td></tr>
<tr><td><code>video_embed</code></td><td><code>{key}</code> (embed URL text) + <code>{key}_title</code> + <code>{key}_poster</code> (image)</td></tr>
<tr><td><code>menu</code></td><td><code>menu</code></td></tr>
<tr><td><code>array</code></td><td><code>group</code> with <code>occurrence</code> (min/max); children built recursively</td></tr>
<tr><td><code>object</code></td><td><code>group</code>; children built recursively</td></tr>
</tbody>
</table>

## Module output structure

Each component produces a folder at `{modulesPath}/{id}.module/`:

```
hero-banner.module/
├── module.html    # HubL template
├── module.css     # Component CSS (or blank stub)
├── module.js      # Component JavaScript (or blank stub)
├── meta.json      # HubSpot module metadata
└── fields.json    # HubSpot field definitions
```

`module.html` opens with a metadata comment block:

```hubl
{#
  title: Hero Banner
  description: A full-width hero with headline and CTA
  group: Marketing
  version: 1.4.2
  last_updated: 2026-03-01T00:00:00.000Z
  link: https://demo.handoff.com/system/component/hero-banner
#}
```

Navigation components (group `"Navigation"`) are automatically marked `global: true`
in `meta.json`.

## HubDB data mapping

Chart components can be configured to pull data from a HubDB table instead of
requiring manual data entry. Add a `type: "hubdb"` entry under `import`:

```json
{
  "import": {
    "data": {
      "bar_chart": {
        "target_property": "data",
        "mapping_type": "xy",
        "js": true
      },
      "category_breakdown_chart": {
        "target_property": "data",
        "mapping_type": "multi_series",
        "js": true
      }
    }
  }
}
```

<table class="table table-sm">
<thead><tr><th><code>mapping_type</code></th><th>Use case</th></tr></thead>
<tbody>
<tr><td><code>"xy"</code></td><td>Two-column data (X axis + single Y series) — bar charts, line charts</td></tr>
<tr><td><code>"multi_series"</code></td><td>Multiple named series with shared categories — stacked/grouped charts</td></tr>
</tbody>
</table>

The transpiler automatically:
1. Adds a **Data Source** choice field (`Query Builder` / `Manual Data`)
2. Injects a **Query Config** field group (table selector, column mappings, sort, limit)
   visible only when Query Builder is selected
3. Gates the original data array field to appear only when Manual Data is selected
