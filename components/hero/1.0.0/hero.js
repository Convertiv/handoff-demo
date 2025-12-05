/** @type {import('handoff-app').Component} */
module.exports = {
  "id": "hero",
  "title": "Hero",
  "description": "A banner alert component to display important information to users. This is a bold, highly visible component that can be used to draw attention to important information. \n\nIt includes a call to action button to direct users elsewhere.  Because of the high visiblity, the CTA is required.",
  "type": "block",
  "group": "Hero",
  "entries": {
    "js": "./script.js",
    "template": "./template.hbs",
    "scss": "./style.scss"
  },
  "tags": [
    "banner",
    "alert",
    "notification"
  ],
  "should_do": [
    "Use this component to draw attention to important information",
    "Use this component to direct users to take action"
  ],
  "should_not_do": [
    "Do not use this without a call to action",
    "Avoid long messages. Limit yourself to one or two lines of text"
  ],
  "previews": {
    "generic": {
      "title": "Generic",
      "values": {
        "theme": "dark",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "paragraph": "Nullam auctor, nunc nec ultricies.",
        "video": "https://handoff.com/videos/cli.mp4"
      }
    },
    "live": {
      "title": "Live Site",
      "values": {
        "theme": "dark",
        "title": "Integrate Figma design tokens into your development workflow",
        "paragraph": "From Figma to Code to Docs",
        "video": "https://handoff.com/videos/cli.mp4"
      }
    }
  },
  "properties": {
    "theme": {
      "name": "Theme",
      "description": "This is the theme of the hero component, in light or dark mode.",
      "type": "text",
      "default": "dark",
      "enum": [
        "dark",
        "light"
      ],
      "rules": {
        "required": true,
        "content": {
          "min": 1,
          "max": 10
        }
      }
    },
    "title": {
      "name": "Title",
      "description": "This is the title of the hero component",
      "type": "text",
      "default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "rules": {
        "required": true,
        "content": {
          "min": 1,
          "max": 100
        }
      }
    },
    "paragraph": {
      "name": "Paragraph",
      "description": "This is the paragraph of the hero component",
      "type": "text",
      "default": "Nullam auctor, nunc nec ultricies.",
      "rules": {
        "required": true,
        "content": {
          "min": 1,
          "max": 1000
        }
      }
    },
    "video": {
      "name": "Video",
      "description": "This should be the video URL of the hero component",
      "type": "text",
      "default": "https://handoff.com/videos/cli.mp4",
      "rules": {
        "required": true,
        "content": {
          "min": 1,
          "max": 1000
        }
      }
    }
  }
};
