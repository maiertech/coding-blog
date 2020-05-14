# Packages

## Modules

When writing packages for NPM, you need to understand at least two types of
modules:

- CommonJS modules (current default)
- ES modules (future default)

### CommonJS modules (`cjs`)

[JavaScript Modules: From IIFEs to CommonJS to ES6 Modules](https://www.youtube.com/watch?v=qJWALEoGge4)

- Each file is a module by default.
- Anything exposed with `module.exports` can be imported using `require`. The
  `module` object is provided by Node.
- In general, the thing exposed is a function and there is only a single value
  exposed per module.
- You could also expose an object with multiple props. But the correct way to
  expose multiple things is via `exports`. The `exports` object is a reference
  to the `exports` prop on `module`.
- CommonJS modules are loaded synchronously and are therefore not suitable for
  browsers. Module bundlers can help make modules load asynchronously in
  browsers.
- In newer codebases you should not use `require` syntax. For
  [tree shaking](https://webpack.js.org/guides/tree-shaking/) to work, bundlers
  analyze the static module structure of `import` and `export` statements.

### ES modules (`esm`)

[ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

- With ES modules you need to create a graph of instances in 3 steps:
  1. **Construction:** find, download and parse files. Build module records and
     module map.
     1. _Module resolution:_ where is the module located?
     1. _Fetch:_ download or load from file system. Browsers currently support
        URLs as module specifier only.
     1. _Parse:_ figure out imports and exports and create a module record, then
        put module record in a module map using the module specifier as key
        (similar to how Webpack does this).
  1. **Instantiation:** find boxes in memory for exported values, then link
     imports and exports to these boxes. Create module graph.
  1. **Evaluation:** evaluate boxes with actual values.
- In browsers you load the first module with a script tag:
  `<script src="main.js" type="module" />`. But then what module specifiers
  should you use inside `main.js` so a browser still knows what to do? You still
  need a [bundler](/notes/dev/bundlers).
- Starting with v12, Node supports ES modules. Module specifiers point to files.

## Props in `package.json`

| Prop     | Value        | Description                                                                                                                                                                                      |
| :------- | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `main`   | path to file | Entry point for CommonJS and ES modules packages.                                                                                                                                                |
| `module` | path to file | `module` is an inofficial prop in `package.json` that signals that a package is an ES module. It is honored by [Rollup](https://rollupjs.org/guide/en/) and [Webpack](https://webpack.js.org/)). |
| `type`   | `module`     | Signals that this package should be interpreted as ES module. This is the carte blanche approach. If you want to do file by file yuo need to work with the `.mjs` extension.                     |

## Tooling to create NPM packages

If you write your own NPM package, you should support at least CommonJS and ES
modules. Your `package.json` needs to have a `main` entry point for CommonJS and
a `module` entry point for ES modules. These are your tooling options:

### No tooling

This is only an option if your package is not supposed to be used in browsers.
This is because when writing your package, module specifiers are file names that
cannot be resolved by browsers. As long as you use Node v12 or higher and
[supported ES2020 features](https://node.green/), you do not need to use
[Babel](https://babeljs.io/) and can roll without any tooling.

### Rollup

[Rollup](https://rollupjs.org/guide/en/)

### Microbundle

If you want to use the benefits of rollup.js with less configuration hassle, you
can use [Microbundle](https://github.com/developit/microbundle).

Microbundle supports multiple distributions generated into the `dist` folder.
You can assign them to different entry points, eg `main` for the CommonJS
distribution or `module` for the ES module distribution.

The downside seems to be that the CommonJS distribution is bundled.

### Webpack

[Authoring libraries](https://webpack.js.org/guides/author-libraries/)

### @pika/pack

Package build pipeline.

## Caveats

If you require CommonJS modules from an ES module distribution, named imports do
not work. The workaround is using package
[`esm`](https://www.npmjs.com/package/esm).
