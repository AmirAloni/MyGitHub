import React from "react";
import ReposList from "../components/Home/ReposList";
import UsersList from "../components/Home/UsersList";

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
          {ReposList(props)}
          {UsersList(props)}
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderHomePage() : renderLander()}
    </div>
  );
  }