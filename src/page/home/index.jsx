import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Col, Row, message} from 'antd';
import Statistic from 'api/statistic.jsx'

const _statistic = new Statistic();

export default class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderCount: 0,
            productCount: 0,
            userCount: 0
        }
    }

    componentDidMount() {
        this.initData()
    }

    initData() {
        _statistic.getHomeCount().then((res) => {
            console.log(res)
            this.setState({
                orderCount: res.orderCount,
                productCount: res.productCount,
                userCount: res.userCount
            })
        }, err => {
            message.error(err)
        })
    }


    render() {
        const {orderCount, productCount, userCount} = this.state;
        return (

            <div style={{background: '#ECECEC', padding: '30px'}}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Link to="/user">
                            <Card title="用户总数" bordered={false}>{userCount}</Card>
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/product">
                            <Card title="商品总数" bordered={false}>{productCount}</Card>
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/order">
                            <Card title="订单总数" bordered={false}>{orderCount}</Card>
                        </Link>
                    </Col>
                </Row>
            </div>
        )

    }
}


