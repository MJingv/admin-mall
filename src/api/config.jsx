import axios from 'axios';

export default class MUtil {
    request(param) {
        return new Promise((resolve, reject) => {
            // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            axios({
                method: param.method || 'get',
                url: param.url || '',
                data: param.data
            }).then((res) => {
                if (0 === res.data.status) {
                    resolve(res.data.data);
                } else {
                    reject(res.data);
                }
            }).catch((err) => {
                reject({
                    errcode: -1,
                    errmsg: JSON.stringify(err)
                });
            });
        });
    }

    //跳转登录
    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }

    //获取url参数
    getUrlParam(name) {
        //param=123&param1=333
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg)
        return result ? decodeURIComponent(result[2]) : null

    }

    errorTips(errMsg) {
        alert(errMsg || '发生错误')

    }
}