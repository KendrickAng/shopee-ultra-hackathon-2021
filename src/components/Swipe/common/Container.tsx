// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';

const Container = (props) => {
    const styles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
    return (
        <div style={styles}>
            {props.children}
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.any,
}

export {Container};