import React, {useState} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./Signup.css";

export default function Signup(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");  
  const [confirmPassword, setConfirmPassword] = useState("");  


  function validateForm() {
    return (
      userName.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  function apiSignup(url) {
    fetch(url)
    .then(response => response.json())
    .then(json => handleResponseJson(json))
    .catch(function() {alert('error!');});
  }

  function handleResponseJson(jsonData){
    if(jsonData){
        props.userHasAuthenticated(true);
        props.history.push("/");
    }
    else
      alert('User already exists'); 
  }

  async function handleSubmit(event) {
    event.preventDefault();
    apiSignup(`http://localhost:8080/mygit/api/signup/${userName}`);
    }


    return (
    <div className="Signup">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="userName" bsSize="large">
          <ControlLabel>User Name</ControlLabel>
          <FormControl
            autoFocus
            type="userName"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Signup
        </Button>
      </form>
      </div>
    );
  }