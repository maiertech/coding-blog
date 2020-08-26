# Components

## MDXPRovider

MDX renders with unstyled default components. You can change the components used
fo rendering MDX with `MDXProvider`.

```
import { MDXProvider } from '@mdx-js/react'
```

You can pass object `components` with a component mapping to `MDXProvider` to
manipulate how things are renderd. A special component that you can overwrite is
`wrapper`. The wrapper component gets `children` as props. You can then filter
the children, e.g. select all `h1` elements to create a table of contents.

The pattern is to extract some data from the children and render it in a
specific way.

https://github.com/pomber/the-x-in-mdx
