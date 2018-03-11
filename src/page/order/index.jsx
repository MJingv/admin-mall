import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Col, Row, message} from 'antd';
import Order from 'api/order.jsx'

const _order = new Order();
export default class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.initData()
    }

    initData() {
        let pageInfo = {
            pageSize: 20,
            pageNumber: 2,
        }
        _order.getOrderList(pageInfo).then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div>
                i am order
            </div>
        )

    }
}


