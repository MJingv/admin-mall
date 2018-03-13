import React from 'react'
import Order from 'api/order.jsx'
import {Table, message, Card, Badge, Divider} from 'antd';
import './index.scss'

const _order = new Order()

export default class  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: this.props.match.params.orderNumber || '',
            data: [],
            loading: false,
            orderNo: '',
            imageHost: ''
        };
    }

    componentWillMount() {
        this.initData()
    }

    initData() {
        this.setState({
            loading: true,
        })
        _order.getOrderDetail(this.state.orderNo).then(res => {
            this.setState({
                imageHost: res.imageHost,
                data: res,
                loading: false,
            })
        }, err => {
            this.setState({
                data: [],
                loading: true,
            })
            message.error(err.msg)
        })

    }

    render() {
        let t = this
        const data = this.state.data
        const columns = [{
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName',
        }, {
            title: '照片',
            dataIndex: 'productImage',
            key: 'productImage',
            render(productImage) {
                return <img className='table-img' src={t.state.imageHost + productImage}/>;
            }
        }, {
            title: '数量',
            dataIndex: 'quantity',
            key: 'quantity',

        }, {
            title: '单价',
            dataIndex: 'currentUnitPrice',
            key: 'currentUnitPrice',
        }, {
            title: '合计',
            dataIndex: 'totalPrice',
            key: 'totalPrice',

        }];
        return (
            <div className='order-detail-page'>
                <Card bordered={false}>
                    基本信息
                    <Divider style={{marginBottom: 32}}/>
                    订单号：{data.orderNo}
                    创建时间：{data.createTime}
                    收件人：{data.receiverName}
                    订单状态：{data.statusDesc}
                    支付方式：{data.paymentTypeDesc}
                    订单金额：{data.payment}
                    <Divider style={{marginBottom: 32}}/>
                    <Table columns={columns} dataSource={this.state.data.orderItemVoList} pagination={false}
                           loading={this.state.loading}/>
                </Card>
            </div>
        )

    }
}


