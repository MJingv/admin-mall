import React from 'react'
import {Link} from 'react-router-dom'
import Product from 'api/product.jsx'
import {Table, message, Input, Button, Icon, Switch, Select} from 'antd';
import MUtil from 'api/config.jsx'

const _mm = new MUtil();
const _product = new Product();
export default class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNum: 1,
            data: [],
            loading: false,
            searchValue: '',
            orderTotal: 0,
            searchWay: '',
        }

    }

    componentWillMount() {
        this.initData()
    }

    searchFn() {
        this.setState({
            loading: true
        })

        _product.searchProduct(
            `{${this.state.searchWay}:${this.state.searchValue}}`
        ).then((res) => {
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
                                            message.success(res)
                                            that.initData()
                                        }, (err) => {
                                            message.error(err)
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
                        <Link to={`/product/detail/${record.id}`}>详情</Link><br/>
                        <Link to={`/product/save/${record.id}`}>编辑</Link>
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
        const {Option} = Select
        return (
            <div>
                <div className='search-wrap'>
                    <Select size='large' style={{maxWidth: 180, width: '100%'}} placeholder="选择查询方式"
                            onSelect={(res) => {
                                this.setState({
                                    searchWay: res
                                })
                            }}>
                        <Option value="productId">按商品id查询</Option>
                        <Option value="productName">按商品名称查询</Option>
                    </Select>
                    <Input size='large' prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                           placeholder="关键字"
                           onChange={(e) => {
                               this.setState({
                                   searchValue: e.target.value
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


