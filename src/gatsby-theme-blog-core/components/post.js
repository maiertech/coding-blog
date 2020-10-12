import React from 'react';
import { object } from 'prop-types';
import { Container, Heading } from 'theme-ui';
import { PostPreview } from '@maiertech/components';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../../components/layout';

const PostPage = ({ data, location }) => {
  const post = data.blogPost;
  return (
    <Layout location={location}>
      <Container variant="narrow">
        <PostPreview
          post={{
            title: (
              <Heading as="h1" mb={3}>
                {post.title}
              </Heading>
            ),
            author: 'Thilo Maier',
            date: post.date,
          }}
          mb={[3, 4]}
        />
        <MDXRenderer>{post.body}</MDXRenderer>
      </Container>
    </Layout>
  );
};

PostPage.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
};

export default PostPage;
