import React, {Component} from 'react';
import echarts from 'echarts';
import 'echarts-gl';

import PropTypes from 'prop-types';

export default class extends Component {
    constructor() {
        super();
        this.chart = null;
    }

    componentDidMount() {

        const {onload} = this.props;

        const option = {
            grid: {
                left: 30,
                right: 20,
                top: 20,
                bottom: 20
            }
        };

        this.chart = echarts.init(this.refs.echart);

        Object.assign(option, this.props.option);

        this.chart.setOption(option);

        onload && onload(this.chart);

        window.addEventListener('resize', () => {
            this.chart.resize();
        }, false);
    }

    componentWillUnmount() {
        this.chart.dispose();
        this.chart = null;
    }

    componentWillReceiveProps({option}) {
        this.chart.setOption(option);
    }

    render() {
        const {className, style} = this.props;
        return (
            <div className={`main-chart ${className}`} ref="echart" style={style}></div>
        );
    }
}
