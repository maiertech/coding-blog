import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import styled from 'styled-components';
import { modularScale } from 'polished';
import Link from 'gatsby-link';

// Default: portrait phones
// Small devices (landscape phones, 576px and up)
// Medium devices (tablets, 768px and up)
// Large devices (desktops, 992px and up)
// Extra large devices (large desktops, 1200px and up)

const Flex = styled.div`
  color: ${props => props.theme.colors.bgAlt};
  background-color: ${props => props.theme.colors.primary};
  text-align: center;

  @media (min-width: 576px) {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

const Title = styled.h1`
  background-color: ${props => props.theme.colors.primaryDarker};
  font-size: ${modularScale(1, '1em', 'minorThird')};
  padding: 10px;
  margin: 0;

  @media (min-width: 576px) {
    font-size: ${modularScale(2, '1em', 'minorThird')};
  }

  @media (min-width: 768px) {
    font-size: ${modularScale(3, '1em', 'minorThird')};
  }

  @media (min-width: 992px) {
    font-size: ${modularScale(4, '1em', 'minorThird')};
  }
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 1em;
  text-decoration: none;
  font-weight: ${props => props.theme.typography.options.boldWeight};
  color: ${props => props.theme.colors.bgAlt};
`;

const Header = () =>
  <Flex>
    <Title>Coding for the Web</Title>
    <NavBar>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/archive/">Archive</NavLink>
      <NavLink to="/about/">About</NavLink>
    </NavBar>
  </Flex>;

export default Header;
