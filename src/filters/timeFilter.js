// 封装处理时间的代码

// 导入vue
import Vue from 'vue'
// 导入moment插件
import moment from "moment";

Vue.filter("myTime", function (value) {
    return moment(value).format("YYYY-MM-DD")
})