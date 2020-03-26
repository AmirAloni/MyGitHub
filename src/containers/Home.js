import React from "react";
import { Row, Col } from "react-bootstrap";
import ReposList from "../components/Home/ReposList";
import UsersList from "../components/Home/UsersList";
import NotificationsList from "../components/Home/NotificationsList";

import "./Home.css";

export default function Home(props) {

  function renderLander() {
    return (
      <div className="lander">
        <h1>Welcome To MyGit</h1>
        <p>Files Management Application</p>
      </div>
    );
  }

  function renderHomePage() {
    return (
      <div className="homePage">
          <Row>
            <Col>{ReposList(props)}</Col>
          </Row>
          <Row>
            <Col xs={4}>{UsersList(props)}</Col>
            <Col xs={8}>{NotificationsList(props)}</Col>
          </Row>         
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderHomePage() : renderLander()}
    </div>
  );
  }