# Queries

## Page queries

Page queries are executed when a page is being created. Page queries are located
in a page template. It is possible to shadow a template with a query, but not
recommended. At the moment Gatsby throws a warning when shadowing a template
with a query. Page queries can use custom fragments since at the time of
execution custom fragements have been made availalbe by Gatsby.

In themes it is not possible to adapt page queries based on theme options. Using
multiple templates and using them for page creation in `gatsby-node.js` based on
theme options might also not be possible if page queries contain elements that
may not exist, e.g. a data type that is created or not based on a theme option.
Gatsby extracts all page queries and is not aware of any logic to select a
template and will throw an error.

## Queries defined in `gatsby-node.js`

You can run queries inside of `gatsby-node.js`, e.g., to select nodes for which
pages shoudl be created. However, you cannot use any custom fragments since
Gatsby makes them availalbe only after queries in `gatsby-node.js` have been
executed (see
[this comment](https://github.com/gatsbyjs/gatsby/issues/12155#issuecomment-493692855)).

You might be tempted to move page queries into `gatsby-node.js` to be able to
customize them with theme options. Bad idea, because custom fragments are not
available yet when queries inside `gatsby-node.js` run.
