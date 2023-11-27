import { GlobalStyle } from 'components/GlobalStyle';
import { Layout, ListStyled, NavLinkStyled } from './AppLayout.styled';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
    return (
        <Layout>
        <header>
            <nav>
            <ListStyled>
                <li>
                <NavLinkStyled to="/">Home</NavLinkStyled>
                </li>
                <li>
                <NavLinkStyled to="movies">Movies</NavLinkStyled>
                </li>
            </ListStyled>
            </nav>
        </header>

        <main>
            <Outlet />
            </main>
            <GlobalStyle/>
        </Layout>
    );
};