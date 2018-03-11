import MUtil from 'api/config.jsx'

const _mm = new MUtil();

export default class User {
    //这个接口只接受拼url的post
    login(loginInfo) {
        return _mm.request({
            method: 'post',
            url: `/manage/user/login.do?username=${loginInfo.username}&password=${loginInfo.password}`,
            data: loginInfo
        })
    }

    logout() {
        return _mm.request({
            method: 'post',
            url: '/user/logout.do'
        })
    }

    //验证登录信息
    checkLoginInfo(loginInfo) {
        let username = loginInfo.username.trim(), password = loginInfo.password.trim();
        if (typeof username !== 'string' || username.length === 0) {
            return {
                msg: '用户名不能为空',
                status: false
            }
        }
        if (typeof password !== 'string' || password.length === 0) {
            return {
                msg: '密码不能为空',
                status: false
            }
        }
        return {
            msg: '验证通过',
            status: true
        }
    }

    doRegister(registerInfo) {
        return _mm.request({
            type: 'post',
            url: '/user/register.do',
            data: registerInfo
        });
    }

    verifyUserName(userInfo) {
        return _mm.request({
            type: 'post',
            url: '/user/check_valid.do',
            data: userInfo
        });
    }



    getUserList(pageNum) {
        return _mm.request({
            type: 'post',
            url: '/manage/user/list.do',
            data: pageNum,
        });
    }


}