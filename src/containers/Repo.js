import React, { useState, useEffect } from "react";
import { PageHeader } from "react-bootstrap";
import BranchesTable from "../components/Repo/BranchesTable";
import CommitsTable from "../components/Repo/CommitsTable";
import WorkingCopy from "../components/Repo/WorkingCopy";

import "./Repo.css";

export default function Repo(props) {
  const [repoData, setRepoData] = useState([]);
  const [branches, setbranches] = useState([]);
  const [commits, setCommits] = useState([]);

  const { username } = props.match.params
  const { reponame } = props.match.params

  useEffect(() => {
    async function onLoad() {
      function getRepos(url) {
        fetch(url)
        .then(response => response.json())
        .then(json => handleResponseJson(json))
        .catch(function() {alert('error !');});
      }
      
      function handleResponseJson(jsonData){
        setRepoData(jsonData[0]); 
        setCommits(jsonData[2]);
        setbranches(jsonData[3]);
      }

      getRepos(`http://localhost:8080/mygit/api/user/repository/${username}/${reponame}`);
    }
    onLoad();
  },[reponame, username]);


return(
  <div className="repo">
    <PageHeader>{repoData.name}</PageHeader>
    {WorkingCopy(props)}
    {BranchesTable(branches)}
    {CommitsTable(props, commits)}
  </div>);
}