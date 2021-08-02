import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";

class Signin extends Component {
    constructor() {
        super();//we need to call the Parent class(componenet class) constructor
        this.state = {//this holds the properties that this component is gonna work with with
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,//initially we wont direct to any of the page until the user properly signed in
            loading: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });//so when ever there is a change is happening on input field we will remove the error message
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {//when ever the button is submitted we take the values in state to backend
        //first we prevent the default behaviour of the user (default when the button is clicked the page reloads)
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {//user object contains the data that is required in backend to create a account
            email,
            password
        };
        // console.log(user);
        signin(user).then(data => {
            if (data.error) {
                 //if the response we get has error as true then we just set that value in the state and it will get displayed
                this.setState({ error: data.error, loading: false });
            } else {
                // authenticate
                 //if there is no error we need to authenticate the user and redirect them to the Home page or intended page
                authenticate(data, () => {
                    this.setState({ redirectToReferer: true });
                });
            }
        });
    };

    signinForm = (email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />{/* this form-Control class helps in proving the the connection between the user entered value and the server*/}
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />{/* this form-Control class helps in proving the the connection between the user entered value and the server*/}

            </div>
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Submit
            </button>
        </form>
    );

    render() {
        const {
            email,
            password,
            error,
            redirectToReferer,
            loading
        } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">{/* we are using the bootstrap classes as we already kept the cdn link of the bootstrap in our index.html page*/}
                <h2 className="mt-5 mb-5">SignIn</h2>{/* this will give a bit of padding in bottom and up*/}

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.signinForm(email, password)}
            </div>
        );
    }
}

export default Signin;
