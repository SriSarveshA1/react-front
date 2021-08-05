import React, { Component } from "react";
import { singlePost, remove,like,unlike } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class SinglePost extends Component {
    state = {
        post: "",
        redirectToHome: false,
        like:false,//to check whether the logged in user liked this post or not
        likes:0,//to find the previous likes of this post
        redirectToSignin:false//when an unauthorized user tries to like the post we redirect to signin
    };

    checkLike=(likes)=>{
        //first we check whether the user is logged in and then get the id
        const userId=isAuthenticated()&&isAuthenticated().user._id;
        let match=likes.indexOf(userId)!==-1;//this indexOf method checks whether the authenticated userId is there is list of users who liked if its not there it returns -1
        return match;
    }
    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {                                                //here we check the authenticated users id is there in the likes array or not
                this.setState({ post: data,likes:data.likes.length,like:this.checkLike(data.likes)});//when ever the component is mounted we get the likes from the backend and display it
            }
        });
    };

    likeToggle=()=>{
        //when ever the like button is clicked we call this method and if the like:false we call the like api call or like:true we call the unlike api call
        //here we check if the any unauthenticated user try to like our post we want them to signin 
        if(!isAuthenticated())
        {
            this.setState({redirectToSignin: true});
            return false; //so the below code will not run for an user who didnt logged
        }
        let callApi=this.state.like?unlike:like;
        const userId=isAuthenticated().user._id;
        const postId=this.state.post._id;
        const token=isAuthenticated().token;

        callApi(userId,token,postId)
        .then(data=>{
            if(data.error)
            {
                console.log(data.error);
            }
            else{
                this.setState({
                    like:!this.state.like,
                    likes:data.likes.length//new likes array length
                    });//previously if it is like we change to unlike and viceversa
            }
        })

    }


    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    deleteConfirmed = () => {
        let answer = window.confirm(
            "Are you sure you want to delete your account?"
        );
        if (answer) {
            this.deletePost();
        }
    };

    renderPost = post => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : " Unknown";
        const {like,likes}=this.state; 
    
        return (
            <div className="card-body">
                <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${
                        post._id
                    }`}
                    alt={post.title}
                    onError={i => (i.target.src = `${DefaultPost}`)}
                    className="img-thunbnail mb-3"
                    style={{
                        height: "300px",
                        width: "100%",
                        objectFit: "cover"
                    }}
                />
                
                {like?(//so if the user already liked the post we show green thumb or else red thumb to like it
                    <h3 onClick={this.likeToggle}><i className="fa fa-thumbs-up text-success bg-dark" style={{padding:'10px',borderRadius:'50%' }}/>{" "} {likes} Likes </h3>
                ):(
                    <h3 onClick={this.likeToggle}><i className="fa fa-thumbs-up text-warning bg-dark" style={{padding:'10px',borderRadius:'50%' }}/>{" "} {likes} Likes </h3>
                )}

                <p className="card-text">{post.body}</p>
                <br />
                <p className="font-italic mark">
                    Posted by <Link to={`${posterId}`}>{posterName} </Link>
                    on {new Date(post.created).toDateString()}
                </p>
                <div className="d-inline-block">
                    <Link
                        to={`/`}
                        className="btn btn-raised btn-primary btn-sm mr-5"
                    >
                        Back to posts
                    </Link>

                    {isAuthenticated().user &&
                        isAuthenticated().user._id === post.postedBy._id && (
                            <>
                                <Link
                                    to={`/post/edit/${post._id}`}
                                    className="btn btn-raised btn-warning btn-sm mr-5"
                                >
                                    Update Post
                                </Link>
                                <button
                                    onClick={this.deleteConfirmed}
                                    className="btn btn-raised btn-danger"
                                >
                                    Delete Post
                                </button>
                            </>
                        )}
                </div>
            </div>
        );
    };

    render() {
        const { post,redirectToHome,redirectToSignin } = this.state;
        if (redirectToHome) {
            return <Redirect to={`/`} />;
        }
        if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }


        
        return (
            <div className="container">
                <h2 className="display-2 mt-5 mb-5">{post.title}</h2>

                {!post ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    this.renderPost(post)
                )}
            </div>
        );
    }
}

export default SinglePost;
