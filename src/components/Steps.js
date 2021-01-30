import React, { Component } from 'react';
import { SET_TITLE } from '../helpers/constants';
import store from '../helpers/store';
import Recipes from '../data/recipes.json';
import { Card, Row, Col, Button } from 'antd';
import FittedImage from 'react-fitted-image';

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: 0,
        recipe: null
    }
    this.state.id = this.props.match.params.id;
    const recipe = Recipes.find(x => x.id == this.state.id);

    if (recipe != null) {
        this.state.recipe = recipe;

        store.dispatch({
            type: SET_TITLE,
            payload: this.state.recipe.title
        });

        Object.keys(this.state.recipe.ingredients).forEach((x) => {
            this.state[x] = false
        });
    } else {
        store.dispatch({
            type: SET_TITLE,
            payload: "Unknown recipe"
        });
    }

}

render() {
  if (this.state.recipe == null) {
      return (
          <div>
              <p>ERROR: No such recipe with ID { this.state.id } exists!</p>
          </div>
      );
  }


  return (
      <div>
          <Col align="middle" style={colStyle}>
          <FittedImage
            fit="cover"
            style = {imageStyle}
            src={this.state.recipe.image}
          />
          <Card
            align="left"
            title = "Ingredients"
            extra={<Button type="primary" style ={butStyle} size="large" onClick={() => this.props.history.push('/shop/' + this.state.id)}>Purchase ingredients with Shopee</Button>}
            bodyStyle={{ "font-size": "100%" }}
            bordered={true}>
          { Object.keys(this.state.recipe.ingredients).map((k) => {

                    return (
                        <Row align="middle">
                            <Col flex="auto">
                            <ul>
                              <li>{ this.state.recipe.ingredients[k] }</li>
                            </ul>
                            </Col>
                        </Row>
                    );
                })}
            </Card>
            <Card
            align="left"
            title = "Steps"
            bodyStyle={{ "font-size": "100%" }}
            bordered={true}>
          { this.state.recipe.steps.split("\n").map(step=> {

                    return (
                        <Row align="middle">
                            <Col flex="auto">

                              <p>{ step }</p>

                            </Col>
                        </Row>
                    );
                })}
            </Card>
          </Col>
      </div>
  );
}
}

const butStyle ={
  align: 'middle',
  backgroundColor: "#EE4D2D",
  borderColor: "#EE4D2D",
  hoverable: "true",
}
const colStyle ={
  height: "350px"
}

const imageStyle = {
  height: "100%",
  width: "100%",
  margin: '10px',
  border: '0px solid pink',
  padding: '5px',
  justify: "end",
  align: 'middle',
  bordered: "true",
  borderColor: "black",
  hoverable: "true",
};
export default Steps;