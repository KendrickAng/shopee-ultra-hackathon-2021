import React, { Component } from 'react';
import { SET_TITLE } from '../helpers/constants';
import store from '../helpers/store';
import recipe from '../data/recipes.json';

class Steps extends Component {
    constructor(props) {
      super(props);
      store.dispatch({
        type: SET_TITLE,
        payload: recipe.title
      })
    }render() {
        return (
           //send reciepe image, steps, ingredients
           <p></p>
        );
    }
}

export default Steps;