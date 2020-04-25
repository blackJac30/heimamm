// 导入axios
import axios from 'axios'

// 导入获取token的方法
import {
    getToken
} from '../utils/myToken.js'

const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 在这里将token设置到请求拦截器
    // 在请求头中添加token
    config.headers.token = getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 到处 instance 实例
export default instance