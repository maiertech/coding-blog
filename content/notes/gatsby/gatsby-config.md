# gatsby-config.js

When using multiple Gatsby themes in one site, I keep running into unexpected
behaviors on the final website. This is because Gatsby merges each theme's
`gatsby-config.js` into a config that is used by the final site.

Gatsby tried to deep merge theme's `gatsby-config.js` files in the order they
appear in the site's `gatsby-config.js`. Sometimes to themes might use the same
plugin. For example, `gatsby-theme-blog` uses `gatsby-plugin-theme-ui`.
`gatsby-theme-blog` has an option to choose a preset that is passed into
`gatsby-plugin-theme-ui` as an option.

`gatsby-theme-notes` does the same thing. If it is defined after
`gatsby-theme-blog` it overrides any options provided to
`gatsby-plugin-theme-ui` by `gatsby-theme-blog`.

To make sure you get consistent behavior, you can define
`gatsby-plugin-theme-ui` after `gatsby-theme-blog` and `gatsby-theme-notes` to
enforce your preset no matter what both themes do beforehand.
