export const signup = user => {//this function will get the response and the response will be returned to the called line of this function so we can print the user about the validation mistakes
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
         //these are the information that we are sending to the backend
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"//the conent type that we are passing should be json type
        },
        body: JSON.stringify(user)//we need to convert from the normal object to the JSON object
    })
        .then(response => {//so when the request made successfully
            return response.json();//we just return the response object
        })
        .catch(err => console.log(err));//if the request was not successful 
};

export const signin = user => {//this function will get the response and the response will be returned to the called line of this function so we can print the user about the validation mistakes
     //console.log("sdsdsdsd=",process.env.REACT_APP_API_URL);
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {

          //these are the information that we are sending to the backend
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"//the conent type that we are passing should be json type
        },
        body: JSON.stringify(user)//we need to convert from the normal object to the JSON object
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
};

export const setName = (name, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("username", JSON.stringify(name));
        next();
    }
};

export const signout = next => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: "GET"
    })
        .then(response => {
            console.log("signout", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const socialLogin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};
