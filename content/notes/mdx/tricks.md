# Tricks

## Importing MDX

This feature is enabled by the
[`mdx-loader`](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-mdx/loaders/mdx-loader.js)
of
[`gatsby-plugin-mdx`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx).
`mdx-loader` is a Webpack plugin that converts an MDX file into a React
component.

You can import another MDX file into an MDX file and use it as if it were a
component:

```
import AnotherFile from './another-file.mdx'

<AnotherFile />
```

You can even pass props into the imported MDX file component:

```
<AnotherFile title="Hello World!" />
```

And use access the props like this:

```
// another-file.mdx

# {props.title}

Some text.
```

You can export data from `another-file.mdx` and access it inside its parent (the
file that imports `another-file.mdx`).

```
// another-file.mdx

# Heading

Some text.

export const data someData = { key: 'value' }
```

In the parent file you can do this import:

```
import AnotherFile, { someData } from './another-file.mdx'

{someData.key}
```
