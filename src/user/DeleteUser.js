import React,{Component} from "react";


class DeleteUser extends Component {
    deleteAccount=()=>{
        console.log("delete account");
    }
    deleteConfirmed=()=>{
        let answer=window.confirm("Are you sure you want to delete your account");//user gets to choose ok or cancel
        if(answer)//if the user said ok to delete
        {
          this.deleteAccount();
        }
    }
    render() { 
        return ( 
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                Delete Profile 
            </button>
         );
    }
}
 


export default DeleteUser;