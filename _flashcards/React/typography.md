# Typography and Fonts

- Styled system does not manage fonts, only font sizes.
- Rebass <Provider> takes care of fonts. It sets font-family and property for
  everything below. It also sets default theme and allows overriding theme.
- If you want to leave font management to something else you can use
  <ThemeProvide> but you loose theme defaults that Provider takes care of.
