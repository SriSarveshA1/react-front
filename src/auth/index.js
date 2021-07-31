


export const signup=(user)=>{//this function will get the response and the response will be returned to the called line of this function so we can print the user about the validation mistakes
    return fetch(`${process.env.REACT_APP_API_URL}/signup`,{
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

  export const signin=(user)=>{//this function will get the response and the response will be returned to the called line of this function so we can print the user about the validation mistakes
    return fetch(`${process.env.REACT_APP_API_URL}/signin`,{
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

  export const authenticate=(jwt,callback)=>{
    if(typeof window!=="undefined")
    { 
      localStorage.setItem("jwt",JSON.stringify(jwt));
      callback();
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
        return fetch(`${process.env.REACT_APP_API_URL}/signout`,{
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

export const isAuthenticated=()=>{
    if(typeof window=="undefined")
    {
        //if there is not even window object generated we just return false and say not authenticated
        return false;
    }
    if(localStorage.getItem("jwt"))
    {
        //if the jwt is present in the local storage then the user is authenticated
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        //not authenticated
        return false;
    }

}

