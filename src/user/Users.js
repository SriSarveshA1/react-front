import React,{Component} from "react";
import {list} from "./apiUser"


class Users extends Component {
    constructor() {
     super();
     this.state={
         users:[]//so here when this User component did mount(And rendered) we want the list of users that we stored to be kept in the users array and we want that to be put and displyed
     };
    }

    upstate=(data)=>{
        this.setState({users:data});
    }
    componentDidMount(){
        //when component mounts we are goint to make request and get all the users 
        //There is a list() promise method that is there in apiUser.js that is going to make an fetch request to the backend /GET and get the users and send response and here he handle the data request
        list().then((data) => {
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log('sds',data);
                this.upstate(data); //if there is no error we are setting the data that we got in the users object of the state
                console.log(this.state.users);
            } 
        });
    }

    render() { 
        const {users}=this.state;//the list of users we have in the object we put it into the users object
        //console.log("ccxcxc",users);
        return ( 
            <div className="container">
                <h2 className="mt-5 mb-5">Users </h2>
                <div className="card">
                       {
                       users.map((user,i) => {
                          return <div key={i}>
                             <p>{user.name}</p>
                           </div>
                       })
                    }
                  
                </div>
            </div>
         );
    }
}


export default Users;