import React from 'react';
import { node } from 'prop-types';
import { Footer, Header } from '@maiertech/components';
import { graphql, useStaticQuery } from 'gatsby';
import { Box, Flex, Styled } from 'theme-ui';
import { Global } from '@emotion/core';

const links = [
  { href: '/blog', text: 'Blog' },
  { href: '/notes', text: 'Notes' },
];

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `);
  // To make sticky footer work all elements up the hierarchy must set height to 100%.
  return (
    <Styled.root>
      <Global
        styles={{
          'html, body, #___gatsby, #gatsby-focus-wrapper, #gatsby-focus-wrapper > div': {
            height: '100%',
          },
        }}
      />
      <Flex
        sx={{
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Header
            title={data.site.siteMetadata.title}
            links={links}
            mb={[3, 4]}
          />
        </Box>
        <Box sx={{ flex: 1 }}>{children}</Box>
        <Box sx={{ flexShrink: 0 }}>
          <Footer
            title={data.site.siteMetadata.title}
            name={data.site.siteMetadata.author}
            links={links}
          />
        </Box>
      </Flex>
    </Styled.root>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
