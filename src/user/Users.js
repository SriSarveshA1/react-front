import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []//so here when this User component did mount(And rendered) we want the list of users that we stored to be kept in the users array and we want that to be put and displyed
        };
    }

    componentDidMount() {
        //when component mounts we are goint to make request and get all the users 
        //There is a list() promise method that is there in apiUser.js that is going to make an fetch request to the backend /GET and get the users and send response and here he handle the data request
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });//if there is no error we are setting the data that we got in the users object of the state
            }
        });
    }

    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>
                    <img //here we are going to display the image of the user profile
                        className="card-img-top"
                        src={DefaultProfile}//we give the default profile of every user from the avatar
                        alt={user.name}
                        style={{
                            width: "100%",
                            height: "15vw",
                            objectFit: "cover"
                        }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}//so when we click the Link the url will be put along with the userId and thus we will take to that particular user profile component
                            className="btn btn-raised btn-primary btn-sm"//{/*so when someone click this we will take them to that users profile*/}    
                        >
                            View Profile
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;
