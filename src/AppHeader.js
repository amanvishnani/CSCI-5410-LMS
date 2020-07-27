import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class AppHeader extends Component {
  renderNotLoggedInItems() {
    return (
      <React.Fragment>
        <Nav.Link className="text-light font-weight-bold" href="/login">
          Login
        </Nav.Link>
        <Nav.Link className="text-light font-weight-bold" href="/register">
          Register
        </Nav.Link>
        <Nav.Link className="text-light font-weight-bold" href="/help">
          Help
        </Nav.Link>
      </React.Fragment>
    );
  }

  renderLoggedInItems() {
    let [name, orgName] = ["", ""];
    try {
      let ud = localStorage.getItem("userData");
      let userData = JSON.parse(ud);
      name = `${userData.user.firstName} ${userData.user.lastName}`;
      orgName = `${userData.org.name}`;
    } catch (error) {}
    return (
      <React.Fragment>
        {/* <span style={{ color: "white", marginRight: "100px" }}>
          {name}
          <br />
          {orgName}
        </span> */}
        <Nav.Link className="text-light " href="/home">
          {name}
          <br />
          {orgName}
        </Nav.Link>
        <Nav.Link className="text-light font-weight-bold" href="/upload-file">
          Upload Files
        </Nav.Link>
        <Nav.Link className="text-light font-weight-bold" href="/help">
          Help
        </Nav.Link>
        <Nav.Link className="text-light font-weight-bold" href="/analysis-2">
          Sentiments Analysis
        </Nav.Link>
        <Nav.Link className="text-light font-weight-bold" href="/logout">
          Logout
        </Nav.Link>
      </React.Fragment>
    );
  }

  render() {
    let isLoggedIn = localStorage.getItem("loggedIn") === "true";
    return (
      <section>
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
                {isLoggedIn
                  ? this.renderLoggedInItems()
                  : this.renderNotLoggedInItems()}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </section>
      </section>
    );
  }
}

export default AppHeader;
