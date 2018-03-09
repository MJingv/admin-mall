import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function register() {
    const url = 'http://admintest.happymmall.com//manage/statistic/base_count.do'
    const data = Object.assign({}, commonParams, {

    })
    return jsonp(url, data, options)
}
