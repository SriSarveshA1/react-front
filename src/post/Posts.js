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

    renderPosts = posts=> (
        <div className="row">
            {posts.map((post, i) => (//it will look through all the post and display
                <div className="card col-md-4" key={i}>
                    {/*
                    <img
                        style={{ height: "200px", width: "auto" }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />
                    */}
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.body}</p>
                        <Link
                            to={`/posts/${post._id}`}   //so when the user click the post they will be taken to the page where they can see the  entire post
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

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
