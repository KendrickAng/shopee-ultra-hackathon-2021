import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { withRouter } from "react-router";

class FloatingAddRecipes extends Component {
    render() {
        return (
            <Button
                shape="circle"
                type="primary"
                icon={<PlusOutlined style={{ "font-size": 45, "margin-top": 8, "margin-right": 2, "color": "#FFFFFF" }} />}
                size="large"
                style={{"position": "fixed", "bottom": 20, "right": 20, "width": 80, "height": 80, "background-color": "#26AA99", "border-color": "#26AA99"}}
                onClick={() => { this.props.history.push('/swipe') }}
            />
        )
    }
}

const FloatingAddRecipesWithRouter = withRouter(FloatingAddRecipes);
export default FloatingAddRecipesWithRouter;
