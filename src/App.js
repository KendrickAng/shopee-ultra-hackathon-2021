import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
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
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
