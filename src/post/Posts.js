import React, { Component } from "react";
import { list } from "./apiPost";//so we will importing a method list that will give us the list of posts
//import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });//we are setting the posts with the data we get
            }
        });
    }

    renderPosts = posts=> {
       return (
          <div className="row">
            {posts.map((post, i) => { //it will look through all the post and display
                  const posterId=post.postedBy?`/user/${post.postedBy._id}`:"";//so every post has a posterBy which says which user posted that post we need to get that userid if it exists or we simply dont display it
                  const posterName=post.postedBy?post.postedBy.name:" Unknown";//so every post has a posterBy which says which user posted that post we need to get that usernameif it exists or we simply dont display it
                  return (
                  <div className="card col-md-4" key={i}>
                     
                      <div className="card-body">
                          <h5 className="card-title">{post.title}</h5>
                          <p className="card-text">{post.body.substring(0,100)}</p>{/* we want to display only the shorted content of the body*/}
                          <br/>
                          <p className="font-italic mark">{/* so in the bottom of the post card we will display the posted by and when we click it we will take us to the user who posted this post profile page */}
                              Posted by<Link to={`${posterId}`}>{posterName}{" "}</Link>
                              on {new Date(post.created).toDateString()} {/* so here we are just passing the post.created value of the post to the Date method and we conver it to string*/}
                          </p>
                          <Link
                              to={`/posts/${post._id}`}   //so when the user click the post they will be taken to the page where they can see the  entire post
                              className="btn btn-raised btn-primary btn-sm"
                          >
                              Read More
                          </Link>
                      </div>
                  </div>
                  )
            })}
           </div>
        );
    };

    render() {
        const { posts } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Recent Posts</h2>

                {this.renderPosts(posts)}
            </div>
        );
    }
}

export default Posts;
