import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import Link from 'gatsby-link';
import { Container, Provider } from 'rebass';
import { Header, Footer } from 'mda-components';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import theme from '../theme';

// Set global styles.
// See https://github.com/jxnblk/rebass#components.
injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }
`;

// Style Layout for sticky footer:
// https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/
const StyledContainer = styled(Container)`flex: 1;`;

const Layout = props => (
  <Provider theme={theme} className={props.className}>
    <Header
      title={props.data.site.siteMetadata.title}
      linkComponent={Link}
      links={[
        { to: '/', text: 'Home' },
        { to: '/about/', text: 'About' },
        { to: '/archive/', text: 'Archive' },
      ]}
    />
    <StyledContainer>{props.children()}</StyledContainer>
    <Footer
      title={props.data.site.siteMetadata.title}
      internalLinkComponent={Link}
      internalLinks={[
        { to: '/about/', text: 'About' },
        { to: '/archive/', text: 'Archive' },
      ]}
      externalLinks={[
        { to: 'http://twitter.com/mdotasia', text: 'Twitter' },
        { to: 'https://github.com/mdotasia/', text: 'GitHub' },
      ]}
    />
  </Provider>
);

Layout.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }).isRequired,
  children: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default styled(Layout)`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

// eslint-disable-next-line no-undef
export const layoutQuery = graphql`
  query Title {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
