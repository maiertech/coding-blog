import React from 'react';
import { node } from 'prop-types';
import { Footer, Header } from '@maiertech/components';
import { graphql, useStaticQuery } from 'gatsby';
import { Box, Flex } from 'theme-ui';
import { Global } from '@emotion/core';

const links = [
  { href: '/blog', text: 'Blog' },
  { href: '/notes', text: 'Notes' },
  { href: '/about', text: 'About' },
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
    <>
      <Global
        styles={{
          'html, body, #___gatsby, #gatsby-focus-wrapper': {
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
          <Header title={data.site.siteMetadata.title} links={links} />
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
    </>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
