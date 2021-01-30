import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        navTitle: state.navTitle
    };
};

const ConnectedNavTitle = ({ navTitle }) => (
  <h2>{ navTitle }</h2>
);

const NavTitle = connect(mapStateToProps)(ConnectedNavTitle);

export default NavTitle;
