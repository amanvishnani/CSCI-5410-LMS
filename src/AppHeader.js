import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class AppHeader extends Component {
  render() {
    let isLoggedIn = localStorage.getItem("loggedIn") === "true";
    return (
      <section>
        <Navbar className="navHeader" expand="lg">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="text-light font-weight-bold"
          >
            Menu
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {
                !isLoggedIn && 
                <Nav.Link className="text-light font-weight-bold" href="/login">
                Login
              </Nav.Link>
              }
              {
                !isLoggedIn &&
                <Nav.Link
                  className="text-light font-weight-bold"
                  href="/register"
                >
                  Register
                </Nav.Link>
              }
              { isLoggedIn && <Nav.Link
                className="text-light font-weight-bold"
                href="/logout"
              >
                Logout
              </Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </section>
    );
  }
}

export default AppHeader;
