import React, { useState } from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";

function App(props) {
  const [currUserName, setCurrUserName] = useState("");
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  function handleLogout() {
    userHasAuthenticated(false);
    props.history.push("/login");
  }
  
return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">MyGit</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
          {isAuthenticated?
          <>
            <NavItem>{currUserName.charAt(0).toUpperCase() + currUserName.slice(1)}</NavItem>
            <NavItem onClick={handleLogout}>Logout</NavItem>
        </>
               : <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
          }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ currUserName, setCurrUserName, isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);
