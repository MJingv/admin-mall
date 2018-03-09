import React from 'react'
import { Card, Col, Row } from 'antd';

export default class  extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="用户总数" bordered={false}>Card content</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="商品总数" bordered={false}>Card content</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="订单总数" bordered={false}>Card content</Card>
                    </Col>
                </Row>
            </div>
        )

    }
}


