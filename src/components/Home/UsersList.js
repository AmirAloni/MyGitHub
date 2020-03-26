import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./UsersList.css";

export default function UsersList(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      function getUsers(url) {
        fetch(url)
        .then(response => response.json())
        .then(json => handleResponse(json))
        .catch(function() {alert('error!');});
      }
    
      function handleResponse(json){  
          setUsers(json)
      }
      
      getUsers(`http://localhost:8080/mygit/api/user/users/${props.currUserName}`);
    }
    onLoad();
  }, [props.currUserName, props.isAuthenticated]);

  function renderListContent() {
    return (
        users.map((otherUser, i) =>
                    <LinkContainer key={otherUser} to={`/users/${props.currUserName}/${otherUser}`}>
                      <ListGroupItem header={otherUser}></ListGroupItem>
                    </LinkContainer>
                 )
          );
  }

      return( 
          <div>       
            <PageHeader>Users</PageHeader>
            <ListGroup> 
               {renderListContent()}
            </ListGroup>
          </div> 
        );
}