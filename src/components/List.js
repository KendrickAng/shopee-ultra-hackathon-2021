import React, { Component } from 'react';
import { SET_TITLE } from '../helpers/constants';
import store from '../helpers/store';
import { Checkbox, Card, Row, Col, Badge } from 'antd';

import Recipes from '../data/recipes.json';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            recipe: null
        }

        this.state.id = this.props.match.params.id;
        const recipe = Recipes.find((x) => x.id == this.state.id);

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

        this.handleChange = this.handleChange.bind(this);
        this.handleIngredient = this.handleIngredient.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.value]: event.target.checked
        });
        console.log(event.target.value);
    }

    handleIngredient(checked, ingredient) {
        if (!checked) {
            // Don't bring the user to the item listing page since have alr
            // Should go to /browse/:ingredient
            this.props.history.push('/browse/' + ingredient);
            console.log(ingredient);
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

        const testData = ["garlic", "rice", "onion"];

        return (
            <div>
                { Object.keys(this.state.recipe.ingredients).map((k) => {
                    return (
                        <Row align="middle">
                            <Col>
                                <Checkbox
                                    onChange={this.handleChange}
                                    value={k}
                                    style={{ "transform": "scale(1.8)" }}
                                    disabled={testData.includes(k)}
                                    defaultChecked={testData.includes(k)}
                                />
                            </Col>
                            <Col span={1} />
                            <Col flex="auto">
                                { testData.includes(k) &&
                                    <Badge.Ribbon text="Item added to cart" color="#26AA99">
                                        <Card
                                            bodyStyle={{ "font-size": "130%" }}
                                            bordered={true}
                                            onClick={() => this.handleIngredient(this.state[k], k)}
                                        >
                                            { this.state.recipe.ingredients[k] }
                                        </Card>
                                    </Badge.Ribbon>
                                }
                                { !testData.includes(k) &&
                                    <Card
                                        bodyStyle={this.state[k] ? { "font-size": "130%", "color": "lightgray" } : { "font-size": "130%" }}
                                        bordered={true}
                                        onClick={() => this.handleIngredient(this.state[k], k)}
                                    >
                                        { this.state.recipe.ingredients[k] }
                                    </Card>
                                }
                            </Col>
                        </Row>
                    );
                })}
            </div>
        );
    }
}

export default List;
