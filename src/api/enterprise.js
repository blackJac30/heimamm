// 封装所有与企业列表页面相关的网络请求
import instance from '../utils/myHttp.js'

// 获取企业列表
export function apiGetEPDataList({
    name,
    page,
    limit,
    eid,
    username,
    status
}) {
    return instance({
        url: "/enterprise/list",
        method: "get",
        params: {
            name: name,
            page: page,
            limit: limit,
            eid: eid,
            username: username,
            status: status
        }
    })
}

// 状态(启用/禁用)
export function apiChangeStatus(id) {
    return instance({
        url: "/enterprise/status",
        method: "post",
        data: {
            id: id
        }
    })
}

// 删除
export function apiDelete(id) {
    return instance({
        url: "/enterprise/remove",
        method: "post",
        data: {
            id: id
        }
    })
}

// 新增企业
export function apiAddEP({
    eid,
    name,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: "/enterprise/add",
        method: "post",
        data: {
            eid: eid,
            name: name,
            short_name: short_name,
            intro: intro,
            remar: remark
        }
    })
}

// 编辑企业
export function apiEditEP({
    id,
    name,
    eid,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: "/enterprise/edit",
        method: "post",
        data: {
            id: id,
            name: name,
            eid: eid,
            short_nam: short_name,
            intro: intro,
            remark: remark
        }
    })
}