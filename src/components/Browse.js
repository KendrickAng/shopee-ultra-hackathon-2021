import React, { Component } from "react";
// import consts from "../../consts";
// import { get } from "./libraries/utils/fetch";

import { SET_TITLE } from "../helpers/constants";
import store from "../helpers/store";

import { connect } from "react-redux";
import { Card, Col, Row } from "antd";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import { addToCart } from "../helpers/actions";

const { Meta } = Card;

const inputIgredient = "Chicken";

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
    store.dispatch({
      type: SET_TITLE,
      payload: inputIgredient,
    });
  }

  handleClick = (id) => {
    this.props.addToCart(id);
  };

  render() {
    return (
      <div className="site-card-wrapper">
        <Row gutter={[20, 20]} style={siteCardStyle}>
          {this.props.items.map((item) => (
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
          ))}
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
