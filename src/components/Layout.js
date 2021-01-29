import React, { Component } from 'react';

class Layout extends Component {
    render() {
        return (
            <div>
                <h2>Header</h2>
                <p>{this.props.children}</p>
            </div>
        );
    }
}

export default Layout;
