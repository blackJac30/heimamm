// 封装首页的网络请求方法

// 导入axios
import axios from 'axios'
// 导入获取token的方法
import {
    getToken
} from '../utils/myToken'
// 创建一个axios实例对象
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

// 封装用户信息的接口
export function apiInfo() {
    return instance({
        url: '/info',
        method: 'GET',
        headers: {
            token: getToken()
        }
    })
}

// 封装一个用户退出的方法
export function apiLogout() {
    return instance({
        url: "/logout",
        headers: {
            token: getToken()
        }
    })
}