import React,{Component} from "react";
import {comment,uncomment} from './apiPost'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'; 


class Comment extends Component {
    state = {
        text:""
      }
      handleChange=event=>{
         this.setState({text:event.target.value});{/* what ever the users enter into the text area of the form we will store it in state*/}
      }
      addComment=e=>{
          e.preventDefault();
          const userId = isAuthenticated().user._id;
          const postId = this.props.postId;
          const token = isAuthenticated().token;
          //{text:this.state.text}//so this comment we have property called text which is same as the schema in the backend
          comment(userId,token,postId,{text:this.state.text})
          .then(data=>{
              if(data.error)
              {
                  console.error(data.error);
              }
              else{
                  this.setState({text:""});//we again make that comment adding form s fields empty
                  //and we need to add this newly created comment form into the comments in the comments array so they will be displayed in the post
                  this.props.updateComments(data.comments);//so when the new comment is added we call this method .

              }
          })
      }
    render() { 
        return ( 
            <div>
                <h2 className="mt-5 mb-5">Leave a Comment</h2>

                <form onSubmit={this.addComment}>
                    <div className="form-group">
                       <input type="text" onChange={this.handleChange} className="form-control"/>
                    </div>    
                     
                </form>
            </div>

         );
    }
}
 
export default Comment;
