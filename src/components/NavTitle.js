import { Menu } from "antd";
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        navTitle: state.navTitle
    };
};

const ConnectedNavTitle = ({ navTitle }) => (
    <Menu.Item><b><center>{ navTitle }</center></b></Menu.Item>
);

const NavTitle = connect(mapStateToProps)(ConnectedNavTitle);

export default NavTitle;
