import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Swipe } from "./components/Swipe/Swipe";
import "./App.css";

import store from "./helpers/store";
import { setTitle } from "./helpers/actions";

import SiteLayout from "./components/SiteLayout";
import Main from "./components/Main";
import List from "./components/List";
import SavedRecipes from "./components/SavedRecipes";
import Steps from "./components/Steps";
import Browse from "./components/Browse";
import Cart from "./components/Cart";

window.store = store;
window.setTitle = setTitle;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SiteLayout>
          <Switch>
            <Route exact path="/" component={SavedRecipes} />
            <Route exact path="/swipe" component={Swipe} />
            <Route path="/shop/:id" component={List} />
            <Route path="/view/:id" component={Steps} />
            <Route exact path="/browse" component={Browse} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </SiteLayout>
      </BrowserRouter>
    );
  }
}

export default App;
