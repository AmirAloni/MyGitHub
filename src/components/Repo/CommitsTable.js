import React, { useState, useEffect } from "react";
import { Table, Collapse, Row,Col } from "react-bootstrap";
import {Treebeard} from 'react-treebeard';

import "./CommitsTable.css";

export default function CommitsTable(props, commits) {

    const { username } = props.match.params
    const { reponame } = props.match.params
    const [commitOpen, setCommitOpen] = useState(false);
    const [treeData, setTreeData] = useState("");
    const [cursor, setCursor] = useState(false);

    const fileContentCollapse = document.getElementById('commit-collapse-text');


function onCommitClicked(sha1){
    fetchCommitData(`http://localhost:8080/mygit/api/user/repos/repo/${username}/${reponame}/${sha1}`);
}

function closeCommitDetails(){
    fetch(`http://localhost:8080/mygit/api/user/repos/repo/${username}/${reponame}`,{
        method: 'DELETE',
        headers: {
         'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .catch(function() {alert('error!');});
}

function fetchCommitData(url) {
    fetch(url)
    .then(response => response.json())
    .then(json => handleResponseJson(json))
    .catch(function() {alert('error!');});
  }
  
  function handleResponseJson(jsonData){
    setTreeData(jsonData);
  }


  function renderCommitsTable(){
    return(
     <div> 
         <h4>Commits</h4>
         <Table striped bordered hover>
         <thead>
           <tr>
             <th>User</th>
             <th>Message</th>
             <th>Sha1</th>
             <th>Time</th>
           </tr>
         </thead>
         <tbody>
           {commits.map((commit,i) =>     
            <tr onClick={function(){
                if(commitOpen){
                    closeCommitDetails();
                }
                else{
                    onCommitClicked(commit.sha1);
                }
                setCommitOpen(!commitOpen);
              
            }} 
                 aria-controls="commit-collapse-text" aria-expanded={commitOpen}>
             <td>{commit.committer}</td>
             <td>{commit.message}</td>
             <td>{commit.sha1}</td>
             <td>{commit.timestamp}</td>
            </tr>)}
         </tbody>
       </Table>
    </div>  
    );
}


function renderCommitDetails(){
    return(
      <div> 
        <Row>
          <Col sm={4}>
            <Collapse in={commitOpen} >
            <div>{renderFilesTree()}</div>
           </Collapse>
          </Col>
          <Col sm={8}>      
            <Collapse in={commitOpen} className="commitCollapse">
            <div id="commit-collapse-text"></div>
           </Collapse>
        </Col>
        </Row>
        
  </div>
    );
}


function renderFilesTree(){

    const onToggle = (node, toggled) => {
        if (cursor) {
            cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        setCursor(node);
        setTreeData(Object.assign({}, treeData))

        if(!node.children){
           
            fetch('http://localhost:8080/mygit/api/file',{
                method: 'POST', 
                mode: 'no-cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: node.path
              })
            .then(response => response.json())
            .then(json => fileContentCollapse.textContent = json.content)
            .catch(function() {alert('error!');});

        }
    }
    
    return (
       <Treebeard data={treeData} onToggle={onToggle}/>
    )
}


return(
    <div className="repo">
        {renderCommitsTable()}
        {renderCommitDetails()}
    </div>);
    
}