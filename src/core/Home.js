import React from "react";
import Posts from "../post/components/Posts";

const Home = () => (
    <div>
        <div className="jumbotron bg-dark text-white">
            <h2>Home</h2>
            <p className="lead">Welcome to Virtual Discussions</p>
        </div>
        <div className="container">
            <Posts />
        </div>
    </div>
);

export default Home;
