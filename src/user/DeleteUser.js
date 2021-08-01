import React,{Component} from "react";
import {isAuthenticated} from "../auth";
import {remove} from "./apiUser"
import {signout} from "../auth";
import {Redirect} from "react-router-dom";

class DeleteUser extends Component {
    state={
        redirect:false //we have this redirect to maintain that the user account is deleted or not .so if the user is deleted we keep this redirect as true
    };

    deleteAccount=()=>{
         const token =isAuthenticated().token;
         const userId=this.props.userId;
         remove(userId,token)//this method will send DELETE request to the backend
         .then(data => {
             if(data.error)
             {
                 console.log(data.error);
             }
             else{
                 //signout user and the signout takes a function as an argument 
                 signout(()=>{
                     console.log("User is deleted")
                 })
                 //redirect user by making the redirect to true in the state
                 this.setState({redirect:true});

             }
         })
    }
    deleteConfirmed=()=>{
        let answer=window.confirm("Are you sure you want to delete your account");//user gets to choose ok or cancel
        if(answer)//if the user said ok to delete
        {
          this.deleteAccount();
        }
    }
    render() { 
        if(this.state.redirect)
        {
            //if the redirect is true then the user clicked the deleteuser button which made the signout and we redirect the  user to the homepage
            return <Redirect to="/" />
        }
        return ( 
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                Delete Profile 
            </button>
         );
    }
}
 


export default DeleteUser;