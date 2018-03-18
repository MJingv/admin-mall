import React from 'react'
import Product from 'api/product.jsx'
import {Table, message, Card, Badge, Divider, Input, Select} from 'antd';

const _product = new Product();
const Option = Select.Option;


export default class  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectOptions: [],
            selectValue: '',
            selectSubValue: '',
            selectSubOptions: [],
            productId: this.props.match.params.productId,
            loading: false,
            imageHost: '',
            name: '',
            price: '',
            subtitle: '',
            mainImage: '',
            categoryId: '',
            stock: '',
            status: 1,//在售
        };
    }

    componentWillMount() {
        this.initData()
    }


    initData() {
        this.setState({
            loading: true,
        })
        this.getCategoryInfo()
        _product.getProductDetail(this.state.productId).then(res => {
            this.setState(res)
        }, err => {
            this.setState({
                loading: true,
            })
            message.error(err.msg)
        })

    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        })
    }

    onSelectChange(value, option) {
        this.setState({
            selectValue: value
        })
        this.getCategoryInfo(option.props.id)
    }


    getCategoryInfo(id) {
        let data = id ? {categoryId: id} : null,
            options = id ? this.state.selectSubOptions : this.state.selectOptions;
        options.length = 0;
        _product.getCategory(data).then(res => {
            res.map(item => {
                let id = item.id, name = item.name;
                options.push({
                    id, name
                })
            })
            this.setState(options)
        }, err => {
            this.setState({
                loading: true,
            })
            message.error(err.msg)
        })
    }


    render() {
        const {name, price, subtitle, mainImage,  stock, selectValue, selectSubValue, selectOptions, selectSubOptions} = this.state;
        return (

            <div className='product-detail-page'>
                <Card bordered={false}>
                    <h2> 商品详情</h2>
                    <Divider style={{marginBottom: 32}}/>


                    <h3>商品名称</h3>
                    <Input size="large" value={name} name='name' placeholder="please input"
                           onChange={e => this.onValueChange(e)}/>

                    <h3>商品描述</h3>
                    <Input size="large" value={subtitle} name='subtitle' placeholder="please input"
                           onChange={e => this.onValueChange(e)}/>


                    <h3>商品分类</h3>

                    <Select size="large" style={{width: '50%'}} defaultValue={selectValue}
                            onChange={(value, option) => this.onSelectChange(value, option)}>
                        {selectOptions.map((item, index) => {
                            return <Option key={`parent${index}`} value={item.name} id={item.id}>{item.name}</Option>

                        })}
                    </Select>
                    <Select size="large" style={{width: '50%'}} defaultValue={selectSubValue}
                            onChange={(value, option) => {
                                this.setState({
                                    selectSubValue: value
                                })
                            }}>
                        {selectSubOptions.map((item, index) => {
                            return <Option key={`sub${index}`} value={item.name} id={item.id}>{item.name}</Option>

                        })}
                    </Select>


                    <h3>商品价格</h3>
                    <Input size="large" addonAfter='元' value={price} name='price' placeholder="please input"
                           onChange={e => this.onValueChange(e)}/>

                    <h3>商品库存</h3>
                    <Input size="large" addonAfter='件' value={stock} name='stock' placeholder="please input"
                           onChange={e => this.onValueChange(e)}/>

                    <h3>商品图片</h3>


                    <div className='product-detail'>
                        <h3>商品详情</h3>

                    </div>

                </Card>
            </div>
        )

    }
}


