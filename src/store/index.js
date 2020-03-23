// vuex 的仓库

// 导入vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 用来管理数据
    state: {
        name: "Sam"
    }
})

// 暴露store
export default store