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
            error:"",
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

    isValid=()=>{
        const { name, email, password } = this.state;
        if (name.length == 0) {
            this.setState({ error: "Name is required" });
            return false;
        }
        // email@domain.com
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {//the regular test is applied on email that will check @ and domain is there or not
            this.setState({ error: "A valid Email is required" });
            return false;
        }
        if (password.length >= 1 && password.length <= 5) {//so initially the password length is empty when the edit form is givin so that time no error will come and after entering some values that should be greater than 6
            this.setState({
                error: "Password must be at least 6 characters long"
            });
            return false;
        }
        return true;
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });//so even on the edit form we get when ever a value entered into the name field of the form will be grabbed here and setState will happen
    };

    clickSubmit = event => {
        //when ever the button is submitted we take the values in state to backend
       //first we prevent the default behaviour of the user (default when the button is clicked the page reloads)
        event.preventDefault();
        if(this.isValid())//if and only if the the  input data we entered is valid we call the below part
        {
            const { name, email, password } = this.state;
            const user = {//user object contains the data that is required in backend to create a account
            name,
            email,
            password: password || undefined//password can either be updated or not
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

        }
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
                className="btn btn-raised btn-success"
            >
                Update
            </button>
        </form> //*for each input field we have value=this.state.Inputfieldname  that is because what ever value that you enter in the input field that will be get updated in the state and also here it will .so this is called controlled componnents*/}
      
    );

    render() {
        const { id, name, email, password, redirectToProfile,error } = this.state;

        if (redirectToProfile) {
             //So once the user updated his profile this redirectToProfile will become true and Redirect will happen
            return <Redirect to={`/user/${id}`} />;
        }
        

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>

                <div className="alert alert-danger"  //so if there is any error we just show in this div block
                  style={{ display: error ? "" : "none" }}>
                {error}
               </div>

                {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default EditProfile;
