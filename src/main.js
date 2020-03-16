import Vue from 'vue'
import App from './App.vue'

// 导入Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 使用Element-ui
Vue.use(ElementUI);

// 导入全局样式
import './style/index.css'
import './style/base.css'

Vue.config.productionTip = false

// 导入vue-router的文件
import router from './router/index.js'
new Vue({
  render: h => h(App),
  router // 将路由对象挂载到Vue实例中
}).$mount('#app')