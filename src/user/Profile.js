import React,{Component} from "react";
import {isAuthenticated} from "../auth";
import { Redirect } from "react-router";
class Profile extends Component{
    constructor()
    {
        super();
        this.state = {
            user:"",
            redirectToSignin:false//we have this bec
        }
    }
    componentDidMount(){
        const userId=this.props.match.params.userId;//so using this way we can get the userid part of the parameter in the url
        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{ //After retriving the userid from the url parameter and we need to make a get request along with the url to get the user information
                                                                  //And also we need to send the token in the header to show that we are authenticated
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:`Bearer ${isAuthenticated().token}`//the isAuthenticated() method returns the jwt as the response in json object and we just send the token property of the object in the Authorization 
            }
        })
        .then(response =>{
            return response.json();
        })
        .then(data => {//if the above part went to error we just console it or if it goes fine we just print the data
            if(data.error){
                this.setState({redirectToSignin:true});//so if the user is not authticated we ask the user to signin and make them redirect to signin
            }
            else{
               this.setState({user:data});//so we are setting the state user value with data we got after we successfully made a /post request to the signin route as we get extra information about the user in the data object
            }
        })
    }
    render() {
        const redirectToSignin=this.state.redirectToSignin;
        if(redirectToSignin)
        {
            //if this is true then the user is not authenticated
            return <Redirect to="/signin"/>
        }
        return (
           <div className="container">
               <h2 className="mt-5 mb-5">Profile</h2>
               <p>Hello {isAuthenticated().user.name}</p>
               <p>Email {isAuthenticated().user.email}</p>
               <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>{/*we are printing the date when the user joined*/}
           </div>
        );
    }
}
export default Profile;