import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, isAdminUser, logout, getLoggedInUser } from '../service/AuthSerive';

const HeaderCompnent = () => {
  const isAuth = isUserLoggedIn();
  const isAdmin = isAdminUser();
  const navigator = useNavigate();

  const user = getLoggedInUser();

  function goToLogin() {
    navigator("/login");
  }

  function handleLogout() {
    logout();
    navigator("/login");
  }

  function goToRegister() {
    navigator("/register");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary me-2">
      <Container fluid>
        <Navbar.Brand className='me-3' href="#"><FontAwesomeIcon icon={faCar} /> Car Record</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {isAuth && !isAdmin && <Nav.Link href="/home">Home</Nav.Link>}
            {isAuth && !isAdmin && (
              <NavDropdown title="Taxe" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Taxe</NavDropdown.Item>
                <NavDropdown.Item href="/charts">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          <div>
            {!isAuth && <Button variant="primary" className="me-2" onClick={goToLogin}>Login</Button>}
            {!isAuth && <Button variant="outline-primary" onClick={goToRegister}>Register</Button>}
            {isAuth && (
              <>
                {isAdmin && (
                  <Navbar.Text className="me-3">
                    <FontAwesomeIcon icon={faUser} /> Admin
                  </Navbar.Text>
                )}
                {!isAdmin && (
                  <Navbar.Text className="me-3">
                    <FontAwesomeIcon icon={faUser} /> {user}
                  </Navbar.Text>
                )}
                <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderCompnent;
