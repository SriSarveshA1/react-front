import React, { Component } from 'react';
import {isAuthenticated} from "../auth";
import {read} from "./apiUser";
import {signup} from '../auth/index';

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

    handleChange=(name)=>(event)=>{
       
        this.setState({[name]:event.target.value});//so even on the edit form we get when ever a value entered into the name field of the form will be grabbed here and setState will happen
      }
      
      clickSubmit=(event)=>{//when ever the button is submitted we take the values in state to backend
       //first we prevent the default behaviour of the user (default when the button is clicked the page reloads)
       event.preventDefault();
       const {name,email,password}=this.state;
       const user={ //user object contains the data that is required in backend to create a account
         name,email,password
       }

       console.log(user);
      /* signup(user).then((data)=>{
         if(data.error){
           //if the response we get has error as true then we just set that value in the state and it will get displayed
           return this.setState({error:data.error});
         }
         else{
           //if everything goes fine we make these values empty
           this.setState({
             error:"",
             name:"",
             email:"",
             password:"",
             open:true//when the input fields data that we entered successfully passed the validation then we need to set this as true so that the div block we created will be visible to disply the successfly created message
           });
         }
         
       });
       */
      }
      
    
    sighupForm=(name,email,password)=>(
        <form>
                <div className="form-group">
                  <lable className="text-muted"> Name</lable>
                  <input onChange={this.handleChange("name")}  type="text" className="form-control" value={name}/>{/* this form-Control class helps in proving the the connection between the user entered value and the server*/}
                </div>
                <div className="form-group">
                  <lable className="text-muted"> Email</lable>
                  <input onChange={this.handleChange("email")} type="email" className="form-control"  value={email} />{/* this form-Control class helps in proving the the connection between the user entered value and the server*/}
                </div>
                <div className="form-group">
                  <lable className="text-muted">Password</lable>
                  <input onChange={this.handleChange("password")} type="password" className="form-control"  value={password} />{/* this form-Control class helps in proving the the connection between the user entered value and the server*/}
                </div>
                
                <button  className="btn btn-raised btn-success" onClick={this.clickSubmit}> Update</button>
      </form>//*for each input field we have value=this.state.Inputfieldname  that is because what ever value that you enter in the input field that will be get updated in the state and also here it will .so this is called controlled componnents*/}
      );


    render() {
        const{name, email,password}=this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                 {this.sighupForm(name,email,password)}          
            </div>
        );
    }
}

export default EditProfile;