import React, { Component } from "react";

import { SET_TITLE, HACKATHON_TOKEN, HACKATHON_USER_TOKEN, HACKATHON_API_ROOT } from "../helpers/constants";
import store from "../helpers/store";

import { connect } from "react-redux";
import { Card, Col, Row, Button } from "antd";
import { addToCart } from "../helpers/actions";
import Bridge from 'libraries/bridges';
import {getBuying, setBuying} from "../helpers/localStorage";

const { Meta } = Card;

const cardStyle = {
  width: "100%",
  height: "410px",
  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
};

const siteCardStyle = {
  marginLeft: "-5%",
  marginTop: "3%",
  marginRight: "-5%",
};

const iconStyle = {
  height: "100%",
  width: "100%",
  // shape: "cicle",
  // background: "#ee4d2d",
  fontSize: "200%",
  // marginTop: "-50%",
  // border: "0px solid black",
  // padding: "10px",
  alignment: "right",
  // bordered: "true",
  // borderColor: "black",
  // hoverable: "true",
};
class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      results: [],
      loading: true
    }
    this.state.keyword = this.props.match.params.keyword;

    var keywordCaps = "";
    if (this.state.keyword.length == 1) {
      keywordCaps = this.state.keyword.toUpperCase();
    } else if (this.state.keyword.length > 1) {
      keywordCaps = this.state.keyword.charAt(0).toUpperCase() + this.state.keyword.slice(1);
    }

    store.dispatch({
      type: SET_TITLE,
      payload: keywordCaps
    });
  }

  componentDidMount() {
    this.retrieveSearchApi();
  }

  static getSearchResults(results, keyword) {
    const items = results.data.items;
    let buying = getBuying();
    buying[keyword] = items.map((item) => item.item_id);
    setBuying(buying);

    return (
      items.map((item) => {
        return (
          <Col span={12}>
            <Card
              style={cardStyle}
              cover={<img src={item.cover} />}
              title={item.name}
              extra={"$" + item.price.toFixed(2)}
              align="middle"
            >
              <Button type="primary" onClick={() => {
                Bridge.openApp("hackathon://product?shopid=" + item.shop_id + "&itemid=" + item.item_id);
              }}>
                View item in store
              </Button>
            </Card>
          </Col>
        );
      })
    )
  }

  async retrieveSearchApi() {
    const headers = {
      "x-hackathon-token": HACKATHON_TOKEN,
      "x-user-token": HACKATHON_USER_TOKEN
    }
    const requestOptions = { method: 'GET', headers: headers }
    const response = await fetch(HACKATHON_API_ROOT + '/item/search?keyword=' + encodeURIComponent(this.state.keyword), requestOptions).then((res) => {
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
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Browse.getSearchResults(this.state.results, this.state.keyword);

    return (
      <div className="site-card-wrapper">
        <Row gutter={[20, 20]} style={siteCardStyle}>
          {contents}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
