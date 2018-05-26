const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  // Add path to all MarkdownRemark nodes that have not been processed yet.
  if (node.internal.type === "MarkdownRemark" && !node.fields.path) {
    const { createNodeField } = actions;
    createNodeField({
      node,
      name: "path",
      value: createFilePath({ node, getNode })
    });
  }
};
