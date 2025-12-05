/** @type {import('handoff-app').Component} */
module.exports = {
  "id": "alert",
  "title": "Alert",
  "description": "A banner alert component to display important information to users. This is a bold, highly visible component that can be used to draw attention to important information. \n\nIt includes a call to action button to direct users elsewhere.  Because of the high visiblity, the CTA is required.",
  "image": "/images/components/alert.png",
  "type": "element",
  "group": "Alert",
  "entries": {
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
        "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies.",
        "button": {
          "label": "Primary CTA",
          "url": "#"
        }
      }
    }
  },
  "properties": {
    "message": {
      "name": "Message",
      "description": "The message to display in the alert",
      "type": "text",
      "default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies.",
      "rules": {
        "required": true,
        "content": {
          "min": 25,
          "max": 100
        }
      }
    },
    "button": {
      "name": "Button",
      "description": "The button to take action",
      "type": "button",
      "default": {
        "label": "Register Now",
        "url": "#"
      },
      "rules": {
        "required": true
      }
    }
  },
  "preview_options": {
    "group_by": "Type"
  },
  "options": {
    "transformer": {
      "tokenNameSegments": [
        "${component}",
        "${variant.Type}",
        "${variant.layout}",
        "${part}",
        "${property}"
      ],
      "defaults": {
        "Theme": "light",
        "Type": "primary",
        "Activity": "",
        "Layout": "",
        "Size": ""
      }
    }
  }
};
