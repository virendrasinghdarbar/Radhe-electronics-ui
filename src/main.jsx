import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/auth.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider>
	<BrowserRouter>
	       <App />
	   </BrowserRouter>
	   </AuthProvider>
);


