import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import UserContext from "../UserContext";

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            E-Commerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" exact>
                Home
              </Nav.Link>
              {user.id !== null ? (
                user.isAdmin ? (
                  <>
                    <Nav.Link as={Link} to="/products">
                      Product
                    </Nav.Link>
                    <Nav.Link as={Link} to="/addProduct">
                      Add Product
                    </Nav.Link>
                    <Nav.Link as={Link} to="/logout">
                      Logout
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/orders">
                      My Order
                    </Nav.Link>
                    <Nav.Link as={Link} to="/cart">
                      Cart
                    </Nav.Link>
                    <Nav.Link as={Link} to="/products">
                      Product
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile">
                      Profile
                    </Nav.Link>
                    <Nav.Link as={Link} to="/logout">
                      Logout
                    </Nav.Link>
                  </>
                )
              ) : (
                <>
                  <Nav.Link as={Link} to="/orders">
                    My Order
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ marginTop: "60px" }}>
      </div>
    </>
  );
}
