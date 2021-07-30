import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';

const MainRouter=()=>(
    <div>
        <Switch>{/* This componenet will let the React to choose a particular route based on the url its first match */ }
            <Route path="/signup" component={Signup}/>
            <Route path="/" component={Home}/>{/* This initial route / should always be bottom and then only the specific routes gets matched and executed */}
           
        </Switch>
    </div>
)

export default MainRouter;