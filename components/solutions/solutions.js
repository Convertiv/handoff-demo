/** @type {import('handoff-app').Component} */
module.exports = {
  "id": "solutions",
  "title": "Solutions",
  "description": "A banner alert component to display important information to users. This is a bold, highly visible component that can be used to draw attention to important information. \n\nIt includes a call to action button to direct users elsewhere.  Because of the high visiblity, the CTA is required.",
  "image": "/images/components/solutions.png",
  "type": "block",
  "group": "Sections",
  "entries": {
    "js": "./script.js",
    "template": "./template.hbs",
    "scss": "./style.scss"
  },
  "tags": [
    "tabs",
    "solutions",
    "video",
    "media"
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
        "title": "Handoff is a set of tools for design system engineers",
        "description": "Use them together to fully integrate Figma design tokens into your development workflow, or use them separately as point solutions to specific workflow problems.",
        "items": [
          {
            "title": "Figma Plugin",
            "video": "https://handoff.com/videos/plugin.mp4",
            "paragraph": "<p>Use the Handoff Figma plugin to annotate and mark Figma components that are ready to be integrated into your project.</p>",
            "buttons": [
              {
                "label": "Install the Figma plugin →",
                "url": "https://handoff.com/docs/overview/quickstart"
              }
            ]
          },
          {
            "title": "Command Line Interface (CLI)",
            "video": "https://handoff.com/videos/cli.mp4",
            "paragraph": "<p>Get started by installing Handoff via npm:</p> <pre><code>npm install handoff-app -g</code></pre><p>Once the CLI is installed, use it to <code>fetch</code>, <code>build</code>, and <code>serve</code> your design system. </p>",
            "buttons": [
              {
                "label": "Handoff CLI  documentation →",
                "url": "https://handoff.com/docs"
              },
              {
                "label": "Handoff on Github →",
                "url": "https://github.com/Convertiv/handoff-app"
              }
            ]
          },
          {
            "title": "Design system docs",
            "video": "https://handoff.com/videos/docs.mp4",
            "paragraph": " <p>Handoff generates a documentation site from your design system tokens with every<code>fetch</code> , which means your team’s source-of-truth never gets stale.</p><pre><code>handoff-app start<br># localhost:3000</code></pre>",
            "buttons": [
              {
                "label": "Live example →",
                "url": "https://demo.handoff.com/"
              }
            ]
          }
        ]
      }
    }
  },
  "properties": {
    "background": {
      "name": "Background Color",
      "description": "The background color of the alert",
      "type": "select",
      "options": [
        {
          "label": "Vibrant Green",
          "value": "vibrant-green"
        },
        {
          "label": "Deep Green",
          "value": "deep-green"
        },
        {
          "label": "Vibrant Orange",
          "value": "vibrant-orange"
        },
        {
          "label": "Deep Orange",
          "value": "deep-orange"
        },
        {
          "label": "Vibrant Purple",
          "value": "vibrant-purple"
        },
        {
          "label": "Deep Purple",
          "value": "deep-purple"
        },
        {
          "label": "Vibrant Teal",
          "value": "vibrant-teal"
        },
        {
          "label": "Deep Teal",
          "value": "deep-teal"
        }
      ],
      "default": "vibrant-green",
      "rules": {
        "required": true
      }
    },
    "foreground": {
      "name": "Foreground Color",
      "description": "The foreground color of the alert",
      "type": "select",
      "options": [
        {
          "label": "Vibrant Green",
          "value": "vibrant-green"
        },
        {
          "label": "Deep Green",
          "value": "deep-green"
        },
        {
          "label": "Vibrant Orange",
          "value": "vibrant-orange"
        },
        {
          "label": "Deep Orange",
          "value": "deep-orange"
        },
        {
          "label": "Vibrant Purple",
          "value": "vibrant-purple"
        },
        {
          "label": "Deep Purple",
          "value": "deep-purple"
        },
        {
          "label": "Vibrant Teal",
          "value": "vibrant-teal"
        },
        {
          "label": "Deep Teal",
          "value": "deep-teal"
        }
      ],
      "default": "deep-green",
      "rules": {
        "required": true
      }
    },
    "light": {
      "name": "Light Mode",
      "description": "Whether the alert is in light mode",
      "type": "boolean",
      "default": false,
      "rules": {
        "required": true
      }
    },
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
  }
};
