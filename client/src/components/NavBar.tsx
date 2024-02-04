import { Container, Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';
import { GiSaucepan } from 'react-icons/gi';

function NavBar(){
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">The Devlog Devlog</Navbar.Brand>
                <OverlayTrigger
                    placement='bottom'
                    overlay={<Tooltip>Sauce</Tooltip>}
                >
                    <Link 
                        to="https://github.com/d-hayman/rails_react_practice_app"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <GiSaucepan/>
                    </Link>
                </OverlayTrigger>
                <Nav className="me-auto">
                    <Nav.Link href="/">Articles</Nav.Link>
                    <Nav.Link href="/new">New Article</Nav.Link>
                </Nav>
                <LoginModal/>
            </Container>
        </Navbar>
    )
}

export default NavBar;