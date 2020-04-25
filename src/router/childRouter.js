// 封装嵌套路由的js代码

// 导入index组件的子组件
import Chart from '../views/chart/index.vue'
import User from '../views/user/index.vue'
import Question from '../views/question/index.vue'
import Enterprise from '../views/enterprise/index.vue'
import Subject from '../views/subject/index.vue'

export default [{
        path: 'chart',
        component: Chart,
        meta: {
            title: '数据概览',
            roles: ["管理员", "老师", "超级管理员"],
            fullpath: "/index/chart",
            icon: "el-icon-info"
        }
    },
    {
        path: 'user',
        component: User,
        meta: {
            title: '用户列表',
            roles: ["管理员", "老师", "超级管理员"],
            fullpath: "/index/user",
            icon: "el-icon-user"
        }
    },
    {
        path: 'question',
        component: Question,
        meta: {
            title: '题库列表',
            roles: ["管理员", "老师", "学生", "超级管理员"],
            fullpath: "/index/question",
            icon: "el-icon-edit"
        }
    },
    {
        path: 'enterprise',
        component: Enterprise,
        meta: {
            title: '企业列表',
            roles: ["管理员", "超级管理员"],
            fullpath: "/index/enterprise",
            icon: "el-icon-office-building"
        }
    },
    {
        path: 'subject',
        component: Subject,
        meta: {
            title: '学科列表',
            roles: ["管理员", "超级管理员"],
            fullpath: "/index/subject",
            icon: "el-icon-notebook-2"
        }
    }
]