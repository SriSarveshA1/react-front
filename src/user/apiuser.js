export const read = (userId, token) => {
    //we created this fetch method to handle to sending post request to the backend to retrive the user data after authentication
    //we need to have the return before the fetch so that we get data as a returned value for the promise function line that is called
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        //After retriving the userid from the url parameter and we need to make a get request along with the url to get the user information
        //And also we need to send the token in the header to show that we are authenticated
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`//the isAuthenticated() method returns the jwt as the response in json object and we just send the token property of the object in the Authorization 
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (userId, token, user) => {
    console.log("userdata:",user);
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user//so we are sending a new form data to the server so we dont need to stringify
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (userId, token) => {
     //so here we are going to give backend request DELETE 
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`//the isAuthenticated() method returns the jwt as the response in json object and we just send the token property of the object in the Authorization 
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {//here we are making request to the GET request to the /users 
        method: "GET"
    })
        .then(response => {
            return response.json();//we send the response
        })
        .catch(err => console.log(err));
};
