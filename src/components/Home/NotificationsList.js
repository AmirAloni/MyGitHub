import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";

import "./NotificationsList.css";

export default function NotificationsList(props) {
  const [notifications, setNotifications] = useState([]);

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
          setNotifications(json)
      }
      
      getUsers(`http://localhost:8080/mygit/api/user/notifications/${props.currUserName}`);
    }
    onLoad();
  }, [props.currUserName, props.isAuthenticated]);

  function renderListContent() {
    return (
        notifications.map((notification, i) =>
       <ListGroupItem header={notification.text}>{notification.createdTime}</ListGroupItem>
                 )
          );
  }

      return( 
          <div>       
            <PageHeader>Notifications</PageHeader>
            <ListGroup> 
               {renderListContent()}
            </ListGroup>
          </div> 
        );
}