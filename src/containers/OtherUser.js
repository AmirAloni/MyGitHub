import React from "react";
import {PageHeader} from "react-bootstrap";

import OtherReposList from "../components/OtherUser/OtherReposList";

import "./OtherUser.css";

export default function OtherUser(props) {

    const { username } = props.match.params
    const { otheruser } = props.match.params

  return (
    <div className="Home">
        <PageHeader>{otheruser.charAt(0).toUpperCase() + otheruser.slice(1)}</PageHeader>
        {OtherReposList(username, otheruser)}
    </div>
  );
  }