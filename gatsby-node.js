const path = require("path");

const createTagPages = (createPage, posts) => {
  const tagPageTemplate = path.resolve("src/templates/tag.jsx");
  const tagsPageTemplate = path.resolve("src/templates/tags.jsx");
  const postsByTags = {};

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTags[tag]) {
          postsByTags[tag] = [];
        }
        postsByTags[tag].push(node);
      });
    }
  });

  const tags = Object.keys(postsByTags);

  // Tags page.
  createPage({
    path: "/tags",
    component: tagsPageTemplate,
    context: { tags: tags.sort() }
  });

  // Individual tag pages.
  tags.forEach(tag => {
    const postsByTag = postsByTags[tag];
    createPage({
      path: `/tags/${tag}`,
      component: tagPageTemplate,
      context: {
        posts: postsByTag,
        tag
      }
    });
  });
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const blogPostTemplate = path.resolve("src/templates/blog-post.jsx");
  return graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            frontmatter {
              date
              title
              path
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const posts = result.data.allMarkdownRemark.edges;

    createTagPages(createPage, posts);

    posts.forEach(({ node }, index) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          prev: index === posts.length - 1 ? null : posts[index + 1].node,
          next: index === 0 ? null : posts[index - 1].node
        }
      });
    });
  });
};
