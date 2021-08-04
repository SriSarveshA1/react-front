import React, { Component } from "react";
import {singlePost,remove} from './apiPost'
import DefaultPost from "../images/mountains.jpg";
import { Link,Redirect } from "react-router-dom";
import {isAuthenticated} from "../auth";

class SinglePost extends Component {
    state={
        post:'',
        redirectToHome:false
    }
    componentDidMount=()=>{
        const postId=this.props.match.params.postId;
        singlePost(postId)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log("data:",data)
                this.setState({post:data})
            }
        })
    }

    deletePost=()=>{
        //this method will call the remove method which will make a api request to backend
        const postId=this.props.match.params.postId;//we grab the postid 
        const token=isAuthenticated().token;//the authenticated user must be the one who created this post
        remove(postId,token)
        .then(data=>{
            if(data.error){
                console.error(data.error)
            }
            else{
                this.setState({redirectToHome:true});//so when this is true we redirect the user to the posts page
            }
        });
    }

    deleteConfirmed = () => {
        let answer = window.confirm(
            "Are you sure you want to delete your Post?"
        );
        if (answer) {
            this.deletePost();
        }
    };

    renderPost=(post) => {
        const posterId=post.postedBy?`/user/${post.postedBy._id}`:"";//so every post has a posterBy which says which user posted that post we need to get that userid if it exists or we simply dont display it
        const posterName=post.postedBy?post.postedBy.name:" Unknown";//so every post has a posterBy which says which user posted that post we need to get that usernameif it exists or we simply dont display it
        
                    return (
                   
                        <div className="card-body">
                                   {/* so we are using the route we created in backend to get the photo of the post and when the post doesnt have a picture we get error we handle that by displaying the default photo*/ }
                            <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} alt={post.title} onError={i=>i.target.src=`${DefaultPost} `} className="img-thumbnail mb-3" style={{height:'300px',width:"100%",objectFit:"cover"}} />
                           
                            <p className="card-text">{post.body}</p>{/* we want to display only the shorted content of the body*/}
                            <br/>
                            <p className="font-italic mark">{/* so in the bottom of the post card we will display the posted by and when we click it we will take us to the user who posted this post profile page */}
                                Posted by<Link to={`${posterId}`}>{posterName}{" "}</Link>
                                on {new Date(post.created).toDateString()} {/* so here we are just passing the post.created value of the post to the Date method and we conver it to string*/}
                            </p>
                            <div className="d-inline-block">
                            <Link to="/" className="btn btn-raised btn-primary btn-sm mr-5">{/* Back to home*/}
                               Back to All posts
                            </Link>
                            {isAuthenticated().user &&             //so if the user who is logged in and visiting his own profile we are display the edit profile and delete profile or else when he visits other users profile we will show follow and unfollow
                            isAuthenticated().user._id === post.postedBy._id &&
                            <React.Fragment>
                                 <button className="btn btn-raised btn-warning mr-5">
                                    Update post
                                </button>
                                <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">{/* when this method is clicked we call this deletepost method which will make an api cal to backend"*/}
                                    Delete post
                                </button>
                           
                           </React.Fragment>
                            }
                            </div>

                           
                        </div>
                
                    )
             
          
    }
    render() { 

        const{redirectToHome}=this.state;
        if(redirectToHome)
        {
            return <Redirect to="/" />
        }
        const {post}=this.state;
        return (
            <div className="container">
                <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
                {!post ? (//So if there is no post we got in the state we display loading and if there is a post we render it
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