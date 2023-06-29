import "./NavigationBar.scss";
// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// Bootstrap Routing
import { LinkContainer } from 'react-router-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar expand="lg" data-bs-theme="dark" className="navbar-custom">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Blog</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/">
              <Nav.Link>Posts</Nav.Link>
            </LinkContainer>

            <NavDropdown title="Login / Signup" id="basic-nav-dropdown">
              <LinkContainer to="/login">
                <NavDropdown.Item>Login</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/signup">
                <NavDropdown.Item>Signup</NavDropdown.Item>
              </LinkContainer>

              <NavDropdown.Divider />

              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;