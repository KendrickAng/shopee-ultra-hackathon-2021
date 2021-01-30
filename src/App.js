import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Swipe } from './components/Swipe';
import './App.css';

import Layout from './components/Layout';
import Main from './components/Main';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={Main} />
                        <Route exact path='/swipe' component={Swipe} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
