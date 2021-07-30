import {React,Component} from 'react';

class Signup extends Component {
  constructor() {
   super();//we need to call the Parent class(componenet class) constructor
   this.state={//this holds the properties that this component is gonna work with with
    name:"",
    email:"",
    password:"",
    error:""
   };
  }
  handleChange=(name)=>(event)=>{
    this.setState({[name]:event.target.value});
  }
  clickSubmit=(event)=>{//when ever the button is submitted we take the values in state to backend
   //first we prevent the default behaviour of the user (default when the button is clicked the page reloads)
   event.preventDefault();
   const {name,email,password}=this.state;
   const user={ //user object contains the data that is required in backend to create a account
     name,email,password
   }
   //console.log(user); 
   fetch("http://localhost:8080/signup",{
     //these are the information that we are sending to the backend
     method:"POST",
     headers:{
        Accept: "application/json",
        "Content-Type": "application/json" //the conent type that we are passing should be json type
     },
     body:JSON.stringify(user)//we need to convert from the normal object to the JSON object
   })
   .then(response => {//so when the request made successfully
     return response.json();//we just return the response object
   })
   .catch(error =>console.log(error));//if the request was not successful 
  }
  render() {
    const {name, email, password}=this.state;
    return (
        <div className="container">{/* we are using the bootstrap classes as we already kept the cdn link of the bootstrap in our index.html page*/}
          <h2 className="mt-5 mb-5">Signup</h2>{/* this will give a bit of padding in bottom and up*/}
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
            <button  className="btn btn-raised btn-success" onClick={this.clickSubmit}> Submit</button>
          </form>{/*for each input field we have value=this.state.Inputfieldname  that is because what ever value that you enter in the input field that will be get updated in the state and also here it will .so this is called controlled componnents*/}
        </div>
    );
  }
}



export default Signup;