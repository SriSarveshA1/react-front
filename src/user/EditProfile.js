import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update } from "./apiUser";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            loading: false//to make the div block that displays loading or not

        };
    }

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error: ""
                });
            }
        });
    };

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    isValid = () => {
        const { name, email, password, fileSize } = this.state;
        if (fileSize > 100000) { //here we are validating the file size and if it is greater than 1mb then we need to raise the error
            this.setState({ error: "File size should be less than 100kb" });
            return false;
        }
        if (name.length === 0) {
            this.setState({ error: "Name is required" });
            return false;
        }
        // email@domain.com
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({ error: "A valid Email is required" });
            return false;
        }
        if (password.length >= 1 && password.length <= 5) {
            this.setState({
                error: "Password must be at least 6 characters long"
            });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });//so same as signin form we clear the error message displayed when there is a change in the input field
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;//here we are using event.target.files[0].size to retrive the size of the photo that is been uploaded
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize });//even while updating the state we need to change this
    };

    clickSubmit = event => { 
         //when ever the button is submitted we take the values in state to backend
       //first we prevent the default behaviour of the user (default when the button is clicked the page reloads)
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            update(userId, token, this.userData).then(data => {
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
                <label className="text-muted">Profile Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"//so we will be getting an file 
                    accept="image/*"//this will make the what ever may be the image format this will be accepted
                    className="form-control"
                />
            </div>
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
                    className="form-control "   
                    value={password}
                />
            </div>
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Update
            </button>
        </form>//*for each input field we have value=this.state.Inputfieldname  that is because what ever value that you enter in the input field that will be get updated in the state and also here it will .so this is called controlled componnents*/}
    );

    render() {
        const {
            id,
            name,
            email,
            password,
            redirectToProfile,
            error,
            loading
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />;
        }
        
        const photoUrl=id?`${process.env.REACT_APP_API_URL}/user/photo/${id}?{new Date().getTime()}`:`${DefaultProfile}`;//so if the id has some value which means the url has a id and we go the sepearate route we created for that id or else we go just show the DefaultProfile

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                <div
                    className="alert alert-danger" //so if there is any error we just show in this div block
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

                <img style={{height:"200px",width:"auto"}} 
                className="img-thumbnail"
                src={photoUrl} 
                onError={i=>(i.target.src=`${DefaultProfile}`)}
                alt={name}/> 
                {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default EditProfile;
