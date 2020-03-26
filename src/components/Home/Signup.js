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

  const post = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {}
};

  function apiSignup(url) {
    fetch(url, post)
    .then(response => handleResponse(response))
    .catch(function() {alert('error!');});
  }

  function handleResponse(response){
    if(response.ok){
      props.userHasAuthenticated(true);
      props.setCurrUserName(userName);
      props.history.push("/");
    }
    else
      alert('User already Exists'); 
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