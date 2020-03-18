// 封装请求注册接口的js文件

// 导入axios
import axios from 'axios'

export function apiGetCode({code, phone}) {
    return axios({
        url: process.env.VUE_APP_ONLINEURL + "/sendsms",
        method: "post",
        data: {
            code: code,
            phone: phone
        },
        // 携带cookie跨域
        withCredentials: true
    })
}