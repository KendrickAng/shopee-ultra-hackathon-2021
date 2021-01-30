import React, { Component } from "react";
import { Layout, Menu, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { withRouter } from "react-router";

import NavTitle from "./NavTitle";
import FloatingCart from "./FloatingCart";

const {  Content, } = Layout;

class SiteLayout extends Component {
  render() {
    return (
      <Layout className="layout" style={{ "padding-top": "55px" }}>
        <Menu
          style={{
            "background-color": "#EE4D2D",
            color: "#ffffff",
            "font-size": "130%",
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            "z-index": "1900",
          }}
          mode="horizontal"
        >
          <Row style={{ padding: "0 2em" }}>
            <Col span={3}>
              {this.props.location.pathname != "/" && (
                <Menu.Item
                  icon={<ArrowLeftOutlined />}
                  onClick={this.props.history.goBack}
                ></Menu.Item>
              )}
            </Col>
            <Col flex="auto">
              <NavTitle />
            </Col>
            <Col span={3}></Col>
          </Row>
        </Menu>
        <Content style={{ padding: "0 2em" }}>{this.props.children}</Content>
        <FloatingCart />
      </Layout>
    );
  }
}

const SiteLayoutWithRouter = withRouter(SiteLayout);
export default SiteLayoutWithRouter;
