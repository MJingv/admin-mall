import React from 'react'
import {Link} from 'react-router-dom'
import Order from 'api/order.jsx'
import {Table, message, Input, Button, Icon} from 'antd';
import './index.scss'

const _order = new Order();
export default class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNum: 1,
            data: [],
            loading: false,
            orderNo: '',
            orderTotal: 0,
        }
    }

    componentWillMount() {
        this.initData()
    }

    searchFn() {
        this.setState({
            loading: true
        })
        _order.searchOrder(this.state.orderNo).then((res) => {
            res.list.map((item, index) => {
                item.key = index
            })
            this.setState({
                data: res.list,
                loading: false,
                orderTotal: res.total
            })
        }, (err) => {
            message.error(err.msg)
            this.setState({
                loading: false,
            })

        })
    }

    initData() {
        this.setState({
            loading: true
        })

        _order.getOrderList({pageNum: this.state.pageNum}).then(res => {
            res.list.map((item, index) => {
                item.key = index
            })
            this.setState({
                data: res.list,
                loading: false,
                orderTotal: res.total
            })
        }, (err) => {
            message.error(err.msg)
        })
    }

    render() {
        let that = this
        const columns = [{
            title: '订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        }, {
            title: '收件人',
            dataIndex: 'receiverName',
            key: 'receiverName',

        }, {
            title: '订单状态',
            dataIndex: 'statusDesc',
            key: 'statusDesc',
        }, {
            title: '订单总价',
            dataIndex: 'payment',
            key: 'payment',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',

        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render(text, record, index) {
                return <Link to={`/order/detail/${record.orderNo}`}>详情</Link>
            }

        }];

        const pagination = {
            total: this.state.orderTotal,
            current: this.state.pageNum,
            onChange(current) {
                that.setState({
                    pageNum: current,
                })
                that.initData()
            }
        };
        return (
            <div>
                <div className='search-wrap'>
                    <Input size='large' prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                           placeholder="订单编号/OrderNo"
                           onChange={(e) => {
                               this.setState({
                                   orderNo: e.target.value
                               })
                           }}
                    />
                    <Button size='large' type="primary" className='search-button' onClick={::this.searchFn}>查询</Button>

                </div>


                <Table columns={columns} dataSource={this.state.data} pagination={pagination}
                       loading={this.state.loading}/>
            </div>
        )

    }
}


