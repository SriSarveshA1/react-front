import React,{ Component} from 'react';
import {follow,unfollow} from './apiUser'

class FollowProfileButton extends Component {
    followClick=()=>{
        this.props.onButtononClick(follow);
    }
    unfollowClick=()=>{
        this.props.onButtononClick(unfollow);
    }
    render(){
        return (
            <div className="d-inline-block ">
                                        {/* when a person click this follow button ClickFollowButton in profile will be called and an apicall follow() method will be invoke*/}
                {!this.props.following?(<button  onClick={this.followClick} className="btn btn-success btn-raised mr-5" >
                    Follow
                </button>):(<button   onClick={this.unfollowClick}  className="btn btn-warning btn-raised" >
                   UnFollow
                </button>)}
                {/* so we are displaying the follow button if the logged in user is not a followe of the user we visit or else we display unnfollow*/}
               
            </div>
        )
    }
}

export default FollowProfileButton;