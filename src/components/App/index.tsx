import * as React from 'react';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Swipe} from '../Swipe';
import Demo from '../Demo';
import 'antd/dist/antd.css';
import Home from 'screens/Home';

function App() {
    return (
        <Router>
            <Switch>
                {/* Remove the demo route if your app is ready! */}
                <Route path='/demo' component={Demo}/>
                <Route exact path="/swipe" component={Swipe}/>

                {/* Create your app routes here  */}
                <Route path='/' component={Home}/>
            </Switch>
        </Router>
    );
}

export default hot(App);
