import React from "react";
import {Nav} from 'react-bootstrap';
import MicrosoftLogin from "react-microsoft-login";
import LoginContext from "../Contexts/login";
import { useContext } from "react";
export const LoginMs =(props) => {
  const {isLogin,userName,handleIsLogin,handleUserName}=useContext(LoginContext)
  const authHandler = (err, data) => {
    console.log(err, data);
    handleUserName(data.account.username)
    if(data.account.username!=='')
    handleIsLogin(true)
  };

  return (
    <> 
    {!isLogin ? 
    <MicrosoftLogin clientId="134221c1-cab5-4f41-a81c-3c3e50b9a3eb" authCallback={authHandler}/>
    :<Nav.Link href="/logout">{userName}</Nav.Link>
    }
    </>
  );
};
