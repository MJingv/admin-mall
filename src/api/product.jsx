import MUtil from 'api/config.jsx'

const _mm = new MUtil();


export default class Product {
    getProductList(pageNum) {
        return _mm.request({
            method: 'post',
            url: `/manage/product/list.do?pageNum=${pageNum}`,
            data: {
                pageSize: 10,
                pageNum: pageNum
            }
        });
    }

    setProductStatus(data) {
        console.log(data)
        return _mm.request({
            method: 'post',
            url: `/manage/product/set_sale_status.do?productId=${data.productId}&status=${data.status}`,
            data: data
        });
    }

    searchProduct(orderNo) {
        return _mm.request({
            method: 'post',
            url: `/manage/order/search.do?orderNo=${orderNo}`,
            data: {orderNo}
        });
    }

    getProductDetail(productId) {
        return _mm.request({
            method: 'post',
            url: `/manage/product/detail.do?productId=${productId}`,
            data: {productId}
        });

    }
}

