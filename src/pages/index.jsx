import React from "react";
import Link from "gatsby-link";

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div>
      {posts.map(({ node: post }) => {
        const { frontmatter } = post;
        return (
          <div key={post.id}>
            <h2>
              <Link to={frontmatter.path}>{frontmatter.title}</Link>
            </h2>
            <p>{frontmatter.date}</p>
            <p>{frontmatter.excerpt}</p>
            <ul>
              {post.frontmatter.tags.map(tag => (
                <li>
                  <Link to={`/tags/${tag}`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

// eslint-disable-next-line no-undef
export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
          }
        }
      }
    }
  }
`;
