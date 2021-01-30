import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Swipe } from './components/Swipe/Swipe';
import './App.css';

import store from './helpers/store';
import { setTitle } from './helpers/actions';

import SiteLayout from './components/SiteLayout';
import Main from './components/Main';
// import List from './components/List';

window.store = store;
window.setTitle = setTitle;

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <SiteLayout>
                    <Switch>
                        <Route exact path='/' component={Main} />
                        <Route exact path='/swipe' component={Swipe} />
                        {/*<Route path='/shop/:id' component={List} />*/}
                    </Switch>
                </SiteLayout>
            </BrowserRouter>
        );
    }
}

export default App;
