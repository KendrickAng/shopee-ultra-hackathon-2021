import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';

import store from './helpers/store';
import { setTitle } from './helpers/actions';

import SiteLayout from './components/SiteLayout';
import Main from './components/Main';

window.store = store;
window.setTitle = setTitle;

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <SiteLayout>
                    <Switch>
                        <Route exact path='/' component={Main} />
                    </Switch>
                </SiteLayout>
            </BrowserRouter>
        );
    }
}

export default App;
