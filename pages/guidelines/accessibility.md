---
title: Accessibility
description: |
  Handoff recognizes the importance of providing a website that is inclusive and
  available for all user groups. Accessibility improves the experience for 
  everyone. There are legal requirements to provide accessible interfaces, but 
  the value of those interfaces to all of our customers goes beyond the legal 
  requirements. Making our sites accessible to all users is a key part of our 
  commitment to providing a positive user experience.
weight: 0
image: hero-design
menuTitle: "Accessibility"
metaTitle: "Accessibility | Handoff Design System"
metaDescription: "This page defines the accessibility rules for Handoff web properties."
enabled: true
wide: false
menu:
---

import { Eye } from "lucide-react";
import { Hero } from "handoff-app/src/app/components/Hero";
import CardsWithIcons from "handoff-app/src/app/components/cards/CardsWithIcons";

## What should we be looking for?

When reviewing a site for accessibility, consider the following questions:

- How quickly can you understand the main points of the page?
- Is our site easy to navigate? Could you do it with just a keyboard?
- Is the text easy to read? Is there enough contrast?
- Are graphics and images clear and easy to understand? Can you understand them without seeing them?
- Are forms easy to fill out? Can you understand the error messages?
- Can you understand the structure of the page? Can you tell where you are on the page?

## Compliance Standards

Handoff strives to meet the current, agreed on best practice in accessibility,
while recognizing that this is an ongoing effort, not a simple task.

Handoff web properties should follow the guidelines provided in the [WCAG 2.2, Level AA](https://www.w3.org/TR/WCAG21/)

At the highest level, the WCAG 2.2 standard calls for sites to meet standards
in 4 areas -

<CardsWithIcons
  items={[
    {
      title: "Perceivable",
      description: `Users need to be able to perceive the content. This covers alt text, captions, layout, contrast, and visual behaviors.`,
      icon: Eye,
      link: "https://www.w3.org/TR/WCAG21/#perceivable",
      cta: "Support Perceivable",
    },
    {
      title: "Operable",
      description: `Users need to be able to operate the site behaviors. This covers keyboard accessibility, timing issues, animation, and navigation.`,
      icon: Eye,
      link: "https://www.w3.org/TR/WCAG21/#operable",
      cta: "Support Operable",
    },
    {
      title: "Understandable",
      description: `Users need to able to understand the content and behavior. This section covers language, input validation, errors, and predictability of response.`,
      icon: Eye,
      link: "https://www.w3.org/TR/WCAG21/#understandable",
      cta: "Support Understandable",
    },
    {
      title: "Robust",
      description: `The environment needs to be robust and valid. Many of the tools used to access our sites are impaired by invalid, poorly formed, or poorly structured client code. Ensuring that the output is well formed and valid will help all our users.`,
      icon: Eye,
      link: "https://www.w3.org/TR/WCAG21/#robust",
      cta: "Support Robust",
    },
  ]}
/>

## Features

These are the features to prioritize across platforms in order
to make Handoff properties conform to our accessibility goals.

- Well defined navigation structure
- Adjustable Text Size
- Alt Text
- Heading Elements
- Link Text
- Color Contrasts
- Style Sheets
- Keyboard Accessible
- Focus indications
- Accessible data in Tables
- Skip to Main Content
