# Theme UI

https://theme-ui.com/

- [Discovering Theme UI](https://laurieontech.com/posts/discovering-theme-ui/)
- [Motivation](https://theme-ui.com/guides/motivation/)
- [Recipes](https://theme-ui.com/recipes/)
- [@theme-ui/sidenav](https://theme-ui.com/packages/sidenav)
- [Design System Playground](https://design-system-playground.netlify.app/)
  (powered by Theme UI)

## Styles

For [Theme UI components](https://theme-ui.com/components) there are four
sources of styles:

1. Base styles from internal `_css` prop.
1. Styles from variants (with Styled System support).
1. Styles from `sx` prop (with Styled System support).
1. Styles from `css` prop (Emotion CSS prop).

Every item trumps the previous item, i.e., variant styles are overwritten by
`sx` styles, which are overwritten by `css` prop styles. This is all implemented
in the
[`Box`](https://github.com/system-ui/theme-ui/blob/master/packages/components/src/Box.js)
component.

## How to use variants in a component library

Components should not rely on variants in a theme. They should render without
applying a theme at all through defaults. At the same time, components should be
customizable.

In Theme UI's components such as the `Container` component, defaults are set
with the `_css` prop on `Box`. `Box` is the universal building block used for
every single Theme UI component. In the example of `Container`, you cannot
provide a `_css` prop to override the default styles. They can only be
overridden through variants, `sx` or Emotion's `css` prop.

The best way to implement a component library is as described here:
https://theme-ui.com/guides/layouts. Default styles are self contained within
`sx` props and can be augmented with optional variants.

```
sx={
  // some styles
  variant="some.variant"
  // some more styles
}
```

Define variant `some.variant` in your theme to augment defined styles. Anything
below the `variant` prop takes precedence and cannot be overridden. Anything
above the `variant` prop in the `sx` prop can be overridden. You can apply any
other styles in your variant.
