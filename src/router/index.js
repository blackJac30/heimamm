// 配制路由js文件

// 导入Vue
import Vue from 'vue'
// 导入router
import VueRouter from 'vue-router'
// 使用vue-router(注册路由)
Vue.use(VueRouter)

// 解决二次点击报错问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

// 导入路由子组件
// 登录模块
import login from '../views/login/index.vue'
// 首页模块
import index from '../views/index/index.vue'

// 导入子组件的嵌套路由
import childRouter from '../router/childRouter.js'

// 导入操作token的方法
import {
    getToken
} from "../utils/myToken.js";

// 导入首页网络请求封装方法(判断token是否为真)
import {
    apiInfo
} from "../api/index.js";

// 导入Element-ui 的message提示框
import {
    Message
} from 'element-ui'

// 导入nprogress
// 导入进度条
import NProgress from 'nprogress'
// 导入样式
import 'nprogress/nprogress.css'

// 导入Vuex 的 store
import store from '../store/index.js'

// 创建一个新的vue-router对象
const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: "/login",
        component: login
    }, {
        path: '/index',
        component: index,
        meta: {
            roles: ["管理员", "老师", "学生", "超级管理员"]
        },
        children: childRouter
    }]
})

// 添加一个全局前置导航守卫: 当路由发送改变前执行
router.beforeEach((to, from, next) => {
    // 设置页面title
    var title = to.meta.title
    if (title) {
        document.title = title
    }

    // 设置进度条
    NProgress.start();

    // 判断请求的是否是登录页面
    if (to.path != "/login") {
        // 判断用户是否登录: 登录是否存在token
        if (!getToken()) {
            // 关闭进度条
            Message.error("请登录")
            // 关闭进度条
            NProgress.done();
            next("/login");
        } else {
            // 判断token是否为真
            apiInfo().then(res => {
                // 判断请求的返回值 200 是token为真
                if (res.data.code == 200) {
                    // window.console.log(res)
                    // 创建一个用户信息对象
                    var userInfo = {
                        // 设置用户名
                        userName: res.data.data.username,
                        // 设置用户头像
                        userImg: process.env.VUE_APP_URL + '/' + res.data.data.avatar
                    }
                    // 调用mutations中的方法
                    // 此时this的指向不对; 不能直接点出(Vue中可以)
                    // this.$store.commit("setuserInfo", userInfo)
                    // 在js中使用vuex 的 store 正确的方法:
                    store.commit("setuserInfo", userInfo)

                    // 在这里判断角色可以访问的路由地址
                    // 获取到登录返回的角色信息
                    const role = res.data.data.role

                    // 把请求回来的role保存到vuex仓库中, 作为公共属性
                    store.commit('setRole', role)

                    // 判断登录的账号角色是否能去往该路由地址
                    if (to.meta.roles.includes(role)) {
                        next();
                    } else {
                        // 执行这里面的代码证明当前角色没有权限访问路由
                        // 提示
                        Message.error("对不起, 没有权利访问")
                        // 关闭进度条
                        NProgress.done();
                    }
                }
                // 判断请求的返回值 206 是token假
                else if (res.data.code == 206) {
                    // 关闭进度条
                    Message.error("请登录")
                    NProgress.done();
                    next("/login");
                }
            });
        }
    } else {
        next();
    }
})

// 全局后置钩子: 路由发生改变后执行
// from: 发起跳转的路由
// to: 跳转到目标路由
router.afterEach(() => {
    // window.console.log(to, from)
    NProgress.done();
})

// 把vue-router对象暴露出去
export default router