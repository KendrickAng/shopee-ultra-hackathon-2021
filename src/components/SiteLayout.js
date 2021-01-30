import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';

import NavTitle from './NavTitle';

const { Header, Content, Footer } = Layout;

class SiteLayout extends Component {
    render() {
        return (
            <Layout className="layout">
                <Menu style={{ "backgroundColor": "#EE4D2D", "color": "#ffffff" }} mode="horizontal">
                    <Row style={{ padding: '0 2em' }}>
                        <Col span={8}>{ this.props.location.pathname != '/' && <Menu.Item icon={<ArrowLeftOutlined />} onClick={this.props.history.goBack}> Back</Menu.Item> }</Col>
                        <Col span={8}><NavTitle /></Col>
                        <Col span={8}></Col>
                    </Row>
                </Menu>
                <Content style={{ padding: '0 2em' }}>
                    {this.props.children}
                </Content>
            </Layout>
        );
    }
}

const SiteLayoutWithRouter = withRouter(SiteLayout);
export default SiteLayoutWithRouter;
