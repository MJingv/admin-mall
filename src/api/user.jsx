import MUtil from 'api/config.jsx'

const _mm = new MUtil();

export default class User {
    //这个接口只接受拼url的post
    login(loginInfo) {
        return _mm.request({
            method: 'post',
            url: `/manage/user/login.do?username=${loginInfo.username}&password=${loginInfo.password}`,
            data:loginInfo
        })
    }

}