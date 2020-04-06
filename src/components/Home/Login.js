import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";


export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");  

  //   "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
  
  function fetchData(url) {
    fetch(url)
    .then(response => handleResponse(response))
    .catch(function() {alert('error !');});
  }

  function handleResponse(response){
    if(response.ok){
      props.userHasAuthenticated(true);
      props.setCurrUserName(userName);
      props.history.push("/");
    }
    else
      alert('User Not Exists'); 
  }

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  function sha1Password(password){
    var sha1 = require('sha1');
    return sha1(password);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    fetchData(`http://localhost:8080/mygit/api/login/${userName}/${sha1Password(password)}`);
    }

  return (
    <div className="Login">
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
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}