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

// 使用Element-ui
Vue.use(ElementUI);

// 导入全局样式
import './style/index.css'
import './style/base.css'

Vue.config.productionTip = false

// 打印环境变量
// console.log(process.env.VUE_APP_NAME)
// console.log(process.env.VUE_APP_AGE)

// 导入vue-router的文件
import router from './router/index.js'
new Vue({
  render: h => h(App),
  router // 将路由对象挂载到Vue实例中
}).$mount('#app')