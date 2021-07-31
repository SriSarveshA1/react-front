//in this method we have helper methods that deals with the calls that we make with api 
import {isAuthenticated} from "../auth/index"



export const read=(userId,token)=>{//we created this fetch method to handle to sending post request to the backend to retrive the user data after authentication
    //we need to have the return before the fetch so that we get data as a returned value for the promise function line that is called
   return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{ //After retriving the userid from the url parameter and we need to make a get request along with the url to get the user information
        //And also we need to send the token in the header to show that we are authenticated
      method: "GET",
      headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
        Authorization:`Bearer ${isAuthenticated().token}`//the isAuthenticated() method returns the jwt as the response in json object and we just send the token property of the object in the Authorization 
       }
      })
    .then(response =>{
        return response.json();
     })
     .catch(error =>console.log(error))
}