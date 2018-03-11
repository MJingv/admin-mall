import React from 'react'
import {Button} from 'antd';
import {Link} from 'react-router-dom'

export default class  extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                抱歉，你访问的页面不存在
                <Link to="/home">
                    <Button>返回首页</Button>
                </Link>

            </div>
        )

    }
}


