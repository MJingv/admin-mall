import MUtil from 'api/config.jsx'

const _mm = new MUtil();


export default class Order {
    getOrderList(pageNum) {
        return _mm.request({
            method: 'post',
            url: `/manage/order/list.do?pageNum=${pageNum}`,
            data: {
                pageSize: 10,
                pageNum: pageNum || 1
            }
        });
    }

    searchOrder(orderNo) {
        return _mm.request({
            method: 'post',
            url: `/manage/order/search.do?orderNo=${orderNo}`,
            data: {orderNo}
        });
    }

    getOrderDetail(orderNo) {
        return _mm.request({
            method: 'post',
            url: `/manage/order/detail.do?orderNo=${orderNo}`,
            data: {orderNo}
        });

    }
}

