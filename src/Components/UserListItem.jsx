import React from "react";
import Table from 'react-bootstrap/Table';
/**
 * Renders information about the user obtained from Microsoft Graph
 */
export default function (props){
    return (
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>displayName</th>
            <th>givenName</th>
            <th>jobTitle</th>
            <th>mail</th>
            <th>mobilePhone</th>
            <th>officeLocation</th>
            <th>preferredLanguage</th>
            <th>surname</th>
            <th>userPrincipalName</th>
          </tr>
        </thead>
        <tbody>
        {props.groupData.map((user,i)=>{
            return (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.displayName}</td>
            <td>{user.givenName}</td>
            <td>{user.jobTitle}</td>
            <td>{user.mail}</td>
            <td>{user.mobilePhone}</td>
            <td>{user.officeLocation}</td>
            <td>{user.preferredLanguage}</td>
            <td>{user.surname}</td>
            <td>{user.userPrincipalName}</td>
          </tr>
            )
        })}
        
        </tbody>
      </Table>      
    );
};