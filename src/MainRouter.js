import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/components/Signup";
import Signin from "./user/components/Signin";
import Profile from "./user/components/Profile";
import Users from "./user/components/Users";
import EditProfile from "./user/components/EditProfile";
import FindPeople from "./user/components/FindPeople";
import NewPost from "./post/components/NewPost";
import EditPost from "./post/components/EditPost";
import SinglePost from "./post/components/SinglePost";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./user/components/ForgotPassword";
import ResetPassword from "./user/components/ResetPassword";
import Admin from "./admin/Admin";

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
                exact
                path="/reset-password/:resetPasswordToken"
                component={ResetPassword}
            />
            <PrivateRoute exact path="/post/create" component={NewPost} />
            <Route exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute
                exact
                path="/post/edit/:postId"
                component={EditPost}
            />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute
                exact
                path="/user/edit/:userId"
                component={EditProfile}
            />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
        </Switch>
    </div>
);

export default MainRouter;
