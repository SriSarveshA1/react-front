import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";

class Signup extends Component {
    constructor() {
        super();//we need to call the Parent class(componenet class) constructor
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false//we have this value initially set as false because that shows we dont have created account successfully yetttt....
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });//so when ever there is a change is happening on input field we will remove the error message
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {//when ever the button is submitted we take the values in state to backend
        //first we prevent the default behaviour of the user (default when the button is clicked the page reloads)
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {//user object contains the data that is required in backend to create a account
            name,
            email,
            password
        };
        // console.log(user);
        signup(user).then(data => {
            //if the response we get has error as true then we just set that value in the state and it will get displayed
            if (data.error) this.setState({ error: data.error });
            else
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true//when the input fields data that we entered successfully passed the validation then we need to set this as true so that the div block we created will be visible to disply the successfly created message
                });
        });
    };

    signupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}//{/* this form-Control class helps in proving the the connection between the user entered value and the server*/}
                />
            </div>
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
                className="btn btn-raised btn-success"
            >
                Submit
            </button>
        </form>
    );

    render() {
        const { name, email, password, error, open } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please{" "}
                    <Link to="/signin">Sign In</Link>.
                </div>

                {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default Signup;
