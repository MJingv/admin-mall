import originJsonp from 'jsonp'

export default function jsonp(url,data,option){
    //拼接字符串
    url += (url.indexOf('?')<0 ? '?':'&') +param(data)

    return new Promise((resolve,reject)=>{
        originJsonp(url,option,(err,data) => {
            if(!err){
                //success
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}

function param(data){
    let url = ''
    for(var k in data){
        let value = data[k] !== undefined ? data[k]:''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) :''
    //如果没有拼接，则除去第一个&
}
//？连接 &间隔
//http://www.xxx.com/Show.asp?id=77&nameid=2905210001&page=1
