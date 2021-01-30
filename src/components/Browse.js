import React, { Component } from "react";
// import consts from "../../consts";
// import { get } from "./libraries/utils/fetch";

import { SET_TITLE, HACKATHON_TOKEN, HACKATHON_USER_TOKEN, HACKATHON_API_ROOT } from "../helpers/constants";
import store from "../helpers/store";

import { connect } from "react-redux";
import { Card, Col, Row } from "antd";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import { addToCart } from "../helpers/actions";

const { Meta } = Card;

const cardStyle = {
  width: "100%",
  height: "350px",
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

  handleClick = (id) => {
    this.props.addToCart(id);
  };

  static getSearchResults(results) {
    const items = results.data.items;
    return (
      items.map((item) => {
        return (
          <Col span={12}>
            <Card
              style={cardStyle}
              cover={<img src={item.img} />}
              onClick={() => {
                // this.handleClick(item.id);
                console.log(item.title);
              }}
            >
              <Meta
                title={<h3>{item.title}</h3>}
                description={
                  <div>
                    {item.desc}
                    <br></br>
                    {item.price}
                  </div>
                }
              />
              <PlusCircleFilled
                style={iconStyle}
                onClick={() => {
                  // this.handleClick(item.id);
                  console.log(item.price); // this triggers the event of clicking the whole card
                }}
              />
              <MinusCircleFilled
                style={iconStyle}
                onClick={() => {
                  // this.handleClick(item.id);
                  console.log(item.id); // this triggers the event of clicking the whole card
                }}
              />
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
    const response = await fetch(HACKATHON_API_ROOT + '/item/search', requestOptions).then((res) => {
      const out = res.text()
      console.log(out);
      return out.then(text => {
        const data = text && JSON.parse(text);

        if (!res.ok) {
          const error = (data && data.message) || res.statusText;
          return Promise.reject(error);
        }

        return data;
      });
    });
    console.log(response);
    this.setState({ results: response, loading: false });
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Browse.getSearchResults(this.state.results);

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
