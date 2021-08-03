import React, { Component } from "react";
import { findPeople,follow } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";
import {isAuthenticated} from "../auth";


class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [], 
            error:'',
            open:false,//when open becomes true which means we will display a message that will say like we successfully followed that user,
            followMessage:""
        };
    }

    componentDidMount() {
        //when ever this component mounted we need to call this findPeople method to get the details of the users and display
         const userId=isAuthenticated().user._id;
         const token=isAuthenticated().token;
        findPeople(userId,token).then(data => {//we need to use this method to retrive the data of the users whom we didnt follow
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    clickFollow=(user,i)=>{
        const userId=isAuthenticated().user._id;//this is the id of the logged in user
        const token=isAuthenticated().token;
        follow(userId,token,user._id)//user._id this is a id of the user whom we clicked follow in findPeople 
        .then(data => {
             if(data.error)
             {
                 this.setState({error:data.error});//we are storing the error if we cant follow that user
             }
             else{
                 //if the clicked user is successfully followed
                 let toFollow=this.state.users;//all the users in the users array or in the state can be followed
                 toFollow.splice(i,1);//so int the new set of users that we want to display as a suggested users we want to remove this index ith user which is already followed by the
                 this.setState({users:toFollow,open:true,followMessage:`Following ${user.name}`});//we are setting the new users to be followed  (updated suggested users to follow) and making the open as true
             }                                          //so when ever a open is becomming true we display the followMessage 
        })
    }
    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>
                    <img
                        style={{ height: "200px", width: "auto" }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
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
                        <button  onClick={()=>this.clickFollow(user,i)}  className="btn btn-raised btn-info float-right btn-sm">
                            Follow
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users,open,followMessage } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Find People</h2>
                {open &&(
                    <div className="alert alert-success">
                          <p>{followMessage}</p> {/* when the clicked user is successfully followed we just print this*/}
                   </div>
                )}
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;
