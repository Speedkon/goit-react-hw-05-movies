import styled from 'styled-components';
import { NavLink } from "react-router-dom";

export const Layout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
`;

export const ListStyled = styled.ul`
    display: flex;
    gap: 20px;
`;

export const NavLinkStyled = styled(NavLink)`
text-decoration: none;
color: black;
font-size: 24px;

&.active {
    color: red;
};
`;