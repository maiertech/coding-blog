# Bundlers

Bundlers have all kinds of benefits related to production code optimization. But
the main reason for using a bundler is when you want to use NPM packages.

## Snowpack

[Introduction to Snowpack](https://www.youtube.com/watch?v=nbwt3A9RzNw)

- On new projects you should check if [Snowpack](https://www.snowpack.dev/) is
  an option.
- If you think you should use Parcel, try using Snowpack.
- Bundles dependencies only.
- Dependencies have to be ES modules.
- Does not bundle source code, images or CSS. If you need these features, reach
  for Parcel.
- You only need to bundle when you install or modify dependencies.
- Snowpack is just a smart Rollup configuration. Therefore it can handle shared
  dependencies or peer dependencies.
- Still supports Babel and TypeScript.

The [Pika registry](https://www.pika.dev/registry) tries simplify using NPM for
web development. All packages on the Pika registry are from NPM but are
compatible with ES modules. The Pika registry allows importing from a URL, even
in production.

## Parcel

[Introduction to Parcel](https://www.youtube.com/watch?v=b-6BeS-22yw&t=)

[Parcel](https://parceljs.org/) is probably the easiest to use bundler. It has
good docs and is also suitable for simple web projects. If you want to invest
into a full featured bundler but not learn Webpack or Rollup, Parcel is a great
option.

## Rollup and Webpack

[Webpack and Rollup: the same but different](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c)
