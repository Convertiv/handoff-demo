/** @type {import('handoff-app').Config} */
const path = require("path");
const { validateComponent } = require("./build/validate.handoff");
module.exports = {
  figma_project_id: "IGYfyraLDa0BpVXkxHY2tE",
  exportsOutputDirectory: "exported",
  sitesOutputDirectory: "out",
  app: {
    theme: "default",
    title: "Handoff Design System",
    client: "Acme Corporation",
    google_tag_manager: null,
    attribution: true,
    type_copy: "That roadrunner can't outrun this coyote. I'll get him next time.",
    type_sort: [
      "Heading 1",
      "Heading 2",
      "Heading 3",
      "Heading 4",
      "Heading 5",
      "Heading 6",
      "Paragraph",
      "Subheading",
      "Blockquote",
      "Input Labels",
      "Link",
    ],
    color_sort: ["primary", "secondary", "extra", "system"],
    component_sort: ["primary", "secondary", "transparent"],
    base_path: "",
    breakpoints: {
      sm: { size: 576, name: "Small" },
      md: { size: 769, name: "Medium" },
      lg: { size: 1254, name: "Large" },
    },
  },
  entries: {
    scss: "./sass/main.scss",
    js: "./js/main.js",
    bundle: "./js/main.js",
    components: [
      './components',
      'components/select',
      'components/radio',
      'components/badge',
      'components/modal',
      'components/tooltip',
      'components/switch',
    ],
  },
  logo: "base-horizontal.svg",
  assets_zip_links: {
    icons: null,
    logos: null,
  },
  hooks: {
    cssBuildConfig: async (config) => {
      config.css.preprocessorOptions.scss.silenceDeprecations = [
        "import",
        "legacy-js-api",
        "slash-div",
        "color-functions",
        "global-builtin",
      ];
      let resolve = { alias: {} };
      if (config.resolve?.alias) {
        resolve.alias = config.resolve.alias;
      }
      resolve.alias["@public"] = path.resolve(__dirname, "public");
      resolve.alias["@export"] = path.resolve(__dirname, "exported", 'IGYfyraLDa0BpVXkxHY2tE');
      config.resolve = resolve;
      return config;
    },
    validateComponent: validateComponent,
  },
};
