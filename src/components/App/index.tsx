import * as React from 'react';
import {Component} from "react";
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Demo from '../Demo';
import 'antd/dist/antd.css';

import store from "helpers/store";
import { setTitle } from "helpers/actions";

import SiteLayout from "components/SiteLayout";
import List from "components/List";
import SavedRecipes from "components/SavedRecipes";
import Steps from "components/Steps";
import Browse from "components/Browse";
import Cart from "components/Cart";
import {Swipe} from 'components/Swipe';

class App extends Component {
    render() {
        return (
            <Router>
                <SiteLayout>
                    <Switch>
                        <Route exact path="/" component={SavedRecipes}/>
                        <Route exact path="/swipe" component={Swipe}/>
                        <Route path="/shop/:id" component={List}/>
                        <Route path="/view/:id" component={Steps}/>
                        <Route path="/browse/:keyword" component={Browse}/>
                        <Route path="/cart" component={Cart}/>
                        {/* Remove the demo route if your app is ready! */}
                        <Route path='/demo' component={Demo}/>
                    </Switch>
                </SiteLayout>
            </Router>
        )
    }
}

export default hot(App);
