---
title: Grid
description: |
  Handoff uses the Bootstrap grid system to create responsive layouts. The grid 
  system is based on a 12 column layout. This allows you to create layouts that 
  adapt to different screen sizes and devices.
weight: 12
image: hero-components
menuTitle: "Grid"
metaTitle: "Grid | Handoff Design System"
metaDescription: "Sets of recommendations on how to apply design principles to provide a positive user experience."
enabled: true
menu:
---


## Breakpoints

The Bootstrap grid system is based on a 12 column layout. The grid system is
responsive and adapts to different screen sizes and devices. The grid system
uses the following breakpoints:

- **Extra small**: < 576px
- **Small**: ≥ 576px
- **Medium**: ≥ 768px
- **Large**: ≥ 992px
- **Extra large**: ≥ 1200px

## Variables

To facilitate this, in the Handoff SASS code, we declare two variables that define the breakpoints:

```scss
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
);

// Grid containers
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1200px,
);
```

These breakpoints can be used in sass to define how a element should appear at
a responsive size. For example:

```scss
@include media-breakpoint-up(xl) {
  .h2 {
    color: green;
  }
}
```

## Grid Classes 

Bootstrap uses the following classes to define the grid layout:

- `.container`: The container class is used to create a fixed-width container.
- `.container-fluid`: The container-fluid class is used to create a full-width container.
- `.row`: The row class is used to create a row of columns.
- `.col-*`: The col-_ class is used to define the width of a column. The _ is a number between 1 and 12 that defines the width of the column.

For more information, see the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/layout/grid/).
