/** @type {import('handoff-app').Component} */
module.exports = {
  "id": "parallax",
  "title": "Parallax",
  "description": "A parallax scrolling section with a fixed background image that creates depth and visual interest. Perfect for hero sections, dividers, or call-to-action areas that need visual impact.",
  "image": "/images/components/parallax.png",
  "type": "block",
  "group": "Sections",
  "entries": {
    "template": "./template.hbs",
    "scss": "./style.scss"
  },
  "tags": [
    "parallax",
    "hero",
    "banner",
    "image",
    "background"
  ],
  "should_do": [
    "Use high-quality, large images for the best visual effect",
    "Keep text concise and readable against the background",
    "Consider using an overlay for better text contrast"
  ],
  "should_not_do": [
    "Avoid using busy images that compete with text content",
    "Don't stack multiple parallax sections consecutively",
    "Avoid small or low-resolution images"
  ],
  "previews": {
    "generic": {
      "title": "Generic",
      "values": {
        "title": "Lorem ipsum dolor sit amet",
        "subtitle": "Consectetur adipiscing elit. Nullam auctor, nunc nec ultricies.",
        "height": "large",
        "overlay": true,
        "overlay_opacity": 50,
        "image": {
          "alt": "Parallax background image",
          "src": "https://picsum.photos/seed/parallax1/1920/1080"
        },
        "button": {
          "label": "Learn More",
          "url": "#"
        }
      }
    },
    "minimal": {
      "title": "Minimal",
      "values": {
        "title": "Simple Parallax Section",
        "subtitle": "",
        "height": "medium",
        "overlay": false,
        "overlay_opacity": 0,
        "image": {
          "alt": "Minimal parallax background",
          "src": "https://picsum.photos/seed/parallax2/1920/1080"
        }
      }
    },
    "dark_overlay": {
      "title": "Dark Overlay",
      "values": {
        "title": "Explore Our Services",
        "subtitle": "Discover how we can help transform your business with innovative solutions.",
        "height": "large",
        "overlay": true,
        "overlay_opacity": 70,
        "image": {
          "alt": "Dark overlay parallax background",
          "src": "https://picsum.photos/seed/parallax3/1920/1080"
        },
        "button": {
          "label": "Get Started",
          "url": "#"
        }
      }
    },
    "nature": {
      "title": "Nature Theme",
      "values": {
        "title": "Connect with Nature",
        "subtitle": "Experience the beauty of the outdoors through our immersive experiences.",
        "height": "extra-large",
        "overlay": true,
        "overlay_opacity": 30,
        "image": {
          "alt": "Nature themed parallax background",
          "src": "https://picsum.photos/seed/nature/1920/1080"
        },
        "button": {
          "label": "Explore Now",
          "url": "#"
        }
      }
    }
  },
  "properties": {
    "title": {
      "name": "Title",
      "description": "The main heading text displayed over the parallax image",
      "type": "text",
      "default": "Lorem ipsum dolor sit amet",
      "rules": {
        "required": true,
        "content": {
          "min": 1,
          "max": 100
        }
      }
    },
    "subtitle": {
      "name": "Subtitle",
      "description": "Optional supporting text displayed below the title",
      "type": "text",
      "default": "Consectetur adipiscing elit. Nullam auctor, nunc nec ultricies.",
      "rules": {
        "required": false,
        "content": {
          "min": 0,
          "max": 200
        }
      }
    },
    "height": {
      "name": "Height",
      "description": "The height of the parallax section",
      "type": "text",
      "default": "large",
      "enum": [
        "small",
        "medium",
        "large",
        "extra-large"
      ],
      "rules": {
        "required": true
      }
    },
    "overlay": {
      "name": "Overlay",
      "description": "Whether to display a dark overlay for better text readability",
      "type": "boolean",
      "default": true,
      "rules": {
        "required": false
      }
    },
    "overlay_opacity": {
      "name": "Overlay Opacity",
      "description": "The opacity of the overlay (0-100)",
      "type": "number",
      "default": 50,
      "rules": {
        "required": false,
        "content": {
          "min": 0,
          "max": 100
        }
      }
    },
    "image": {
      "name": "Background Image",
      "description": "The background image for the parallax effect",
      "type": "image",
      "default": {
        "alt": "Parallax background image",
        "src": "https://picsum.photos/seed/parallax/1920/1080"
      },
      "rules": {
        "required": true,
        "dimensions": {
          "min": {
            "width": 1200,
            "height": 600
          },
          "max": {
            "width": 3840,
            "height": 2160
          }
        }
      }
    },
    "button": {
      "name": "Button",
      "description": "Optional call-to-action button",
      "type": "button",
      "default": {
        "label": "Learn More",
        "url": "#"
      },
      "rules": {
        "required": false
      }
    }
  },
  "preview_options": {
    "group_by": "Height"
  }
};



