import { Container, Nav, Navbar } from 'react-bootstrap';
import LoginModal from './LoginModal';

function NavBar(){
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">The Devlog Devlog</Navbar.Brand>
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