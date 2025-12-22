/** @type {import('handoff-app').Component} */
module.exports = {
  title: "Badge",
  description: "A badge component showing the various badge options",
  group: "Atomic Elements",
  type: "element",
  figmaComponentId: "badge",
  entries: {
    template: './badge.hbs',
    scss: './badge.scss',
  },
  properties: {
    Type: {
      name: "Type",
      description: "The type of badge",
      type: "text",
      default: "primary",
    },
    Label: {
      name: "Label",
      description: "The label of the badge",
      type: "text",
      default: "Badge",
    },
    Icon: {
      name: "Icon",
      description: "The icon of the badge",
      type: "icon",
      default: "icon-star",
    },
    Pill: {
      name: "Pill",
      description: "Whether the badge is a pill",
      type: "boolean",
      default: false,
    },
  },
  previews: {
    generic: {
      title: "Generic",
      values: {
        type: "primary",
        label: "Badge",
        icon: "icon-star",
        pill: false,
      },
    },
  },
  preview_options: {
    group_by: "Type",
  },
  preview_options: {
    group_by: "Type",
  },
};
