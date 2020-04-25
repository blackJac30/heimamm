// 封装用户列表的网络请求

import instance from '../utils/myHttp.js'

// 获取用户列表
export function apiGetUserList({
    username,
    email,
    role_id,
    page,
    limit
}) {
    return instance({
        url: "/user/list",
        method: "get",
        params: {
            username: username,
            email: email,
            role_id: role_id,
            page: page,
            limit: limit
        }
    })
}

// 状态(启用/禁用)
export function apiChangeStatus(id) {
    return instance({
        url: "/user/status",
        method: "post",
        data: {
            id: id
        }
    })
}

// 用户新增
export function apiAddUser({
    username,
    email,
    phone,
    role_id,
    status,
    remark
}) {
    return instance({
        url: "/user/add",
        method: "post",
        data: {
            username: username,
            email: email,
            phone: phone,
            role_id: role_id,
            status: status,
            remark: remark
        }
    })
}

// 删除用户
export function apiDelete(id) {
    return instance({
        url: "/user/remove",
        method: "post",
        data: {
            id: id
        }
    })
}

// 编辑用户
export function apiEditUser({
    id,
    username,
    phone,
    email,
    avatar,
    password,
    remark,
    status,
    role_id
}) {
    return instance({
        url: "/user/edit",
        method: "post",
        data: {
            id: id,
            username: username,
            phone: phone,
            email: email,
            avatar: avatar,
            password: password,
            remark: remark,
            status: status,
            role_id: role_id
        }
    })
}