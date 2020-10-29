# Tagging for MDX files

Let's look at what others are doing to tag MDX files.

## @reflexjs/gatsby-theme-post

### How this theme handles tagging

Let's look at [arshad](https://github.com/arshad)'s
[`@reflexjs/gatsby-theme-post@0.6.8`](https://github.com/reflexjs/reflex/tree/%40reflexjs/gatsby-theme-post%400.6.8/packages/gatsby-theme-post),
which is part of a collection of super polished Gatsby themes featured at
[reflexjs.org](https://reflexjs.org/) and one of my favorite collections of
Gatsby themes.

In its
[`gatsby-node.js`](https://github.com/reflexjs/reflex/blob/%40reflexjs/gatsby-theme-post%400.6.8/packages/gatsby-theme-post/gatsby-node.js),
this theme defines `PostTag` interface

```
interface PostTag @nodeInterface {
  id: ID!
  name: String
  slug: String
}
```

which is linked to the `Post` interface via

```
tags: [PostTag] @link(by: "name")
```

The idea is to create tag nodes and link them to post nodes. When you query for
a post, e.g. in a post template, you can seamlessly query its tags and
corresponding paths to tag pages. The theme makes use of the
[`onCreateNode`](https://www.gatsbyjs.com/docs/node-apis/#onCreateNode) Node API
extension and for each post iterates through its tags:

```
if (tags) {
  const nodeType = "MdxPostTag"
  tags.forEach((name) => {
    const tagNode = {
      name,
      slug: `${basePath}/tags/${toSlug(name)}`,
    }

    actions.createNode({
      id: createNodeId(`${nodeType}-${name}`),
      ...tagNode,
      internal: {
        type: nodeType,
        contentDigest: createContentDigest(`${nodeType}-${name}`),
      },
    })
  })
}
```

The idea here is that if a tag node already exists, because the same tag
appeared in a previous post, the tag node is created again, which overrides a
any previously generated node. This ensures that you end up with only one tag
node for each tag.

When I ran the
[example-blog](https://github.com/reflexjs/reflex/tree/%40reflexjs/gatsby-theme-post%400.6.8/examples/example-blog),
I noticed a strange behavior. On first run, the site would build without issue,
creating tag nodes and tag pages and linking to tag pages in posts correctly. In
subsequent runs, when Gatsby's cache kicks in, all tag nodes mysteriously
disappeared an no tag pages were generated.

This bug is discussed in more details in
[this issue](https://github.com/reflexjs/reflex/issues/39). The takeaway is that
Gatsby's `onCreateNode` seems to assume a 1:1 node transformation and expects a
parent child relationship to be established reflected in the `parent.id` of the
generated node. If `parent.id` is not set, Gatsby seems to assume that the node
can be deleted from the cache.

### Pros and cons

Pros:

- Theme creates tag nodes with path information that are linked post nodes and
  can be queried with posts.

Cons:

- Theme can do intra-theme tagging only, i.e. only the collection of posts
  defined by this theme can be tagged.
- Deriving tag nodes from post nodes is add odds with `onCreateNode`, which
  assumes a 1:1 relationship between parent and child nodes.

## gatsby-theme-blog-core

We first look at how Gatsby's official
[`gatsby-theme-blog-core@2.0.2`](https://github.com/gatsbyjs/themes/tree/gatsby-theme-blog-core%402.0.2/packages/gatsby-theme-blog-core)
handles tagging for MDX files. The corresponding starter is
[`gatsby-starter-theme@0.0.4`](https://github.com/gatsbyjs/themes/tree/master/starters/theme).
None of the sample posts of the starter contain tags.

In its
[`gatsby-node.js`](https://github.com/gatsbyjs/themes/blob/gatsby-theme-blog-core%402.0.2/packages/gatsby-theme-blog-core/gatsby-node.js)
this theme defines type `BlogPost` as `tags: [String]!` and sets

```
tags: node.frontmatter.tags || [],
```

Other than that it does nothing more with the tags like cretaing tag nodes or
creating tag pages. This means that as of this version this theme does not
support real tagging.

##

What is Gatsby's take on this?

## @lekoarts/gatsby-theme-minimal-blog(-core)

We look at [LekoArts](https://github.com/LekoArts)'
[`gatsby-theme-minimal-blog-core@2.6.5`](https://github.com/LekoArts/gatsby-themes/tree/%40lekoarts/gatsby-theme-minimal-blog%402.6.5/themes/gatsby-theme-minimal-blog-core)
and
[`gatsby-theme-minimal-blog@2.6.5`](https://github.com/LekoArts/gatsby-themes/tree/%40lekoarts/gatsby-theme-minimal-blog%402.6.5/themes/gatsby-theme-minimal-blog).

These two themes are part of a collection of very polished themes featured at
[themes.lekoarts.de](https://themes.lekoarts.de/).

The core theme defines in its [`gatsby-config.js`]() type `PostTag`:

```
type PostTag {
  name: String
  slug: String
}
```

and type `Post` with

```
tags: [PostTag]
```

The theme processes tags in the `onCreteNode` lifecycle method:

```
if (node.frontmatter.tags) {
  modifiedTags = node.frontmatter.tags.map((tag) => ({
    name: tag,
    slug: kebabCase(tag),
  }))
} else {
  modifiedTags = null
}
```

It does not create any tags nodes. To create tag pages, the `createPages`
lifecycle methods runs this query:

```
tags: allPost(sort: { fields: tags___name, order: DESC }) {
  group(field: tags___name) {
    fieldValue
  }
}
```

This query uses Gatsby's
[group](https://www.gatsbyjs.com/docs/graphql-reference/#group) to query all
tags used to tag posts. The resulting array of tags is then used to create tag
pages. Tag pages are crated with
[`tag-query.tsx`](https://github.com/LekoArts/gatsby-themes/blob/%40lekoarts/gatsby-theme-minimal-blog%402.6.5/themes/gatsby-theme-minimal-blog-core/src/templates/tag-query.tsx)
and
[`tag.tsx`](https://github.com/LekoArts/gatsby-themes/blob/%40lekoarts/gatsby-theme-minimal-blog%402.6.5/themes/gatsby-theme-minimal-blog-core/src/components/tag.tsx),
the latter of which needs to be shadowed for a custom layout. To link to tage
pages, the shadowed
[`post.tsx`](https://github.com/LekoArts/gatsby-themes/blob/%40lekoarts/gatsby-theme-minimal-blog%402.6.5/themes/gatsby-theme-minimal-blog/src/components/post.tsx)
uses
[`ItemTags`](https://github.com/LekoArts/gatsby-themes/blob/%40lekoarts/gatsby-theme-minimal-blog%402.6.5/themes/gatsby-theme-minimal-blog/src/components/item-tags.tsx)
to construct links to tag pages.

In summary:

- Tags can only be applied within this theme, not across different themes and
  different content types.
- No tag nodes are created.
- `ItemTags` applied in the shadowed `post.tsx` needs to know how paths to tag
  pages are created. This duplicates what is happening in `gatsby-node.js` when
  pages are generated.
- The group query is an elegant way to avoid having to create tag nodes.
- Overall robust and elegant with the downside that taggins is intra-theme.

## And now what?
