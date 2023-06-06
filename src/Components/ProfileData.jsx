import React from "react";
import {Card,ListGroup,Row} from 'react-bootstrap'
/**
 * Renders information about the user obtained from Microsoft Graph
 */
export const ProfileData = (props) => {

    return (
        <Row className="p-2"> 
        <Card style={{ width: '28rem' }}>
        <Card.Title> Dane profilu  </Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Imię: {props.graphData.givenName}</ListGroup.Item>
          <ListGroup.Item>Nazwisko: {props.graphData.surname}</ListGroup.Item>
          <ListGroup.Item>Mail: {props.graphData.userPrincipalName}</ListGroup.Item>
          <ListGroup.Item>Stanowisko: {props.graphData.jobTitle}</ListGroup.Item>
          <ListGroup.Item>Telefon komórkowy: {props.graphData.mobilePhone}</ListGroup.Item>
          <ListGroup.Item>Dzial: {props.graphData.officeLocation}</ListGroup.Item>
        </ListGroup>
        
      </Card>
     
            
          </Row>
 
    );
};