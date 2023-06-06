export const msalConfig = {
  auth: {
    clientId: "134221c1-cab5-4f41-a81c-3c3e50b9a3eb",
    authority: "https://login.microsoftonline.com/73caa82e-a2f5-4255-82f3-9f1b7c4208a0",
    redirectUri: "https://192.168.60.112:3001/",
    knownAuthorities: ['https://login.microsoftonline.com/73caa82e-a2f5-4255-82f3-9f1b7c4208a0/oauth2/v2.0/token']
  },

};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read", "User.ReadBasic.All"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphGroupsEndpoint: "https://graph.microsoft.com/v1.0/users"
};