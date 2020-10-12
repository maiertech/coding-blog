import React from 'react';
import { shape, string } from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Container } from 'theme-ui';

import Layout from './layout';

const NotePage = ({
  data: {
    note: { body },
  },
}) => (
  <Layout>
    <Container>
      <MDXRenderer>{body}</MDXRenderer>
    </Container>
  </Layout>
);

NotePage.propTypes = {
  data: shape({ note: shape({ body: string.isRequired }).isRequired })
    .isRequired,
};

export default NotePage;
