import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';

import store from './helpers/store';
import { setTitle } from './helpers/actions';

import SiteLayout from './components/SiteLayout';
import Main from './components/Main';
import SavedRecipes from './components/SavedRecipes';
import  Steps from './components/Steps';

window.store = store;
window.setTitle = setTitle;

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <SiteLayout>
                    <Switch>
                        <Route exact path='/' component={Main} />
                        <Route path='/components/Savedrecipes' component={SavedRecipes}/>
                        <Route path='/components/Steps' component={Steps}/>
                    </Switch>
                </SiteLayout>
            </BrowserRouter>
        );
    }
}

export default App;
