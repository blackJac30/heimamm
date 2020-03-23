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
// 导入index组件的子组件
import Chart from '../views/chart/index.vue'
import User from '../views/user/index.vue'
import Question from '../views/question/index.vue'
import Enterprise from '../views/enterprise/index.vue'
import Subject from '../views/subject/index.vue'

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
// 导入脚本
import NProgress from 'nprogress'
// 导入样式
import 'nprogress/nprogress.css'

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
        children: [{
                path: 'chart',
                component: Chart,
                meta: {
                    title: '数据概览'
                }
            },
            {
                path: 'user',
                component: User,
                meta: {
                    title: '用户列表'
                }
            },
            {
                path: 'question',
                component: Question,
                meta: {
                    title: '题库列表'
                }
            },
            {
                path: 'enterprise',
                component: Enterprise,
                meta: {
                    title: '企业列表'
                }
            },
            {
                path: 'subject',
                component: Subject,
                meta: {
                    title: '学科列表'
                }
            }
        ]
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
                    next();
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