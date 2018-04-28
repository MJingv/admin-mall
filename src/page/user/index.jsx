import React from 'react'
import User from 'api/user.jsx'
import {Table, message} from 'antd';

const _user = new User()

export default class  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            pageNum: 1,
        };
    }

    componentWillMount() {
        this.initData()
    }

    initData() {
        this.setState({
            loading: true,
        })
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState({
                data: res.list,
                loading: false,
            })
        }, err => {
            this.setState({
                data: [],
                loading: true,
            })
            message.error(err)
        })

    }

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',

        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',

        }];
        let that = this
        const pagination = {
            total: 100,
            current: this.state.pageNum,
            onChange(current) {
                console.log('Current: ', current);
                that.setState({
                    pageNum: current,
                })
                that.initData()
            }
        };

        return (
            <div>
                <Table columns={columns} dataSource={this.state.data} pagination={pagination}
                       loading={this.state.loading}/>
            </div>
        )

    }
}


