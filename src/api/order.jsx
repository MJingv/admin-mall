import MUtil from 'api/config.jsx'

const _mm = new MUtil();


export default class Order {
    // 首页数据统计
    getOrderList(pageInfo) {
        return _mm.request({
            method:'post',
            url: '/manage/order/list.do',
            data: {
                pageSize: pageInfo.pageSize || 10,
                pageNum: pageInfo.pageNum || 1
            }
        });
    }
}

