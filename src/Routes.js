/* eslint-disable no-undef */
import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Login from "./components/Home/Login";
import Signup from "./components/Home/Signup";
import Repo from "./containers/Repo";
import OtherUser from "./containers/OtherUser";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/repos/:username/:reponame" exact component={Repo} appProps={appProps} />
      <AppliedRoute path="/users/:username/:otheruser" exact component={OtherUser} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={AppliedRoute} />
    </Switch>
  );
}