// 封装题库列表的网络请求

import instance from '../utils/myHttp.js'

export function apiGetQuestionList({
    title,
    subject,
    enterprise,
    type,
    step,
    usernam,
    status,
    difficulty,
    create_date,
    page,
    limit
}) {
    return instance({
        url: '/question/list',
        method: "get",
        params: {
            title: title,
            subject: subject,
            enterprise: enterprise,
            type: type,
            step: step,
            usernam: usernam,
            status: status,
            difficulty: difficulty,
            create_date: create_date,
            page: page,
            limit: limit
        }
    })
}

export function apiChangeStatus(id) {
    return instance({
        url: "/question/status",
        method: "post",
        data: {
            id: id
        }
    })
}

export function apiDelete(id) {
    return instance({
        url: "/question/remove",
        method: "post",
        data: {
            id: id
        }
    })
}

export function apiAddQuestion(data) {
    return instance({
        url: "/question/add",
        method: "post",
        data: data
    })
}