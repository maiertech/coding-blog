# Variants

## Global styles

[`ThemeProvider`](https://github.com/system-ui/theme-ui/blob/v0.3.1/packages/theme-provider/src/index.js)
adds `styles.root` variant to `body`. You can use this variant to add global
styles via a [theme](/notes/theme-ui/themes).

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
