import { Container, Nav, Navbar } from 'react-bootstrap';

function NavBar(){
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">The Devlog Devlog</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Articles</Nav.Link>
                    <Nav.Link href="/new">New Article</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;