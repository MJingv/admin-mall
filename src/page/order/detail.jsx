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
            pageNum: 1,
            orderNo: ''
        };
    }

    componentWillMount() {
        this.initData()
    }

    initData() {
        this.setState({
            loading: true,
        })
        _order.getOrderList(this.state.pageNum).then(res => {
            console.log(res.list)
            this.setState({
                data: res.list,
                loading: false,
            })
        }, err => {
            this.setState({
                data: [],
                loading: true,
            })
            message(err)
        })

    }

    render() {
        return (
            <div>
                <Card bordered={false}>
                    <DescriptionList size="large" title="退款申请" style={{marginBottom: 32}}>
                        <Description term="取货单号">1000000000</Description>
                        <Description term="状态">已取货</Description>
                        <Description term="销售单号">1234123421</Description>
                        <Description term="子订单">3214321432</Description>
                    </DescriptionList>
                    <Divider style={{marginBottom: 32}}/>
                    <DescriptionList size="large" title="用户信息" style={{marginBottom: 32}}>
                        <Description term="用户姓名">付小小</Description>
                        <Description term="联系电话">18100000000</Description>
                        <Description term="常用快递">菜鸟仓储</Description>
                        <Description term="取货地址">浙江省杭州市西湖区万塘路18号</Description>
                        <Description term="备注">无</Description>
                    </DescriptionList>
                    <Divider style={{marginBottom: 32}}/>
                    <div className={styles.title}>退货商品</div>
                    <Table
                        style={{marginBottom: 24}}
                        pagination={false}
                        loading={loading}
                        dataSource={goodsData}
                        columns={goodsColumns}
                        rowKey="id"
                    />
                    <div className={styles.title}>退货进度</div>
                    <Table
                        style={{marginBottom: 16}}
                        pagination={false}
                        loading={loading}
                        dataSource={basicProgress}
                        columns={progressColumns}
                    />
                </Card>
            </div>
        )

    }
}


