import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FaBitcoin, FaDollarSign } from 'react-icons/fa';

const NavBar = () => {
  const navigation = useNavigate();

  function goToPatrimony() {
    navigation("/patrimoine");
  }

  function goToPossession() {
    navigation("/possession");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3 txt-primary">
          <FaBitcoin className="me-2" /> Yε:rPatrimony <FaDollarSign className="ms-2" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              className="nav-link-custom"
              onClick={goToPossession}
            >
              Possessions
            </Nav.Link>
            <Nav.Link 
              className="nav-link-custom"
              onClick={goToPatrimony}
            >
              Patrimony
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
