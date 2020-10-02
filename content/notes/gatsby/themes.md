# Themes

## Naming conventions

Themes configured in `gatsby-config.js` are called sibling themes. A theme that
is used by another them is called parent theme.

## Composition

Your website's `gatsby-config.js` defines a `plugins` array with all sibling
themes being used on your site. Each sibling theme defines its own
`gatsby-config.js` and can use any number of parent themes.

Gatsby needs to do flatten recursive plugin definitions. This happens in the
sequence in which sibling themes are defined. For each sibling theme its parent
themes go first (in the sequence in which they are defined), then the theme
itself and then the following sibling's parent themes and so on. If a theme or
plugin occurs multiple times, it's last occurrence wins. Options of previous
occurrences are not merged, the last one rules them all.

Gatsby's composition mechanism also defines how component shadowing works. If a
resource is shadowed in multiple locations, the last occurrence as defined by
the flattened plugins array wins. Anything shadowed in your Gatsby project
always wins.

If you run into unexpected behavior in your Gatsby website, it may be related to
composition, or more precisely your expectation being at odds with the
composition algorithm.

For example, I was using `gatsby-theme-blog` and `gatsby-theme-notes` as sibling
themes defined in this sequence. Both themes use `gatsby-plugin-theme-ui` as
parent plugin with possibly diverging plugin options. In this example each theme
was providing its own preset as a theme option. If we do nothing, the preset
that `gatsby-theme-notes` defines for `gatsby-plugin-theme-ui` wins. To use our
own preset we have to define `gatsby-plugin-theme-ui` with our preset as option
in the root Gatsby website **after** `gatsby-theme-blog` and
`gatsby-theme-notes`.

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
