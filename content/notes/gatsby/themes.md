# Themes

## Definitions

- Themes are plugins that include a `gatsby-config.js`.
- Themes that are configured in `gatsby-config.js` are called sibling themes.
- A theme that is used by another theme is called parent theme. In other words:
  any theme defined in a theme's `gatsby-config.js` is a parent theme.

## Composition

Your site's `gatsby-config.js` defines a `plugins` array that contains plugins
and themes. Each theme in the `plugins` array comes with a `gatsby-config.js`
that needs to be somehow merged with the site's `gatsby-config.js`. The problem
of merging all configs can be broken down to merging two configs. Every prop in
a `gatsby-config.js`, but the `plugins` prop, is deep merged. In a deep merge
the last value always wins.

How are two `plugins` arrays merged? Use these simple rules:

1. The initial merge step starts with an empty consolidation array, which will
   hold the result of the current merge step. Start iterating through the
   `plugins` array of the site's `gatsby-config.js`.
1. If the current element is a plugin, add it to the consolidation array.
1. If the current element is a theme, recursively start a new merge step using
   that theme's `plugins` array and a separate consolidation array for this
   step. Start iterating through the theme's `plugins` array and process plugins
   and themes. the resulting consolidation array then needs to be merged into
   the consolidation array of the previous merge step.
1. Plugins are normalized to make it easier to figure out whether two plugins
   are duplicates, factoring in options. When mergin a consolidation array into
   a consolidation array one recursion step higher, only keep the first
   occurrence of a duplicate.
1. At the end of every merge step the consolidation array contains plugins only,
   no themes.

In the consolidated array plugins are ordered in the sequence in which sibling
themes are defined. For each sibling theme its parent themes go first (in the
sequence in which they are defined), then the theme itself and then the
following sibling's parent themes and so on. Keep in mind that themes are
eventually replaced with a collection of plugins that make up a theme. The
consolidated array does not contain duplicates (meaning the same plugin with the
same options), but it can contain the same plugin with different options. For
some plugins, such as
[`gatsby-source-filesystem`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-filesystem),
multiple occurrences of this plugin are no issue. In this example multiple
occurrences define multiple file locations to be processed by Gatsby. For other
plugins, such as
[`gatsby-plugin-theme-ui`](https://theme-ui.com/packages/gatsby-plugin/),
multiple occurrences overwrite each other and the last occurrence wins. Options
of previous occurrences are not merged.

Component shadowing can be done in a site or in any plugin, including themes.
The consolidated array also defines how component shadowing works. If the same
file is shadowed in more than one location, the follwoing rules apply:

- Shadowing in the site always takes precedence over any other location.
- The first shadowing plugin of the sequence described above wins.

See
[this file](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/merge-gatsby-config.ts)
for the algorithm to merge `gatsby-config.js` files.

## Recommendations

- [`gatsby-theme-blog`](https://github.com/gatsbyjs/themes/tree/master/packages/gatsby-theme-blog)
- [`gatsby-theme-notes`](https://github.com/gatsbyjs/themes/tree/master/packages/gatsby-theme-notes)
- [Reflex](https://reflexjs.org/) is a collection og packages and Gatsby themes.
  Awesome material to learn from.
- [Doctocat](https://github.com/primer/doctocat) is backed by GitHub and a
  pretty polished theme that is suitable to document component libraries.
- Book: https://github.com/SaraVieira/gatsby-starter-book
- Still need to vet [Catalyst](https://www.gatsbycatalyst.com/) to see if its
  good quality.
- [gatsby-theme-courses](https://github.com/hangindev/gatsby-theme-courses):
  check if this can be used as basis for a course platform.
