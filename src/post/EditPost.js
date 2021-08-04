import React, { Component } from "react";
import {singlePost,update} from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class EditPost extends Component {
   constructor(props) {
       super();
       this.state = {
           id:'',
           title:'',
           body:'',
           error: '',
           redirectToProfile:false,
           fileSize:0,//so when there is any error while editing the form we just make this true and perform redirect
           loading:false,
           redirectToProfile:false //initially we keep this as false and once we create a post and got the response we make it true and perform redirect   
       }
   }
   
   init = postId => {
    singlePost(postId).then(data => {//so whenever we get a postId we pass to this method which returns the post data by using the post id
        if (data.error) {
            this.setState({ redirectToProfile: true });
        } else {
            this.setState({//no we set the information so that they can be populated correctly 
                id: data._id,
                title: data.title,
                body: data.body,
                error: ""
                
            });
        }
    });
};

componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;//so we will grab this post id in the url and send that to init method
    this.init(postId);
}
isValid = () => {
    const { title,body,fileSize} = this.state;
    if (fileSize > 100000) {                                       //making the loading screen to not visible as we display the validation errors
        this.setState({ error: "File size should be less than 100kb",loading: false});
        return false;
    }
    if (title.length === 0||body.length==0) {//if there is no title or body is there we need to show an erro
        this.setState({ error: "All fields are required",loading: false });
        return false;
     }  
    return true;
};
handleChange = name => event => {
    this.setState({ error: "" });
    const value =
        name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
};

clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
        const postId = this.state.id//so when the component rendered the id from the params is stored in the state
        const token = isAuthenticated().token;
                            
        update(postId, token, this.postData).then(data => {//this.postData is the data that we store in the state when ever we enter the values in some kind of form in the input field
            if (data.error) 
            {
                this.setState({ error: data.error });
            }
            else{
              //after getting creating post and getting the response and also all the fiels should be made empty  
              this.setState({ loading: false,title:"",body:"",photo:'',redirectToProfile:true});

            }
               
        });
    }
};

editPostForm = (title,body) => (
    <form>
        <div className="form-group">
            <label className="text-muted">Post Photo</label>
            <input
                onChange={this.handleChange("photo")}
                type="file"
                accept="image/*"
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label className="text-muted">Title</label>
            <input
                onChange={this.handleChange("title")}
                type="text"
                className="form-control"
                value={title}
            />
        </div>
        

        <div className="form-group">
            <label className="text-muted">Body</label>
            <textarea
                onChange={this.handleChange("body")}
                type="text"
                className="form-control"
                value={body}
            />
        </div>

       
        <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
        >
            Update Post
        </button>
    </form>
);
    render() { 
        const {title,body,redirectToProfile}= this.state;
           
        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }
        
        return (  
            <div className="container">
                <h2 className="mt-5 mb-5">{title}</h2>

                {this.editPostForm(title,body)}
            </div>
        );
    }
}
 
export default EditPost;