import {React,Component} from 'react';

class Signin extends Component {
  constructor() {
   super();//we need to call the Parent class(componenet class) constructor
   this.state={//this holds the properties that this component is gonna work with with
    email:"",
    password:"",
    error:"",
    redirectToReferer:false//initially we wont direct to any of the page until the user properly signed in
    
   };
  }
  handleChange=(name)=>(event)=>{
    this.setState({error:""});//so when ever there is a change is happening on input field we will remove the error message
    this.setState({[name]:event.target.value});
  }
  clickSubmit=(event)=>{//when ever the button is submitted we take the values in state to backend
   //first we prevent the default behaviour of the user (default when the button is clicked the page reloads)
   event.preventDefault();
   const {email,password}=this.state;
   const user={ //user object contains the data that is required in backend to create a account
     email,password
   }
   this.signin(user).then((data)=>{
     if(data.error){
       //if the response we get has error as true then we just set that value in the state and it will get displayed
       return this.setState({error:data.error});
     }
     else{
      //if there is no error we need to authenticate the user and redirect them to the Home page or intended page
     }
   });
  }
  
  signin=(user)=>{//this function will get the response and the response will be returned to the called line of this function so we can print the user about the validation mistakes
    return fetch("http://localhost:8080/signin",{
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


  signinForm=(email,password)=>(
    <form>
      <div className="form-group">
              <lable className="text-muted"> Email</lable>
              <input onChange={this.handleChange("email")} type="email" className="form-control"  value={email} />{/* this form-Control class helps in proving the the connection between the user entered value and the server*/}
      </div>
      <div className="form-group">
              <lable className="text-muted">Password</lable>
              <input onChange={this.handleChange("password")} type="password" className="form-control"  value={password} />{/* this form-Control class helps in proving the the connection between the user entered value and the server*/}
      </div>
      <button  className="btn btn-raised btn-success" onClick={this.clickSubmit}> Submit</button>       
           
  </form>//*for each input field we have value=this.state.Inputfieldname  that is because what ever value that you enter in the input field that will be get updated in the state and also here it will .so this is called controlled componnents*/}
  );


  render() {
    const {email, password,error}=this.state;
    return (
        <div className="container">{/* we are using the bootstrap classes as we already kept the cdn link of the bootstrap in our index.html page*/}
          <h2 className="mt-5 mb-5">Signin</h2>{/* this will give a bit of padding in bottom and up*/}

          <div className="alert alert-danger" style={{display:error?"":"none"}}>
            { error}
          </div>
          
          {this.signinForm(email,password)}
        </div>
    );
  }
}



export default Signin;