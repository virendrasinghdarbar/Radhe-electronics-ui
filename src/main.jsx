import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/auth.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	
	<AuthProvider>
	<GoogleOAuthProvider clientId="207466176387-hcbmgbjpshm7b2dguccsi9ugqlivt5n3.apps.googleusercontent.com">
	<BrowserRouter>
	       <App />
	   </BrowserRouter>
	   </GoogleOAuthProvider>
	   </AuthProvider>
	  
);



