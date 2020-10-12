import React from 'react';
import { object } from 'prop-types';
import { Container, Heading, Link, Styled } from 'theme-ui';
import { PostPreview } from '@maiertech/components';

import Layout from '../../components/layout';

const PostsPage = ({ data, location }) => {
  const posts = data.allBlogPost.nodes;
  return (
    <Layout location={location}>
      <Container variant="narrow">
        <Styled.h1>Latest posts</Styled.h1>
        {posts.map(({ id, slug, ...post }) => (
          <Link key={id} href={slug}>
            <PostPreview
              post={{
                title: (
                  <Heading as="h2" mb={3}>
                    {post.title}
                  </Heading>
                ),
                author: 'Thilo Maier',
                date: post.date,
              }}
              mb={4}
            />
          </Link>
        ))}
      </Container>
    </Layout>
  );
};

PostsPage.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
};

export default PostsPage;
