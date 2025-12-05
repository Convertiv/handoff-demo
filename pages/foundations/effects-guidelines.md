---
title: Effect Guidelines
description: |
  How to use effects (shadows) in your designs to create a consistent and accessible experience.
weight: 10
image: hero-design
metaTitle: ""
metaDescription: ""
enabled: true
--- 


## Effect Use Guidelines

Effects like shadows, inlays, blurs, and overlays provide depth, focus, and hierarchy within designs. When used thoughtfully, they enhance the user experience by improving clarity and reinforcing brand identity. Please observe the following guidelines when applying effects:

### Purposeful Use

- Use effects to communicate elevation, interactivity, or separation between elements—not as decoration.
- Effects should direct attention and improve usability, not create distraction or visual clutter.

### Shadows

- Use standardized shadow styles across products for consistency.
- Shadows can indicate elevation or interactivity (e.g., raised buttons, modal dialogs).
- Keep shadows subtle: prefer soft, well-blurred shadows with low opacity. Avoid harsh, dark, or multiple-heavy shadow layers.
- For accessibility, ensure that shadows alone are not used to indicate state or meaning.

**Example Shadow Styles**
- **Level 1 (Subtle):** Small cards, containers (e.g., 0 1px 4px rgba(0,0,0,0.04))
- **Level 2 (Medium):** Floating panels, dropdowns (e.g., 0 2px 8px rgba(0,0,0,0.08))
- **Level 3 (Strong):** Modals, dialogs (e.g., 0 4px 16px rgba(0,0,0,0.12))

### Inlays & Inner Shadows

- Use carefully to indicate inset elements or pressed states (e.g., input fields, toggles).
- Inner shadows/inlays should be subtle and never overpower the core UI.

### Blurs & Overlays

- Use background blurs for surfaces layers, modals, or navigation sheets to indicate depth behind active content.
- Overlay effects (with subtle blur and alpha transparency) can help direct user focus during modal or dialog states.
- Avoid excessive blur, as it may reduce performance or legibility.

### Layer Hierarchy

- Effects should align with the overall elevation system; higher layers receive stronger or larger effects.
- Maintain a logical progression (base, raised, overlay, etc.) so users can intuitively register relationships.

### Accessibility

- Don't rely on effects alone to indicate interactive states—always pair with visible shape, color, or text changes.
- Ensure sufficient contrast between elements and backgrounds, even with effects applied.

### Don'ts

- **Don’t** use heavy or colored shadows that clash with the interface.
- **Don’t** add shadows to text unless absolutely necessary (opt for clarity and readability).
- **Don’t** stack multiple effects on a single element without clear justification.

### Examples

#### Correct Application

> ![Consistent, subtle shadow on card](/assets/effects-guideline-card-shadow-good.png)
>
> The card uses a soft, defined shadow to indicate elevation while remaining visually balanced.

#### Incorrect Application

> ![Harsh, multi-layered shadow on button](/assets/effects-guideline-shadow-bad.png)
>
> This button shows an overly strong and dark shadow, drawing unnecessary attention and reducing legibility.

### Optimization

- Use CSS variables or design tokens for shadow and effect styles whenever possible.
- Test effects across light and dark themes for consistent appearance.

### Questions & Support

For help applying effects or if you need standardized tokens or visual assets, please contact the design team.


