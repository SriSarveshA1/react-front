import react from 'react';
import {Link,withRouter} from 'react-router-dom';


const isActive =(history,path) => {
  if(history.location.pathname===path){
      return {color:"#ff9900"};
  }
  else{
      return {color:"#ffffff"}
  }

  }

export const signout =(callback) => {
    //callback function that we want to get executed soon after we remove the jwt from the local storage
    if(typeof window!=="undefined")
    {
        //so the window object must be available to remove the jwt from the local storage 
        window.localStorage.removeItem("jwt");//we remove the jwt key value pair
        callback();//as soon as we remove the jwt from the local storage we want the redirection page to be happen to home page /login page
        //after this we send response to the backend
        return fetch("http://localhost:8080/signout",{
            method:"GET"
        })
        //so if the sending get request to the backend went fine then we call the then method
        .then((res)=> {//here we send the response in the json format
          console.log("signout",res);
          return res.json();
        })
        .catch((err)=>console.log(err));//if there is error occured we just console log it
        
    }

}



const Menu=({history})=>( //here from the props that we got from the withRouter(Menu) we just destruct the history object  and using withRouter(Menu) component we get the current location also
    <div>
        <ul className="nav nav-tabs bg-success">
          <li className="nav-item">
              <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
          </li>
          <li class="nav-item">
              <Link className="nav-link" style={isActive(history,"/signin")}  to="/signin">Signin</Link>
          </li>
          <li class="nav-item">
              <Link className="nav-link" style={isActive(history,"/signup")}  to="/signup">Signup</Link>
          </li>
          <li class="nav-item">
              <a className="nav-link" style={(isActive(history,"/signout"),{cursor:"pointer",color:"#fff"})} onClick={() =>signout(()=>history.push("/"))} >Signout</a>
          </li>
           
         </ul>      
    </div>  
)



export default withRouter(Menu);