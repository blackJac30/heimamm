// 封装设置token的方法


// 设置token
export function setToken(value) {
    window.localStorage.setItem("heimamm", value)
}

// 获取token
export function getToken() {
    return window.localStorage.getItem("heimamm")
}

// 删除token
export function removeToken() {
    window.localStorage.removeItem("heimamm")
}