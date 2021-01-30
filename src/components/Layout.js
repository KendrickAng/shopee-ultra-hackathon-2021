import React, { Component } from 'react';

import NavTitle from './NavTitle';

class Layout extends Component {
    render() {
        return (
            <div>
                <NavTitle />
                <p>{this.props.children}</p>
            </div>
        );
    }
}

export default Layout;
