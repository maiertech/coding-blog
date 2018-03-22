import React from "react";
import Link from "gatsby-link";

export default ({ pathContext }) => {
  const { posts, tag } = pathContext;
  if (posts) {
    return (
      <div>
        <span>Posts about {tag}:</span>
        <ul>
          {posts.map(post => (
            <li>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
