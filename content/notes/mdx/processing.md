# MDX processing

If you write a normal app you normally want to be able to import MDX files and
have them processed on the fly:

- For Parcel there is
  [`@mdx-js/parcel-plugin-mdx`](https://mdxjs.com/getting-started/parcel).
- For Webpack there is
  [`@mdx-js/loader`](https://mdxjs.com/getting-started/webpack).

## Gatsby

See [here](/notes/gatsby/gatsby-plugin-mdx).

## Next.js

## Importing MDX files

When you import an MDX file, no matter with which bundler or framework, this
results in a component that you can use like any other react component. This MDX
component takes a `components` prop that you can use to customize the
transformation from MDX to JSX. `components` basically maps standard HTML
elements to React components that are used for rendering instead of the standard
elements.

## MDXProvider and global layout

Instead of providing `components` to each MDX component, you can use
`MDXProvider` to make a `components` mapping availalbe to MDX components via
context. You can place `MDXProvider` in your `App.js` somewhere pretty high up
in your component tree.

The `components` prop can contain a special component referred to as `wrapper`.
You can use it to apply a layout or manipulate wrapped components. The `wrapper`
receives `children` as props. You can then filter the children, e.g. select all
`h1` elements to create a table of contents. Or you just wrap everything with a
layout. See https://github.com/pomber/the-x-in-mdx.

Note that `components`
[needs to be defined as a constant and not inline](https://mdxjs.com/advanced/components#mdxprovider).

If you nest `MDXProvider`, the component contexts are merged,
[unless you use the functional form to override the merge](https://mdxjs.com/migrating/v1#mdxprovider).

## Layouts

You can use the default export in an MDX file to define a layout that overrides
the wrapper. A layout is a component that takes a `children` prop and wraps the
MDX content.
