import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css'
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom'
import 'antd/dist/antd.css';

//page
import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'
import Layout from 'components/layout/index.jsx'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    {/*path='/'滞后*/}
                    <Route path='/' render={props => (
                        <Layout>
                            <Switch>
                                {/*<Route exact path='/' component={Home}/>*/}
                                <Route path='/home' component={Home}/>
                            </Switch>
                        </Layout>
                    )}>

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
