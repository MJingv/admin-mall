import {Form, Icon, Input, Button, message} from 'antd';
import React from 'react'
import './index.scss'
import User from 'api/user.jsx'
import MUtil from 'api/config.jsx'

const {Item} = Form;
const _user = new User();

const _mm = new MUtil();

export default class  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/',
        };
    }

    handleSubmit() {
        let loginInfo = {
                username: this.state.username,
                password: this.state.password
            },
            checkResult = _user.checkLoginInfo(loginInfo);
        if (checkResult.status) {
            //如果验证通过
            _user.login(loginInfo).then((res) => {
                let result = _mm.setStorage('userInfo', JSON.stringify(res));
                result.status ? message.success(result.msg) : message.error(result, msg);
                this.props.history.push(this.state.redirect)
            }).catch((errMsg) => {
                message.error(_mm.errorTips(errMsg.msg))
            })
        } else {
            message.error(_mm.errorTips(checkResult.msg))
        }
    }

    render() {
        return (
            <div className='background'>
                <Form className='form-wrap'>
                    <Item className='form-item'>
                        <div className='form-logo'>Welcome to ADMIN MALL</div>
                    </Item>
                    <Item className='form-item'>
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="用户名/Username"
                               onChange={(e) => {
                                   this.setState({
                                       username: e.target.value
                                   })
                               }}
                        />
                    </Item>
                    <Item className='form-item'>
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码/Password"
                               onChange={(e) => {
                                   this.setState({
                                       password: e.target.value
                                   })
                               }}/>
                    </Item>
                    <Item className='form-item'>
                        <Button type="primary" className="form-button" onClick={::this.handleSubmit}>
                            登录 Log in
                        </Button>
                    </Item>

                </Form>
            </div>
        );
    }
}
