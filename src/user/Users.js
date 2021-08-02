import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>
                     <img style={{height:"200px",width:"auto"}} 
                    className="img-thumbnail" //so here when we are trying to get each user image we use separate route along with the respective user id 
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}  //*So when the user uploaded a profile pic to their profile then we can get the image using this sepearate route */}
                    onError={i=>(i.target.src=`${DefaultProfile}`)}
                    alt={user.name}//* so when the targeted user profile is not having a profile pic we get an error accessing it and that time we print the default image*/ }
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-primary btn-sm"
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
