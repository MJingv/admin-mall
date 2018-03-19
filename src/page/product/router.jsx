import React from 'react';
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom'

//page
import ProductList from 'page/product/index.jsx'
import ProductDetail from 'page/product/detail.jsx'
import ProductSave from 'page/product/save.jsx'

class ProductRouter extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route  path='/product/index' component={ProductList}/>
                    <Route path='/product/detail/:productId' component={ProductDetail}/>
                    <Route path='/product/save/:productId?' component={ProductSave}/>
                    <Redirect exact from="/product" to="/product/index"/>
                </Switch>
            </Router>
        )
    }
}

export default ProductRouter;
