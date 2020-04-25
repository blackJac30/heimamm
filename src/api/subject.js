// 封装所有与学科列表页面相关的网络请求
import instance from '../utils/myHttp.js'

// 封装请求学科的接口
export function apiGetSubject({
    name,
    page,
    limit,
    rid,
    username,
    status
}) {
    return instance({
        url: "/subject/list",
        params: {
            name: name,
            page: page,
            limit: limit,
            rid: rid,
            username: username,
            status: status
        }
    })
}

// 启用禁用
export function apiChangeStatus(id) {
    return instance({
        url: "/subject/status",
        method: "post",
        data: {
            id: id
        }
    })
}

// 新增学科的网络请求
export function apiAddSubject({
    rid,
    name,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: "/subject/add",
        method: "post",
        data: {
            rid: rid, // 学科编号
            name: name, // 学科名称
            short_name: short_name, // 简称
            intro: intro, // 简介
            remark: remark // 备注
        }
    })
}

// 编辑学科的网络请求
export function apiEditDialog({
    rid,
    name,
    short_name,
    intro,
    remark,
    id
}) {
    return instance({
        url: "/subject/edit",
        method: "post",
        data: {
            rid: rid, // 学科编号
            name: name, // 学科名称
            short_name: short_name, // 简称
            intro: intro, // 简介
            remark: remark, // 备注
            id: id
        }
    })
}

// 删除学科的网络请求
export function apiDelete(id) {
    return instance({
        url: "/subject/remove",
        method: "post",
        data: {
            id: id
        }
    })
}