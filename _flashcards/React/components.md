# Components

Nomenclature for components:

- componets (atoms)
- fragments (composed of atoms)
- layouts (composed of fragments and atoms)
- pages

# Good stuff

- styled-components
- styled-system
- Storybook:
  - https://github.com/hichroma/learnstorybook.com
  - https://github.com/hichroma/learnstorybook-code
- Priceline Design system:
  - https://pricelinelabs.github.io/design-system/
  - https://pricelinelabs.github.io/design-system/storybook/
- Advanced: withSpectrum

Give entry point to each component in component library.

# How to get components right

3 things should be supported:

- Normalize to ensure same clean slate for styles across all browsers.
- Colors: define color scheme with semantic meaning
- Typography: get font styles right and allow components to be customized with
  Typography

Options are: polished, typography.js, rebass.

Using fonts requires global CSS to load fonts. The question is how to load that
global CSS. The other question is how to generate the CSS that needs to be
loaded.

- Load normalize.css via `injectGlobal` using polished.
- In storybook you can run `injectGlobal` in `config.js`.
- In Gatsby use `injectGlobal` in a pseudo components that you import wherever
  you need the global styles. The import code is executed once only.

For Typography stick with typography.js. Load required fonts via typeface-bla
locally. Webpack does the heavy lifting behind the scenes. THen follow Gatsby
examples with typeface usage.

Do not do the font-face declaration with polished. You get the declarations for
free via typeface-bla packages. The elegance of this approach is that Webpack
copies the files you need and fonts can be managed via npm.

Typography has solved the problem of adding global code in gatsby. You can set
the normalize flag to also include normalize.css. No need to use injectGlobal.

In storybooks probably done in config.js.

Something like styled-system does not solve the problem of how to load the
fonts. It assumes that fonts are loaded and just uses them.

## State management

The naive approach is to let components manage some state and push up changes to
components higher up in the tree via callbacks. But this has drawbacks. E.g. if
you write a FetchDropdown that executes a fetch API call during
componentDidMount then you run into 2 problems:

1. State changes can happen after the component was unmounted and then you get a
   warning in the console.
2. The component is hard to test because you so not know when setState has been
   completed. You can't get you fingers on that information. E.g.
   https://github.com/airbnb/enzyme/issues/346 assumes that setState gets
   executed instantly. But that may not be the case. Tests may not be
   consistent.

The solution is: do not use component state but outsource state mangement.

A component library should contain only dumb components, may be with the
exception of some trivial component state. State management is application
specific and dumb components react to state changes in the state mangement
solution.

then you can unit test state changes and components separately and do not need
to mix them in unit tests.

State should live completely outside react!

## Styling components

Or which library to use: Rebass vs reactackle.
