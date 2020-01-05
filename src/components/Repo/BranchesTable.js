import React from "react";
import { Table } from "react-bootstrap";


export default function BranchesTable(branches) {

  function renderBranchesTable(){
    return(
     <div> 
         <h4>Branches</h4>
         <Table striped bordered hover>
         <thead>
           <tr>
             <th>Branch Name</th>
             <th>Active</th>
             <th>Commit Message</th>
             <th>Commit Sha1</th>
           </tr>
         </thead>
         <tbody>
           {branches.map((branch,i) =>     
               <tr>
             <td>{branch.m_BranchName}</td>
             <td>{branch.m_IsActive? "Yes" : "No"}</td>
             <td>{branch.m_CommitMessage}</td>
             <td>{branch.m_CommitSha1}</td>
           </tr>)}
         </tbody>
       </Table>
    </div>  
    );
}

return(
    <div className="repo">
        {renderBranchesTable()}
    </div>);
}