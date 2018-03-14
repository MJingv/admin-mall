import React from 'react'
import {Link} from 'react-router-dom'
import Product from 'api/product.jsx'
import {Table, message, Input, Button, Icon, Switch, Select} from 'antd';

const _product = new Product();
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
        _product.getProductList().then((res) => {
            console.log(res)
        })
        _product.setProductStatus({
            productId: 26,
            status: 1,
        }).then(res => {
            console.log(res)
        })

    }

    componentWillMount() {
        this.initData()
    }

    searchFn() {
        this.setState({
            loading: true
        })
        _product.searchOrder(this.state.orderNo).then((res) => {
            this.setState({
                data: res.list,
                loading: false,
                orderTotal: res.total
            })
            console.log(res)
        }, (err) => {
            message.error(err.msg)
        })
    }

    initData() {
        this.setState({
            loading: true
        })
        _product.getProductList(this.state.pageNum).then(res => {
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
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '信息',
            dataIndex: 'name',
            key: 'name',

        }, {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render(text, record, index) {
                return (
                    <div>
                        {record.status === 1 ? '在售' : '告罄'}
                        <Switch checkedChildren="下架" unCheckedChildren="上架"
                                defaultChecked={record.status === 1 ? true : false}
                                onChange={() => {
                                    _product.setProductStatus({
                                        productId: record.id,
                                        status: record.status === 1 ? 2 : 1
                                    }).then((res) => {
                                            message.success(res.data)
                                            that.initData()
                                        }, (err) => {
                                            message.error(err.data)
                                        }
                                    )
                                }}/>
                    </div>
                )

            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render(text, record, index) {
                return (
                    <div>
                        <Link to={`/order/detail/${record.id}`}>详情</Link><br/>
                        <Link to={`/order/update/${record.id}`}>编辑</Link>
                    </div>

                )
            }
        },
        ];

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
                    <Select size='large' style={{maxWidth: 180, width: '100%'}} placeholder="选择查询方式">
                        <Option value="id">按商品id查询</Option>
                        <Option value="name">按商品名称查询</Option>
                    </Select>
                    <Input size='large' prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                           placeholder="关键字"
                           onChange={(e) => {
                               this.setState({
                                   orderNo: e.target.value
                               })
                           }}
                    />
                    <Button size='large' type="primary" className='search-button'>查询</Button>
                </div>
                <Table columns={columns} dataSource={this.state.data} pagination={pagination}
                       loading={this.state.loading}/>
            </div>
        )

    }
}


