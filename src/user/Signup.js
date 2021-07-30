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
  render() {
    return (
        <div className="container">{/* we are using the bootstrap classes as we already kept the cdn link of the bootstrap in our index.html page*/}
          <h2 className="mt-5 mb-5">Signup</h2>{/* this will give a bit of padding in bottom and up*/}
          <form>
            <div className="form-group">
              <lable className="text-muted"> Name</lable>
              <input type="text" className="form-control"/>{/* this form-Control class helps in proving the the connection between the user entered value and the server*/}
            </div>
            <div className="form-group">
              <lable className="text-muted"> Email</lable>
              <input type="email" className="form-control"/>{/* this form-Control class helps in proving the the connection between the user entered value and the server*/}
            </div>
            <div className="form-group">
              <lable className="text-muted">Password</lable>
              <input type="password" className="form-control"/>{/* this form-Control class helps in proving the the connection between the user entered value and the server*/}
            </div>
            <button  className="btn btn-raised btn-primary"> Submit</button>
          </form>
        </div>
    );
  }
}



export default Signup;