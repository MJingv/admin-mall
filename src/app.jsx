import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import './index.scss'
import 'font-awesome/css/font-awesome.min.css'
let a = 1;

ReactDOM.render(
    <div>hello wrold
        <div className='test'>{a}</div>
        <i className='fa fa-cart-arrow-down'></i>
    </div>,
    document.getElementById('app')
);