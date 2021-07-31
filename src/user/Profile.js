import React,{Component} from "react";
import {isAuthenticated} from "../auth";
import { Redirect } from "react-router";
import {read} from './apiUser'
class Profile extends Component{
    constructor()
    {
        super();
        this.state = {
            user:"",
            redirectToSignin:false//we have this bec
        }
    }
     
    
    init=(userId) =>{
        //here in this method we call the read() method that will that calls the fetch() method that returns the response after requesting backend and here in this method we work with the data
        const token=isAuthenticated().token;
        read(userId,token)
         .then(data => {//if the above part went to error we just console it or if it goes fine we just print the data
         if(data.error){
          this.setState({redirectToSignin:true});//so if the user is not authticated we ask the user to signin and make them redirect to signin
          }
         else{
           this.setState({user:data});//so we are setting the state user value with data we got after we successfully made a /post request to the signin route as we get extra information about the user in the data object
          }
          })
    };


    componentDidMount(){
        const userId=this.props.match.params.userId;//so using this way we can get the userid part of the parameter in the url
        //when the component mounts we grab the userId from the the parameter in the url and pass it to the init method
        this.init(userId);
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