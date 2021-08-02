import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>{/* This componenet will let the React to choose a particular route based on the url its first match */ }
            <Route exact path="/" component={Home} />{/* This initial route / should always be bottom and then only the specific routes gets matched and executed or we can use exact keyword to make the route to get selected only if there is exact match */}
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/user/edit/:userId" component={EditProfile} />
            <Route exact path="/user/:userId" component={Profile} />
        </Switch>
    </div>
);

export default MainRouter;
