import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { Auth0Provider } from "@auth0/auth0-react";

const domain: string = process.env.REACT_AUTH_DOMAIN!;
const clientId: string = process.env.REACT_AUTH_CLIENT_ID!;
const redirectUri: string = process.env.REACT_REDIRECT_URI!;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Auth0Provider>
  ) as React.ReactElement
);
