// 表单自定义校验规则

// 定义手机号校验方法;
export function checkPhone(rule, value, callback) {
    // 书写自己对于手机号的验证规则
    // 定义一正则表达式
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    // 判断参数是否匹配这个正则
    if (reg.test(value)) {
        // 说明匹配成功是正确的手机号
        callback(); // 继续向后执行
    } else {
        // 说明匹配不成功
        callback(new Error("手机号格式不正确"));
    }
}


export function checkEmail(rule, value, callback) {
    // 书写自己对于手机号的验证规则
    // 定义一正则表达式
    var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    // 判断参数是否匹配这个正则
    if (reg.test(value)) {
        // 说明匹配成功是正确的手机号
        callback(); // 继续向后执行
    } else {
        // 说明匹配不成功
        callback(new Error("邮箱不合法"));
    }
}