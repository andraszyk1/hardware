
import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { ProfileData } from '../Components/ProfileData';
import { callMsGraph } from "../graph";
import { Container } from "react-bootstrap";
export default function UserProfileScreen() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        RequestProfileData()
    }, []);
    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
        });
    }



    return (
        <Container>
            {graphData && <ProfileData graphData={graphData} />}
        </Container>
    );
}
