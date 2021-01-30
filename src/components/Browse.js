import React, { Component } from "react";
import { SET_TITLE } from "../helpers/constants";
import store from "../helpers/store";
// import { get } from "libraries/utils/fetch";
import { connect } from "react-redux";
import { Card, Col, Row, Space } from "antd";

const { Meta } = Card;

const inputIgredient = "Chicken";

const cardStyle = {
  width: "100%",
  height: "350px",
  //   position: [, 0, 0, 0],
  //   borderRadius: "16px",
  //   marginLeft: "-15px",
  //   marginTop: "15px",
  //   marginRight: "15px",
  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
};

// function ItemSearch() {
//   const [keyword, setKeyword] = React.useState("");
//   const [isLoading, setIsLoading] = React.useState(null);
//   const [items, setItems] = React.useState(null);

//   const searchItem = React.useCallback(() => {
//     (async () => {
//       setIsLoading(true);
//       const response = await get(`${consts.API_URL}item/search`, {
//         keyword: keyword,
//         offset: 1,
//         limit: 4,
//       });
//       if (response && response.data && response.data.items) {
//         setItems(response.data.items);
//       }
//       setIsLoading(false);
//     })();
//   }, [keyword]);
// }

class Browse extends Component {
  constructor(props) {
    super(props);
    store.dispatch({
      type: SET_TITLE,
      payload: inputIgredient,
    });
  }

  render() {
    return (
      <div className="site-card-wrapper">
        {/* <Space size={1}> */}
        <Row
          gutter={[20, 20]}
          style={{ marginLeft: "-5%", marginTop: "3%", marginRight: "-5%" }}
        >
          {this.props.items.map((item) => (
            <Col span={12}>
              <Card style={cardStyle} cover={<img src={item.img} />}>
                <Meta title={item.title} description={item.desc} />
              </Card>
            </Col>
          ))}
        </Row>
        {/* </Space> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps)(Browse);
