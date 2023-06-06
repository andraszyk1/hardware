
import './App.css';
import React from 'react';
import { Container } from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login, Logout, Header, CustomCarousel } from './Components';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { ComputersScreen, HomeScreen, LogsScreen, UsersScreen, UserProfileScreen } from './Screens';
function App() {
  return (
    <Container>
      <Header />
      {/* <UnauthenticatedTemplate>
        <CustomCarousel />
      </UnauthenticatedTemplate> */}
      {/* <AuthenticatedTemplate> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/logs" element={<LogsScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/computers" element={<ComputersScreen />} />
            <Route path="/userprofile" element={<UserProfileScreen />} />
            <Route path="/users" element={<UsersScreen />} />
          </Routes>
        </BrowserRouter>

      {/* </AuthenticatedTemplate> */}
    </Container>
  )
}


export default App;
