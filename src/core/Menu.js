import react from 'react';
import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import { signout,isAuthenticated } from '../auth/index';


const isActive =(history,path) => {
  if(history.location.pathname===path){
      return {color:"#ff9900"};
  }
  else{
      return {color:"#ffffff"}
  }
  }





const Menu=({history})=>( //here from the props that we got from the withRouter(Menu) we just destruct the history object  and using withRouter(Menu) component we get the current location also
    <div>
        <ul className="nav nav-tabs bg-success">
          <li className="nav-item">
              <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
          </li>
          {!isAuthenticated()&&(
              <React.Fragment>
                   <li class="nav-item">
                      <Link className="nav-link" style={isActive(history,"/signin")}  to="/signin">Signin</Link>
                   </li>
                   <li class="nav-item">
                      <Link className="nav-link" style={isActive(history,"/signup")}  to="/signup">Signup</Link>
                   </li>

              </React.Fragment>    
          )}
         
         
          {isAuthenticated()&&(//if and only if the user is authenticated we display and give an option for the user to signOut
             <React.Fragment>
              <li class="nav-item">
                <a className="nav-link" style={(isActive(history,"/signout"),{cursor:"pointer",color:"#fff"})} onClick={() =>signout(()=>history.push("/"))} >Signout</a>
             </li>

              <li class="nav-item">
               <Link className="nav-link" style={{color:"#fff"}}  to={`/user/${isAuthenticated().user._id}`} >{`${isAuthenticated().user.name}'s profile`}</Link>{/*The isauthenticated function if the user is authenticated the we will return the jwt(parsed object) as a response */}
              </li> 
             </React.Fragment>

           )}
           
         </ul>      
    </div>  
)



export default withRouter(Menu);