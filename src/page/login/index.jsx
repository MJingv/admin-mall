import {Form, Icon, Input, Button} from 'antd';
import React from 'react'
import './index.scss'
import axios from 'axios'

const {Item} = Form;

export default class  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        };
        axios.get('http://admintest.happymmall.com//manage/statistic/base_count.do')
            .then((res) => {
                console.log(res);
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e)


    }

    render() {
        const {userName, password} = this.state;
        return (
            <div className='background'>
                <Form className='form-wrap' onSubmit={this.handleSubmit}>
                    <Item className='form-item'>
                        <div className='form-logo'>Welcome to ADMIN MALL</div>
                    </Item>
                    <Item className='form-item'>
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="用户名/Username"
                               onChange={() => {
                                   this.setState({
                                       userName: userName
                                   })
                               }}
                        />
                    </Item>
                    <Item className='form-item'>
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码/Password"
                               onChange={() => {
                                   this.setState({
                                       password: password
                                   })
                               }}/>
                    </Item>
                    <Item className='form-item'>
                        <Button type="primary" htmlType="submit" className="form-button">
                            登录 Log in
                        </Button>
                    </Item>

                </Form>
            </div>
        );
    }
}
