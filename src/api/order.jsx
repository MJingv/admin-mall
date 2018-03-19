import MUtil from 'api/config.jsx'

const _mm = new MUtil();


export default class Order {
    getOrderList(pageNum) {
        return _mm.request({
            method: 'post',
            url: `/manage/order/list.do`,
            data: pageNum
        });
    }

    searchOrder(orderNo) {
        return _mm.request({
            method: 'post',
            url: `/manage/order/search.do`,
            data: {orderNo}
        });
    }

    getOrderDetail(orderNo) {
        return _mm.request({
            method: 'post',
            url: `/manage/order/detail.do`,
            data: {orderNo}
        });

    }
}

