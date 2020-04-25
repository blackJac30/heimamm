// vuex 的仓库

// 导入vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 用来管理状态数据
    state: {
        username: "",
        userimg: "",
        role: "" // 用户角色
    },
    mutations: {
        // 定义一个设置用户信息的方法(第一个参数用于是state)
        setuserInfo: function (state, payload) {
            state.username = payload.userName
            state.userimg = payload.userImg
        },
        // 定义一个设置用户角色的方法
        setRole: function (state, payload) {
            state.role = payload
        }
    }
})

// 暴露store
export default store