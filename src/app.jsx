import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css'
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom'
import { DatePicker, Button} from 'antd';
import 'antd/dist/antd.css';

//page
import Home from 'page/home/index.jsx'

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Redirect from='*' to='/'></Redirect>
                    </Switch>
                </Router>

            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
