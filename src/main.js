import Vue from 'vue'
import App from './App.vue'

// 导入Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入axios
import axios from 'axios'
// 设置路由基地址
axios.defaults.baseURL = "http://127.0.0.1/heimamm/public"
// 设置axios全局使用
Vue.prototype.$axios = axios // 把axios写进Vue的原型中;

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入全局样式
import './style/index.css'
import './style/base.css'

Vue.config.productionTip = false

// 打印环境变量
// console.log(process.env.VUE_APP_NAME)
// console.log(process.env.VUE_APP_AGE)

// 导入vue-router的文件
import router from './router/index.js'

// 导入Vuex的store
import store from './store/index.js'

// 导入自己的过滤器(全局过滤器)
import "./filters/timeFilter.js"

// 导入全局组件
import subject from './components/subjectcom.vue'
import ep from './components/EP.vue'
import city from './components/myCity.vue'

// 使用全局样式
// 设置全局组件: 全局组件一旦导入可以在任意页面中使用, 不需要做其他任何操作
Vue.component("subjectcom", subject)
Vue.component("EPcom", ep)
Vue.component("myCity", city)

// 使用Element-ui
Vue.use(ElementUI);

// 使用富文本编辑器
Vue.use(VueQuillEditor)

// 导入ECharts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// Vue的实力
new Vue({
  render: h => h(App),
  router, // 将路由对象挂载到Vue实例中
  store
}).$mount('#app')