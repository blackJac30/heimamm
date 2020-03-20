// 封装请求注册接口的js文件

// 导入axios
import axios from 'axios'

export function apiGetCode({
    code,
    phone
}) {
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: {
            code: code,
            phone: phone
        },
        // 携带cookie跨域
        withCredentials: true
    })
}

// 发送请求注册方法
export function apiRegister({
    username,
    phone,
    email,
    avatar,
    password,
    rcode,
}) {
    return axios({
        url: process.env.VUE_APP_URL + "/register",
        method: "post",
        data: {
            username: username,
            phone: phone,
            email: email,
            avatar: avatar,
            password: password,
            rcode: rcode
        }
    })
}