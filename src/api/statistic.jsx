import MUtil from 'api/config.jsx'

const _mm = new MUtil();


export default class Statistic {
    // 首页数据统计
    getHomeCount() {
        return _mm.request({
            url: '/manage/statistic/base_count.do'
        });
    }
}

