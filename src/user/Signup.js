import {React,Component} from 'react';
import {signup} from "../auth";
class Signup extends Component {
  constructor() {
   super();//we need to call the Parent class(componenet class) constructor
   this.state={//this holds the properties that this component is gonna work with with
    name:"",
    email:"",
    password:"",
    error:"",
    open:false//we have this value initially set as false because that shows we dont have created account successfully yetttt....
   };
  }
  handleChange=(name)=>(event)=>{
    this.setState({error:""});//so when ever there is a change is happening on input field we will remove the error message
    this.setState({[name]:event.target.value});
  }
  clickSubmit=(event)=>{//when ever the button is submitted we take the values in state to backend
   //first we prevent the default behaviour of the user (default when the button is clicked the page reloads)
   event.preventDefault();
   const {name,email,password}=this.state;
   const user={ //user object contains the data that is required in backend to create a account
     name,email,password
   }
   signup(user).then((data)=>{
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
            <button  className="btn btn-raised btn-success" onClick={this.clickSubmit}> Submit</button>
  </form>//*for each input field we have value=this.state.Inputfieldname  that is because what ever value that you enter in the input field that will be get updated in the state and also here it will .so this is called controlled componnents*/}
  );
  render() {
    const {name, email, password,error,open}=this.state;
    return (
        <div className="container">{/* we are using the bootstrap classes as we already kept the cdn link of the bootstrap in our index.html page*/}
          <h2 className="mt-5 mb-5">Signup</h2>{/* this will give a bit of padding in bottom and up*/}

          <div className="alert alert-danger" style={{display:error?"":"none"}}>
            { error}
          </div>
          <div className="alert alert-primary" style={{display:open?"":"none"}}>
             New Account created successfully please signin.
          </div>
          {this.sighupForm(name,email,password)}
        </div>
    );
  }
}



export default Signup;