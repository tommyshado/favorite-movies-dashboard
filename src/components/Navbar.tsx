import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {

  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Favorite movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>
              Home
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/favorites')}>
              Favorites
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => {}}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;