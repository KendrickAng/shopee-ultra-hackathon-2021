import React, { Component } from 'react';
import { SET_TITLE } from '../helpers/constants';
import store from '../helpers/store';

class Main extends Component {
    constructor(props) {
        super(props);
        store.dispatch({
            type: SET_TITLE,
            payload: "Shopee Recipes"
        })
    }

    render() {
        return (
            <div>
                Main body
            </div>
        );
    }
}

export default Main;
