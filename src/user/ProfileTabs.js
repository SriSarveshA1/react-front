import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DefaultProfile from '../images/avatar.jpg'
class ProfileTabs extends Component {
    
    render() { 
        const{following,followers}=this.props;
        return (
            <div>
               <div className="row">
                   <div className="col-md-4">
                       <h3 className="text-primary">Followers</h3>
                       <hr/>
                       {followers.map((person,i)=>{
                           //we will take every person from the list of followers and display
                          (  <div key={i}>
                               <div className="row"> {/* we are displaying both the profile image and the name and if we click any of them we will be taken to the profile page of the user*/}
                                   <div>
                                       <Link to={`/user/${person._id}`}>
                                             
                                             <img className="float-left mr-2" height="30px" src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}//from the seperate route we have created for displaying the profile image of an user we are retrieving it 
                                             onError={i => (i.target.src = `${DefaultProfile}`)}//if some user didnt have a profile image we just show them the default profile image
                                             alt={person.name} />
                                             <div>
                                              <h3>{person.name}</h3>
                                             </div> 
                                       </Link>
                                       <p style={{clear:'both'}}>
                                        {person.about}
                                       </p>
                                   </div>   
                                       
                               </div>

                           </div>  
                         ) 

                       })}
                   </div>
               </div>
            </div>
          );
    }
}
 
export default ProfileTabs;