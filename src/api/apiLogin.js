// 登录接口的封装

// 导入axios
import axios from 'axios'

export function apiLogin({
    userPhone,
    password,
    code
}) {
    return axios({
        url: process.env.VUE_APP_URL + "/login",
        method: "post",
        data: {
            phone: userPhone,
            password: password,
            code: code
        }
    })
}