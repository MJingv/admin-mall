import MUtil from 'api/config.jsx'

const _mm = new MUtil();


export default class Product {
    getProductList(pageNum) {
        return _mm.request({
            method: 'post',
            url: `/manage/product/list.do`,
            data: {pageNum}
        });
    }

    setProductStatus(data) {
        return _mm.request({
            method: 'post',
            url: `/manage/product/set_sale_status.do`,
            data: data
        });
    }

    searchProduct(data) {
        return _mm.request({
            method: 'post',
            url: '/manage/product/search.do',
            data: data
        });
    }

    getProductDetail(productId) {
        return _mm.request({
            method: 'post',
            url: `/manage/product/detail.do`,
            data: {productId}
        });

    }

    getCategory(data) {
        return _mm.request({
            method: 'post',
            url: '/manage/category/get_category.do',
            data: {data}
        });

    }

    saveProduct(data) {
        return _mm.request({
            method: 'post',
            url: '/manage/product/save.do',
            data: data
        });

    }
    // 检查保存商品的表单数据
    checkProduct(product){
        let result = {
            status: true,
            msg: '验证通过'
        };
        // 判断用户名为空
        if(typeof product.name !== 'string' || product.name.length ===0){
            return {
                status: false,
                msg: '商品名称不能为空！'
            }
        }
        // 判断描述不能为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length ===0){
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        // 验证品类ID
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return {
                status: false,
                msg: '请选择商品品类！'
            }
        }
        // 判断商品价格为数字，且大于0
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: '请输入正确的商品价格！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }
        return result;
    }
}


