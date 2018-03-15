import React from 'react'
import Product from 'api/product.jsx'
import {Table, message, Card, Badge, Divider} from 'antd';
import './index.scss'

const _product = new Product()

export default class  extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            productId: this.props.match.params.productId,
            data: '',
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
            this.setState({
                imageHost: res.imageHost,
                data: res,
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
        const data = this.state.data
        return (
            <div className='order-detail-page'>
                <Card bordered={false}>
                    商品详情
                    <Divider style={{marginBottom: 32}}/>
                    商品名称
                    {data.name}
                    商品描述：{data.subtitle}
                    当前状态：{data.status}
                    所属分类：{data.parentCategoryId}
                    商品价格：{data.price}
                    商品库存：{data.stock}
                    商品图片
                    商品详情 {data.detail}
                    <Divider style={{marginBottom: 32}}/>

                </Card>
            </div>
        )

    }
}


