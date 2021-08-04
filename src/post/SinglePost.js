import React, { Component } from "react";
import {singlePost} from './apiPost'
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
    render() { 
        return (
            <div>
                <h2>Single Post</h2>
                
                {this.props.match.params.postId}
            </div>
          );
    }
}
 
export default SinglePost;