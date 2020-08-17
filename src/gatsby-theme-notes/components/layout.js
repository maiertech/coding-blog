import React from 'react';
import { node } from 'prop-types';
import { Box } from 'theme-ui';

// Shadow and fix broken layout from gatsby-theme-notes 2.0.1.
const Layout = ({ children, ...props }) => (
  <Box
    {...props}
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Box
      as="main"
      sx={{
        flex: '1 1 auto',
      }}
    >
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
          maxWidth: 1024,
          mx: 'auto',
          p: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  </Box>
);

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
