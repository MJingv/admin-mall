import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css'
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom'
import 'antd/dist/antd.css';
import Layout from 'components/layout/index.jsx'

//page
import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'
import Product from 'page/product/index.jsx'
import UserList from 'page/user/index.jsx'
import Order from 'page/order/index.jsx'
import Error from 'page/error/index.jsx'
import Register from 'page/user/register.jsx'

class App extends React.Component {

    render() {
        const LayoutRouter = (
            <Layout>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/product' component={Product}/>
                    <Route path='/order' component={Order}/>
                    <Route path='/user/index' component={UserList}/>
                    <Route path='/user/register' component={Register}/>
                    <Redirect exact from='/user' to="/user/index"/>
                    <Route component={Error}/>
                </Switch>
            </Layout>
        );

        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    {/*path='/'滞后*/}
                    <Route path='/' render={() => LayoutRouter}>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
