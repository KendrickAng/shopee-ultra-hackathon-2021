import React, { Component } from 'react';
import { SET_TITLE, HACKATHON_TOKEN, HACKATHON_USER_TOKEN, HACKATHON_API_ROOT } from '../helpers/constants';
import store from '../helpers/store';
import { Checkbox, Card, Row, Col, Badge } from 'antd';

import Recipes from '../data/recipes.json';
import FloatingCart from './FloatingCart';
import {getHave, getBuying, setHave} from "../helpers/localStorage";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            recipe: null,
            inCart: [],
            havingKeywords: [],
            buyingKeywordsId: [],
            results: [],
            loading: true
        }
        this.state.id = this.props.match.params.id;
        this.state.havingKeywords = getHave();
        this.state.buyingKeywordsId = getBuying();
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

    componentDidMount() {
        this.retrieveCartItems().then(() => this.getItemsInCart());
    }

    handleChange(event) {
        this.setState({
            [event.target.value]: event.target.checked
        });

        let having = this.state.havingKeywords;

        if (event.target.checked) {
            having.push(event.target.value);
        } else {
            having.splice(having.indexOf(event.target.value));
        }

        this.setState({
            havingKeywords: having
        });
        setHave(this.state.havingKeywords);
    }

    handleIngredient(checked, ingredient) {
        if (!checked) {
            // Don't bring the user to the item listing page since have alr
            // Should go to /browse/:ingredient
            this.props.history.push('/browse/' + ingredient);
        }
    }

    getItemsInCart() {
        const items = this.state.results.data.items;
        items.forEach((item) => {
            return item.item_id;
        })
        this.setState({
            inCart: items
        })
    }

    async retrieveCartItems() {
        const headers = {
            "x-hackathon-token": HACKATHON_TOKEN,
            "x-user-token": HACKATHON_USER_TOKEN
        }
        const requestOptions = { method: 'GET', headers: headers }
        const response = await fetch(HACKATHON_API_ROOT + '/user/get_cart_items', requestOptions).then((res) => {
            return res.text().then(text => {
                const data = text && JSON.parse(text);

                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }

                return data;
            });
        });
        this.setState({ results: response, loading: false });
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
                { Object.keys(this.state.recipe.ingredients).map((k) => {
                    return (
                        <Row align="middle">
                            <Col>
                                <Checkbox
                                    onChange={this.handleChange}
                                    value={k}
                                    style={{ "transform": "scale(1.8)" }}
                                    disabled={Object.keys(this.state.buyingKeywordsId).includes(k) && this.state.buyingKeywordsId[k].some((x) => this.state.inCart.includes(x))}
                                    defaultChecked={(Object.keys(this.state.buyingKeywordsId).includes(k) && this.state.buyingKeywordsId[k].some((x) => this.state.inCart.includes(x))) || this.state.havingKeywords.includes(k)}
                                />
                            </Col>
                            <Col span={1} />
                            <Col flex="auto">
                                { Object.keys(this.state.buyingKeywordsId).includes(k) && this.state.buyingKeywordsId[k].some((x) => this.state.inCart.includes(x)) &&
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
                                { !(Object.keys(this.state.buyingKeywordsId).includes(k) && this.state.buyingKeywordsId[k].some((x) => this.state.inCart.includes(x))) &&
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
                { <FloatingCart /> }
            </div>
        );
    }
}

export default List;
