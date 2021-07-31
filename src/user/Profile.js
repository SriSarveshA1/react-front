import React,{Component} from "react";
import {isAuthenticated} from "../auth";
class Profile extends Component{
    constructor()
    {
        super();
        this.state = {
            user:"",
            redirectToReferer:false//we have this bec
        }
    }
    componentDidMount(){
        console.log("user id fromt the router parameter",this.props.match.params.userId);
    }
    render() {
        return (
           <div className="Container">
               <h2 className="mt-5 mb-5">Profile</h2>
               <p>Hello {isAuthenticated().user.name}</p>
               <p>Email {isAuthenticated().user.email}</p>
           </div>
        );
    }
}
export default Profile;