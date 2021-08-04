import React, { Component } from "react";
import {singlePost} from './apiPost'
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";

class SinglePost extends Component {
    state={
        post:''
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
                            <Link to="/" className="btn btn-raised btn-primary btn-sm">{/* Back to home*/}
                               Back to All posts
                            </Link>
                           
                        </div>
                
                    )
             
          
    }
    render() { 
        const {post}=this.state;
        return (
            <div className="container">
                <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
                
                {this.renderPost(post)}
            </div>
          );
    }
}
 
export default SinglePost;