import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './core/Home'

const MainRouter=()=>(
    <div>
        <Switch>{/* This componenet will let the React to choose a particular route based on the url its first match */ }
            <Route path="/" component={Home}/>
        </Switch>
    </div>
)

export default MainRouter;