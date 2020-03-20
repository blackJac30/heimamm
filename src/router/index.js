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
import login from '../views/login/index.vue'

// 创建一个新的vue-router对象
const router = new VueRouter({
    routes: [{
            path: "/login",
            component: login
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})
// 把vue-router对象暴露出去
export default router