import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: ""
        };
    }
    //Check Follow
    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            // one id has many other ids (followers) and vice versa
            return follower._id === jwt.user._id;
        });
        return match;
    };
    //even this method is for unfollow with the same data but the unfollow method we wrote on apiUser handles the put request to the /unfollow route with the same data 
    //the backend api call function is written in the apiUser.js and this clickFollowButton is passed along with the FollowProfileButton component and that will call this method
    clickFollowButton =(callapi)=>{
         //so when the user clicks the follow button in FollowProfileButton here in the profile component the state is also updated
         const userId=isAuthenticated().user._id;
         const token=isAuthenticated().token;
         callapi(userId,token,this.state.user._id)//we are calling the callapi with the userId that is the authenticated userId that is stored in localStorage and pass the token and also the current visited user profiles id
         .then(data=>{
             if(data.error){
                 this.setState({error:data.error});
             }
             // 
             else{
                 this.setState({user:data,following:!this.state.following});//so what ever may be the value of following we store the opostivve value when the user clicked clickfollowbutton
             }
         })
    }
    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                let following = this.checkFollow(data);//this data is a user whos profile we are currently in 
                this.setState({ user: data, following });                                               
                
               
            }
        });
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    render() {
        const { redirectToSignin, user } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />;

        const photoUrl = user._id
            ? `${process.env.REACT_APP_API_URL}/user/photo/${
                  user._id
              }?${new Date().getTime()}`
            : DefaultProfile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img
                            style={{ height: "200px", width: "auto" }}
                            className="img-thumbnail"
                            src={photoUrl}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={user.name}
                        />
                    </div>

                    <div className="col-md-6">
                        <div className="lead mt-2">
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(
                                user.created
                            ).toDateString()}`}</p>
                        </div>

                        {isAuthenticated().user &&             //so if the user who is logged in and visiting his own profile we are display the edit profile and delete profile or else when he visits other users profile we will show follow and unfollow
                            isAuthenticated().user._id === user._id ? (
                                <div className="d-inline-block">
                                    <Link
                                        className="btn btn-raised btn-success mr-5"
                                        to={`/user/edit/${user._id}`}
                                    >
                                        Edit Profile
                                    </Link>
                                    <DeleteUser userId={user._id} />
                                </div>
                            ):<FollowProfileButton following={this.state.following}  onButtononClick={this.clickFollowButton} /> //we will pass the status whether the logged in user follows this visited user or not based on the following status
                            }
                    </div>
                </div>
                <hr/>
                <ProfileTabs followers={user.followers} following={user.following}/>
                <div className="row">
                    <div className="col md-12 mt-5 mb-5">
                        <hr />
                        <p className="lead">{user.about}</p>
                        <hr />
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
