import React, {useState, useEffect} from "react";
import {Treebeard} from 'react-treebeard';
import {Button, Row, Col } from "react-bootstrap";
import "./WorkingCopy.css";

export default function WorkingCopy(props) {

    const { username } = props.match.params
    const { reponame } = props.match.params
    const [treeData, setTreeData] = useState("");
    const [cursor, setCursor] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [filePath, setFilePath] = useState("");

    const fileContent = document.getElementById('work-text');
    const fileContentHeader = document.getElementById('work-header');

    useEffect(() => {
        async function onLoad() {
            function fetchWorkingCopyData(url) {
                fetch(url)
                .then(response => response.json())
                .then(json => handleResponseJson(json))
                .catch(function() {alert('error!');});
              }
          
              function handleResponseJson(jsonData){
                setTreeData(jsonData);
              }
    
              fetchWorkingCopyData(`http://localhost:8080/mygit/api/user/repository/wc/${username}/${reponame}`);
            }
        onLoad();
      },[reponame, username]);

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
               fileContentHeader.textContent = node.name;  
               setFilePath(node.path); 
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
                   .then(json => fileContent.value  = json.content)
                   .catch(function() {alert('error!');});
             }
        }
        
        return (
           <Treebeard data={treeData} onToggle={onToggle}/>
        )
    }

    function handleEditSaveClick(){
      if(isEditing){
        saveFile();
      }
      setEditing(!isEditing);
    }
    
    function saveFile(){
    fetch('http://localhost:8080/mygit/api/file/update',{
      method: 'POST', 
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: `${filePath}~${fileContent.value}`
    })
    .catch(function() {alert('error!');});
  }

    return(
        <div>
          <Row>
            <Col sm={4}>
              <div>
                <h4>Working Area</h4> 
                {renderFilesTree()}
              </div>
            </Col>
            <Col sm={8}>      
              <div>
                <div>
                 <div className="work-header" id="work-header"></div>
                 <Button variant="outline-primary" onClick={handleEditSaveClick}>
                   {isEditing ? 'Save' : 'Edit'}
                  </Button>
                 </div>
                 <textarea className="contentDiv" id="work-text" disabled={!isEditing}></textarea>
              </div>
          </Col>
          </Row>
    </div>);
}