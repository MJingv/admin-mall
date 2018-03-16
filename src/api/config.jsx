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

    //将post参数拼到url中
    createURL(url, obj) {
        url += url.includes('?') ? '' : '?';
        for (let key in obj) {
            url += `${key}=${obj[key]}&`
        }
        url = /.*&$/.test(url) ? url.substring(0, url.length - 1) : url
        return url
    }

    errorTips(errMsg) {
        return (errMsg || '发生错误');
    }

    setStorage(name, data) {
        let dataType = typeof data;
        let status = 0
        let msg = ''

        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data))
            status = 1
            msg = '本地保存信息成功'
        }
        else if (['number', 'string', 'boolean'].includes(dataType)) {
            window.localStorage.setItem(name, data)
            status = 1
            msg = '本地保存信息成功'
        } else {
            status = 0
            msg = '不可用于本地存储'
        }
        return {
            status, msg
        }
    }

    getStorage(name) {
        let data = window.localStorage.getItem(name);

        if (data) {
            return JSON.parse(data)
        }
        else {
            return ''
        }
    }

    removeStorage(name) {
        window.localStorage.removeItem(name)
    }


}