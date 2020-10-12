import React from 'react';
import { Container, Styled, Text } from 'theme-ui';

import Layout from '../components/layout';

const Homepage = () => {
  return (
    // We would normally use `IntlProvider`, but we already have `intl` and therefore reuse it with RawIntlProvider.
    <Layout>
      <Container>
        <Styled.h1>Homepage</Styled.h1>
        <Text as="p">To be done.</Text>
      </Container>
    </Layout>
  );
};

export default Homepage;
