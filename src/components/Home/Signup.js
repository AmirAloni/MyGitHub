import React, {useState} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./Signup.css";

export default function Signup(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");  
  const [confirmPassword, setConfirmPassword] = useState("");  
  const [email, setEmail] = useState("");  


  function validateForm() {
    return (
      userName.length > 0 &&
      password.length > 0 &&
      password === confirmPassword &&
      email.length > 0
    );
  }

  const post = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: userName,
                           password: sha1Password(password),
                           email: email
                          })
};

function sha1Password(password){
  var sha1 = require('sha1');
  return sha1(password);
}

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
    apiSignup(`http://localhost:8080/mygit/api/signup`);
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
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Signup
        </Button>
      </form>
      </div>
    );
  }