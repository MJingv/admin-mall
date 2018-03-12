import React from 'react'
import Order from 'api/order.jsx'
import {Table, message, Card, Badge, Divider} from 'antd';


const _order = new Order()

export default class  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            orderNo: '',
        };
    }

    componentWillMount() {
        this.initData()
    }

    initData() {
        this.setState({
            loading: true,
        })
        _order.getOrderDetail(1520856847608).then(res => {
            console.log(res)
            // this.setState({
            //     data: res.list,
            //     loading: false,
            // })
        }, err => {
            this.setState({
                data: [],
                loading: true,
            })
            message.error(err.msg)
        })

    }

    render() {
        return (
            <div>
                <Card bordered={false}>
                    基本信息
                    <Divider style={{marginBottom: 32}}/>

                    商品详情


                </Card>
            </div>
        )

    }
}


