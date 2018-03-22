import React from "react";
import Link from "gatsby-link";

export default ({ pathContext }) => {
  const { tags } = pathContext;
  if (tags) {
    return (
      <div>
        <ul>
          {tags.map(tag => (
            <li>
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
