# gatsby-plugin-mdx

https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx

By default processes `.mdx` `File` nodes. You can add more extensions with the
`extensions` theme option. Also processes non-`File` nodes with media type
`text/markdown` or `text/x-markdown`. You can add more media types with the
`mediaTypes` theme option.

If you need to process a chunk of Markdown, you can create a node and set its
media type to one of the supported media types. This will trigger processing its
`internal.content` prop.

This is a great example of how to define a complex type with complex resolvers:
https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-mdx/gatsby/source-nodes.js.
It's also a reminder that the secret sauce of types are resolvers.

This part of the `Mdx` type definition

```
extensions: {
  childOf: {
    mimeTypes: options.mediaTypes,
  },
},
```

creates a `childMdx` prop the parent node and links the `Mdx` node to in the
parent's children.
