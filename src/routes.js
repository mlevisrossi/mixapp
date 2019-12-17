import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// components
import App from 'components/App';
import HomePage from "views/HomePage/HomePage.js";

var hist = createBrowserHistory();

const AppRoutes = () => 
    <App>
        <Switch>
            <Route path="/" component={HomePage} />
        </Switch>
    </App>;

export default AppRoutes;
