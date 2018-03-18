import React from 'react'
import Product from 'api/product.jsx'
import {Table, message, Card, Badge, Divider, Input, Select, Upload, Icon, Modal, Button} from 'antd';
import FileUploader from 'common/js/file-uploader.jsx'
import './index.scss'
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

const _product = new Product();
const Option = Select.Option;


export default class  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: '',
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
            subImages: [],
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
        this.getCategoryInfo();
        _product.getProductDetail(this.state.productId).then(res => {
            let images = res.subImages.split(',');
            this.editorInstance.setContent(res.detail, 'html');
            res.subImages = images.map((imgUri) => {
                return {
                    uri: imgUri,
                    url: res.imageHost + imgUri
                }
            });
            this.setState(res)
        }, err => {
            this.setState({
                loading: true,
            })
            message.error(err.msg)
        })

    }

    saveFn() {
        let data = {
            categoryId: this.state.categoryId,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.price),
            name: this.state.name,
            subtitle: this.state.subtitle,
            detail: this.state.detail,
            id: this.state.productId,
            subImages: this._getImagesString(this.state.subImages),
            status: this.state.status,
        }
        console.log(data)
        _product.saveProduct(data).then(res => message.error(res.data), err => message.error(err.data))
    }

    _getImagesString(arr) {
        return arr.map(item => (item.uri)).join(',')
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
        if (id) {
            _product.getCategory({categoryId: id}).then(res => {
                let {selectSubOptions} = this.state;
                selectSubOptions.length = 0;
                res.map(item => {
                    selectSubOptions.push({
                        id: item.id,
                        name: item.name
                    })
                })
                this.setState({selectSubOptions})
            }, err => {
                this.setState({
                    loading: true,
                })
                message.error(err.msg)
            })
        } else {
            _product.getCategory().then(res => {
                let {selectOptions} = this.state;
                res.map(item => {
                    selectOptions.push({
                        id: item.id,
                        name: item.name
                    })
                })
                this.setState({selectOptions})
            }, err => {
                this.setState({
                    loading: true,
                })
                message.error(err.msg)
            })
        }
    }

    onUploadSuccess(res) {
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({subImages})
    }

    onUploadError(err) {
        message.error(err)
    }

    handleHTMLChange(value) {
        this.setState({detail: value})
    }

    render() {
        const {productId, name, price, subtitle, subImages, detail, stock, selectValue, selectSubValue, selectOptions, selectSubOptions} = this.state;

        const editorProps = {
            contentFormat: 'html',
            placeholder: 'Hello World!',
            contentId: productId,
        }
        return (
            <div className='product-save-page'>
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
                    <div className='img-wrap'>
                        {
                            subImages.length ?
                                subImages.map((item, index) => (
                                    <img src={item.url} key={index}></img>
                                ))
                                : null
                        }
                        <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                      onError={(errMsg) => this.onUploadError(errMsg)}/>
                    </div>


                    <div className='product-detail'>
                        <h3>商品详情</h3>
                        <BraftEditor {...editorProps} onHTMLChange={::this.handleHTMLChange}
                                     ref={instance => this.editorInstance = instance}
                        />
                    </div>

                </Card>
                <Button size='large' type="primary" className='search-button' onClick={::this.saveFn}>保存提交</Button>

            </div>
        )

    }
}


