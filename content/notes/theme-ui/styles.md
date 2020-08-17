# Styles

## Theme UI components

For [Theme UI components](https://theme-ui.com/components) there are four
sources of styles:

1. Base styles from internal `_css` prop.
1. Styles from variants (with Styled System support).
1. Styles from `sx` prop (with Styled System support).
1. Styles from `css` prop (Emotion CSS prop).

Every source of styles takes precedence over the previous source in the CSS
cascade, i.e., variant styles are overwritten by `sx` styles, which are
overwritten by `css` prop styles. This is all implemented in the
[`Box`](https://github.com/system-ui/theme-ui/blob/master/packages/components/src/Box.js)
component.

You can use `variant` within `sx` and all styles defined before `variant` can be
overwritten by this variant and all styles defined after `variant` cannot be
overwritten by this variant.

## ThemeProvider

[`ThemeProvider`](https://github.com/system-ui/theme-ui/blob/v0.3.1/packages/theme-provider/src/index.js)
adds
[some global styles](https://github.com/system-ui/theme-ui/blob/f6380fc356ce97e64bf50ba60e0bc6f38a25dabe/packages/theme-provider/src/index.js#L15-L21)
and variant `styles.root`. The global styles can be fine-tuned with
[configuration flags](https://theme-ui.com/theming/#configuration-flags). Global
styles are also added when `ThemeProvider` is used indirectly, e.g. via
[`gatsby-plugin-theme-ui`](https://github.com/system-ui/theme-ui/tree/master/packages/gatsby-plugin-theme-ui).
