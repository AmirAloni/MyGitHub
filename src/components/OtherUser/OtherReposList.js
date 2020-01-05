import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";

import "./OthersReposList.css";

export default function OthersReposList(username ,otherUserName) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function onLoad() {

      function getRepos(url) {
        fetch(url)
        .then(response => response.json())
        .then(json => handleResponseJson(json))
        .catch(function() {alert('error!');});
      }
    
      function handleResponseJson(jsonData){
        setRepos(jsonData);        
      }
      
      getRepos(`http://localhost:8080/mygit/api/user/users/${username}/${otherUserName}`);
    }
    onLoad();
  }, [otherUserName, username]);


function renderCommitsTable(){
    return(
     <div> 
         <h4>Repositories</h4>
         <Table striped bordered hover>
         <thead>
           <tr>
             <th>Name</th>
             <th>Active Branch</th>
             <th>Commit Message</th>
             <th>Last Commit</th>
           </tr>
         </thead>
         <tbody>
           {repos.map((repo,i) =>     
               <tr>
             <td>{repo.name}<td></td><Button className="button">Fork</Button></td>
             <td>{repo.activeBranch}</td>
             <td>{repo.lastCommitMessege}</td>
             <td>{repo.lastCommitTime}</td>
           </tr>
           )}
         </tbody>
       </Table>
    </div>  
    );
}


      return(
      <div className="repo">
          {renderCommitsTable()}
      </div>);
}