import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { remove } from "./apiUser";
import { signout } from "../auth";

class DeleteUser extends Component {
    state = {
        redirect: false//we have this redirect to maintain that the user account is deleted or not .so if the user is deleted we keep this redirect as true
    };

    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId, token).then(data => {//this method will send DELETE request to the backend
            if (data.error) {
                console.log(data.error);
            } else {
                // signout user
                signout(() => console.log("User is deleted"));
                // redirect
                this.setState({ redirect: true });
            }
        });
    };

    deleteConfirmed = () => {
        let answer = window.confirm(//user gets to choose ok or cancel
            "Are you sure you want to delete your account?"
        );
        if (answer) {
            this.deleteAccount();
        }
    };

    render() {
        if (this.state.redirect) {
               //if the redirect is true then the user clicked the deleteuser button which made the signout and we redirect the  user to the homepage
            return <Redirect to="/" />;
        }
        return (
            <button
                onClick={this.deleteConfirmed}
                className="btn btn-raised btn-danger"
            >
                Delete Profile
            </button>
        );
    }
}

export default DeleteUser;
