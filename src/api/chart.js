// 封装数据的网络接口

import instance from '../utils/myHttp.js'

export function apiGetChartData() {
    return instance({
        url: "/data/title",
        method: "POST"
    })
}