import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./ReposList.css";

export default function ReposList(props) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
      function getRepos(url) {
        fetch(url)
        .then(response => response.json())
        .then(json => handleResponseJson(json))
        .catch(function() {alert('error!');});
      }
    
      function handleResponseJson(jsonData){
        setRepos(jsonData);        
      }
      
      getRepos(`http://localhost:8080/mygit/api/user/${props.currUserName}`);
    }
    onLoad();
  }, [props.currUserName, props.isAuthenticated]);

  function renderListContent() {
    return (
        [{}].concat(repos).map((repo, i) =>
        i !== 0 ? (
          <LinkContainer key={repo.name} to={`/repos/${props.currUserName}/${repo.name}`}>
            <ListGroupItem header={repo.name.trim().split("\n")[0]}>
              {"Last Commit: " + new Date(repo.lastCommitTime).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
        ) : (
          <LinkContainer key="new" to="add new repo path">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new Repository
              </h4>
            </ListGroupItem>
          </LinkContainer>
    )
    )
    );
  }

      return( 
          <div>       
            <PageHeader>Repositories</PageHeader>
            <ListGroup> 
               {renderListContent()}
            </ListGroup>
          </div> 
        );
}