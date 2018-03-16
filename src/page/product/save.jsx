import React from 'react'
import Product from 'api/product.jsx'
import {Table, message, Card, Badge, Divider} from 'antd';

const _product = new Product()

export default class  extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            productId: this.props.match.params.productId,
            data: [],
            loading: false,
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
        _product.getProductDetail(this.state.productId).then(res => {
            console.log(res)
            this.state.data.push(res);
            this.setState({
                imageHost: res.imageHost,
                data: this.state.data,
                loading: false,
            })
        }, err => {
            this.setState({
                data: '',
                loading: true,
            })
            message.error(err.msg)
        })

    }

    render() {
        const data = this.state.data;
        const t = this;
        const columns = [{
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '商品描述',
            dataIndex: 'subtitle',
            key: 'subtitle',

        }, {
            title: '当前状态',
            dataIndex: 'status',
            key: 'status',
            render(status) {
                return 1 === status ? '在售' : '告罄';
            }

        }, {
            title: '所属分类',
            dataIndex: 'parentCategoryId',
            key: 'parentCategoryId',
        }, {
            title: '商品价格',
            dataIndex: 'price',
            key: 'price',

        }, {
            title: '商品图片',
            dataIndex: 'mainImage',
            key: 'mainImage',
            render(mainImage) {
                return <img style={{maxHeight: '10rem'}} className='table-img' src={t.state.imageHost + mainImage}/>;
            }

        }];
        return (
            <div className='product-detail-page'>
                <Card bordered={false}>
                    <h2> 商品详情</h2>
                    <Divider style={{marginBottom: 32}}/>
                    <Table columns={columns} dataSource={this.state.data} pagination={false}
                           loading={this.state.loading}/>
                    <div className='product-detail'>
                        <h3>商品详情</h3>
                        <pre>{this.state.data.length === 0 ? '暂无数据' : this.state.data[0].detail}</pre>
                    </div>

                </Card>
            </div>
        )

    }
}


