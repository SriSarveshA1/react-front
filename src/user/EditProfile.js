import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update } from "./apiUser";
import { Redirect } from "react-router-dom";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false
        };
    }

    init = userId => {
        //here in this method we call the read() method that will that calls the fetch() method that returns the response after requesting backend and here in this method we work with the data
        const token = isAuthenticated().token;
        read(userId, token).then(data => {//if the above part went to error we just console it or if it goes fine we just print the data
            if (data.error) {
                this.setState({ redirectToProfile: true });//so if the user is not authticated we ask the user to signin and make them redirect to signin
            } else {
                this.setState({//so we are setting the state user value with data we got after we successfully made a /post request to the signin route as we get extra information about the user in the data object
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error: ""
                });
            }
        });
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;//so using this way we can get the userid part of the parameter in the url
        //when the component mounts we grab the userId from the the parameter in the url and pass it to the init method
        this.init(userId);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });//so even on the edit form we get when ever a value entered into the name field of the form will be grabbed here and setState will happen
    };

    clickSubmit = event => {
        //when ever the button is submitted we take the values in state to backend
       //first we prevent the default behaviour of the user (default when the button is clicked the page reloads)
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {//user object contains the data that is required in backend to create a account
            name,
            email,
            password: password || undefined
        };
        // console.log(user);
        const userId = this.props.match.params.userId;//so using this way we can get the userid part of the parameter in the url
        const token = isAuthenticated().token;

        update(userId, token, user).then(data => {
            if (data.error) this.setState({ error: data.error });
            else
                this.setState({
                    redirectToProfile: true
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
                    value={name}//* this form-Control class helps in proving the the connection between the user entered value and the server*/
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Update
            </button>
        </form> //*for each input field we have value=this.state.Inputfieldname  that is because what ever value that you enter in the input field that will be get updated in the state and also here it will .so this is called controlled componnents*/}
      
    );

    render() {
        const { id, name, email, password, redirectToProfile } = this.state;

        if (redirectToProfile) {
             //So once the user updated his profile this redirectToProfile will become true and Redirect will happen
            return <Redirect to={`/user/${id}`} />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>

                {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default EditProfile;
