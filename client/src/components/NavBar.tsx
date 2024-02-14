import { Container, Nav, Navbar } from 'react-bootstrap';
import { Tooltip } from '@mui/material';
import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';
import { GiSaucepan } from 'react-icons/gi';
import { MdSettings } from 'react-icons/md';

function NavBar(){
    const hasArticleCreate = (localStorage.getItem("permissions")??'').includes("Article:create");
    const hasAdminPanel = (localStorage.getItem("permissions")??'').includes("AdminPanel:view");

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">The Devlog Devlog</Navbar.Brand>
                <Tooltip title="Sauce">
                    <Link 
                        to="https://github.com/d-hayman/rails_react_practice_app"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <GiSaucepan/>
                    </Link>
                </Tooltip>
                <Nav className="me-auto">
                    <Nav.Link href="/">Articles</Nav.Link>
                    { hasArticleCreate &&
                        <Nav.Link href="/new">New Article</Nav.Link>
                    }
                </Nav>
                { hasAdminPanel &&
                    <Tooltip title="Admin">
                        <Link to="/admin">
                            <MdSettings/>
                        </Link>
                    </Tooltip>
                }
                <LoginModal/>
            </Container>
        </Navbar>
    )
}

export default NavBar;