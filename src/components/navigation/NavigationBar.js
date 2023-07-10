import "./NavigationBar.scss";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { resetAuthUser } from "../../reducers/sessionSlice";
// APIs
import AuthAPI from "../../apis/AuthAPI";
// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// Bootstrap Routing
import { LinkContainer } from "react-router-bootstrap";

const NavigationBar = () => {
  const { authUser } = useSelector(state => state.session);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Handle user logout
  const handleLogout = () => {
    // Logout user
    AuthAPI.logout()
    .then(res => {
      if(res.data.success) {
        console.log("Logged out");

        // Reset authenticated user state
        dispatch(resetAuthUser());
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  };

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

            <LinkContainer to="/users">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>

            {!authUser &&
              <LinkContainer to="/posts">
                <Nav.Link>Posts</Nav.Link>
              </LinkContainer>
            }

            {authUser &&
              <NavDropdown title="Posts" id="basic-nav-dropdown">
                <LinkContainer to="/posts">
                  <NavDropdown.Item>All Posts</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/posts/new">
                  <NavDropdown.Item>New Post</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            }

            {authUser &&
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <LinkContainer to={ `/users/${ authUser._id }` }>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/">
                  <NavDropdown.Item>Settings</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            }

            {!authUser &&
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
            }

            {authUser &&
              <button onClick={ handleLogout }>
                Logout
              </button>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;