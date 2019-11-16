import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// components
import App from 'components/App';
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import HomePage from "views/HomePage/HomePage.js";
import SettingsPage from "views/SettingsPage/SettingsPage.js";
import HotelsPage from "views/HotelsPage/HotelsPage.js";

var hist = createBrowserHistory();

const AppRoutes = () => 
    <App>
        <Switch>
            <Route path="/home" component={Components} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/hotels" component={HotelsPage} />
            <Route path="/landing-page" component={LandingPage} />
            <Route path="/profile-page" component={ProfilePage} />
            <Route path="/login-page" component={LoginPage} />
            <Route path="/" component={HomePage} />
        </Switch>
    </App>;

export default AppRoutes;
