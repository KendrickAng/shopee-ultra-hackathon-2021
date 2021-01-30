import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { Component } from 'react';

class FloatingCart extends Component {
    render() {
        return (
            <Button
                shape="circle"
                type="primary"
                icon={<ShoppingCartOutlined style={{ "font-size": 45, "margin-top": 8, "margin-right": 2, "color": "#FFFFFF" }} />}
                size="large"
                style={{"position": "fixed", "bottom": 20, "right": 20, "width": 80, "height": 80, "background-color": "#EE4D2D", "border-color": "#EE4D2D"}}
                href="hackathon://cart"
            />
        )
    }
}

export default FloatingCart;
