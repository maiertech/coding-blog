# Design system examples

## Built with CSS

- [Tailwind CSS](/notes/design-systems/tailwind)
- [Tachyons](https://tachyons.io/)

## Built with Styled System

- [Palette (by Artsy)](https://github.com/artsy/palette)
- [Radius (by Rangle)](https://github.com/rangle/radius)
- [Radix (by Modulz)](https://github.com/modulz/radix)

## Built with Theme UI

### Reflex

On 18 June 2020 [archadcn](https://twitter.com/arshadcn) dropped
[Reflex](https://reflexjs.org/). This is a design system for Gatsby, a
collection packages and Gatsby themes that use Theme UI under the hood.

At the center is a component library with atoms named after HTML tags. Styling
is done via props, but the syntax is custom and deviates from Styled System. He
uses these components to build more complex blocks.

Prior art is his
[gatsby-theme-flex](https://github.com/arshad/gatsby-themes/tree/master/themes/gatsby-theme-flex)
in which he allows creating blocks inside Markdown files. This project relies
heavily on shadowing.
