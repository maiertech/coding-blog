# Bundlers

There are two main reasons why you would want to use a bundler:

1. being able to use NPM packages,
1. production code optimization.

Watch
[Unbundling the Jamstack by Chris Biscardi](https://www.youtube.com/watch?v=wtIsCBrXluI)
for an overview of how module systems and bundler are related.

## Snowpack

[Introduction to Snowpack (version 1)](https://www.youtube.com/watch?v=nbwt3A9RzNw)

- Bundles dependencies only.
- Dependencies have to be ES modules.
- Does not bundle source code, images or CSS. If you need these features, you
  need a traditional bundler such as Parcel.
- Bundling happens only after you installed or modified dependencies. In version
  2 this happens transparently when running the dev server.
- Snowpack is just a smart Rollup configuration. Therefore, it can handle shared
  dependencies or peer dependencies.
- Snowpack support technologies such as Babel and TypeScript.
- Even when using Snowpack you should use a traditional bundler for production
  optimization.

The [Pika registry](https://www.pika.dev/registry) tries simplify using NPM for
web development. All packages on the Pika registry are from NPM but only the
ones that are compatible with ES modules. The Pika registry allows importing
from a URL, even in production.

When using Snowpack with a simple web projects, it's benefits do not outweigh
the learning curve. It seems a good strategy to observe the Snowpack space and
it still makes a lot of sense to invest into learning a bundler.

## Parcel

[Introduction to Parcel](https://www.youtube.com/watch?v=b-6BeS-22yw&t=)

[Parcel](https://parceljs.org/) is probably the easiest to use bundler. It has
good docs and is also suitable for simple web projects. Provided that Snowpack
is in its early days, it still makes sense to learn Parcel if you do not want to
learn Webpack or Rollup.

## Rollup and Webpack

[Webpack and Rollup: the same but different](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c)
