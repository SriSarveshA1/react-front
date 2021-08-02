import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => (//the rest operator is gonna get the all the other arguments we passed
    // props means components passed down to this private route component
    <Route
        {...rest}//will take the rest of the props
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />//if ther user is authenticated this Component will be rendered or else will be redirected
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;