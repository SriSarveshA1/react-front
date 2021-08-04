export const create = (userId, token, post) => {
   
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: "POST",//while we create a post we use POST Method to send the request 
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {//this method is going to fetch all the posts
    return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singlePost=(postId)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));

}


export const listByUser = (userId,token) => {//this method is going to fetch all the posts
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};