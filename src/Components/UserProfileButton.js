import React from "react";
import {Nav} from "react-bootstrap";


/**
 * Renders a button which, when selected, will open a popup for login
 */
export const UserProfileButton = ({children}) => {

    return (
         <Nav.Link href="/userprofile" variant="dark" className="ml-auto" >{children}</Nav.Link>
    );
}