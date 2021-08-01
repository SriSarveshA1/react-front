import React, { Component } from 'react';
import {isAuthenticated} from "../auth";
import {read} from "./apiUser"

class EditProfile extends Component {

     constructor() {
       super();
       this.state={
           id:"",
           name:"",
           email:"",
           password:""
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
            this.setState({id:data._id,name:data.name,email:data.email});//so we are setting the state user value with data we got after we successfully made a /post request to the signin route as we get extra information about the user in the data object
          }
          })
    };


    componentDidMount(){
        const userId=this.props.match.params.userId;//so using this way we can get the userid part of the parameter in the url
        //when the component mounts we grab the userId from the the parameter in the url and pass it to the init method
        
        this.init(userId);
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                
            </div>
        );
    }
}

export default EditProfile;