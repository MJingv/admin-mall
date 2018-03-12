import React from 'react';
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom'

//page
import ProductList from 'page/product/index/index.jsx'


class ProductRouter extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/product' component={ProductList}/>
                </Switch>
            </Router>
        )
    }
}

export default ProductRouter;
