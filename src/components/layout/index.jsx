import React from 'react';
import {Layout, Menu, Icon, Avatar, Dropdown, Spin} from 'antd';

import './index.scss'

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

const menu = (
    <Menu selectedKeys={[]}>
        <Menu.Item key="logout"><Icon type="logout"/>退出登录</Menu.Item>
    </Menu>
);

export default class  extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            currentUser: {
                name: 'jehol'
            }
        }
    }

    render() {
        return (
            <Layout>
                <Sider>
                    <div className="logo"/>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                    >
                        <Menu.Item key="1">
                            <Icon type="pie-chart"/>
                            <span>首页</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="mail"/><span>商品</span></span>}>
                            <Menu.Item key="2">商品管理</Menu.Item>
                            <Menu.Item key="3">品类管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="mail"/><span>订单</span></span>}>
                            <Menu.Item key="4">订单管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="mail"/><span>用户</span></span>}>
                            <Menu.Item key="5">用户列表</Menu.Item>
                        </SubMenu>
                    </Menu>

                </Sider>
                <Layout>
                    <Header className='header' style={{background: '#fff', padding: 10}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={() => {
                                this.setState({
                                    collapsed: !this.state.collapsed
                                })
                            }}
                        />
                        {this.state.currentUser.name ?
                            <Dropdown overlay={menu} className='user'>
                                <div className='right-info'>
                                    <div>{`欢迎您，${this.state.currentUser.name}`}</div>
                                    <Avatar icon="user"/>
                                </div>
                            </Dropdown>
                            :
                            <Spin size="small" style={{marginLeft: 8}}/>
                        }
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                        Content
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        ADMIN MALL ©2018 Created by Jehol
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}


