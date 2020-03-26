import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem, Modal, Button } from "react-bootstrap";
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
      
      getRepos(`http://localhost:8080/mygit/api/user/repositories/${props.currUserName}`);
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
            <ListGroupItem onClick={handleShow}>
              <h4>
                <b>{"\uFF0B"}</b> Create new Repository
              </h4>
            </ListGroupItem>
    )
    )
    );
  }

  const [newRepoName, setNewRepoName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  function newRepoModal() { 
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Repository</Modal.Title>
          </Modal.Header>
          <Modal.Body>   
             <input className="newRepoInput" type="text" value={newRepoName} onChange={handleChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cancel
            </Button>
            <Button variant="primary" onClick={()=>{
              fetch(`http://localhost:8080/mygit/api/user/repository/${props.currUserName}/${newRepoName}`,{
                method: 'Post', 
                mode: 'no-cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: ''
              })
              .catch(function() {alert('error!');});
              setShow(false);
            }
            }>
            Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function handleChange(event) {
    setNewRepoName(event.target.value);
  }

      return( 
          <div>       
            <PageHeader>Repositories</PageHeader>
            <ListGroup> 
               {renderListContent()}
               {newRepoModal()}
            </ListGroup>
          </div> 
        );
}