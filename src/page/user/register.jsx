import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Col, Row, message} from 'antd';
import User from 'api/user.jsx'

const _user = new User()
export default class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.initData()
    }

    initData() {
        let registerInfo = {
            username: 'aa',
            password: 'aa',
            email: 'aa',
            phone: 'aa',
            question: 'aa',
            answer: 'aa',
        }
        _user.doRegister(registerInfo).then(res => {
            console.log(res)
        })

    }

    render() {
        return (
            <div>
                i am register
            </div>
        )

    }
}


