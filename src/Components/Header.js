
import React from "react";
import { Container, Image, Nav, Row, Col, Navbar, NavDropdown, Badge } from 'react-bootstrap'

import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { UserProfileButton } from "./UserProfileButton";
import { useSelector } from "react-redux";

import { } from '../store'
function Header() {
  const { accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const profileName = accounts[0] && accounts[0].name;

  const { dataComputersCount } = useSelector((state) => { return state.computers });
  const { dataUsersCount } = useSelector((state) => { return state.users });

  return (<>
    <Row>
      <Col>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>
              <Image
                src="./images/Maflow.jpg"
                width="200"
                height="70"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Navbar.Brand href="/home">It hardware system</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* {isAuthenticated ? <> */}
                  <Nav.Link href="/logs">Logi</Nav.Link>
                  <Nav.Link href="/computers">Sprzęt {dataComputersCount ? <Badge bg="secondary">{dataComputersCount}</Badge> : ''}</Nav.Link>
                  <Nav.Link href="/users">Użytkownicy {dataUsersCount ? <Badge bg="secondary">{dataUsersCount}</Badge> : ''}</Nav.Link>
                  <NavDropdown title={profileName ? profileName : ""} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1"><UserProfileButton>Profil</UserProfileButton></NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2"><SignOutButton /></NavDropdown.Item>
                  </NavDropdown>
                  {/* </> 
                  : */}
                  <SignInButton />
                  {/* } */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Col>
    </Row>
  </>)
}
export default Header;