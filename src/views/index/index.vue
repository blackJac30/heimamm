<template>
  <div class="index">
    <el-container class="box">
      <!-- 头部 -->
      <el-header class="header">
        <div class="left">
          <i class="el-icon-s-fold left_icon" @click="iscollapse=!iscollapse"></i>
          <img src="../../assets/index_logo.png" alt />
          <span class="title">黑马面面</span>
        </div>
        <div class="right">
          <img :src="$store.state.userimg" alt class="right_logo" />
          <span class="word">{{$store.state.username}}</span>
          <el-button type="primary" @click="logout" size="mini">退出</el-button>
        </div>
      </el-header>
      <el-container class="contentBox">
        <!-- 导航栏 -->
        <el-aside width="auto">
          <!-- :router="true" 开启路由 -->
          <el-menu :router="true" class="el-menu-vertical-demo" :collapse="iscollapse">
            <!-- 路由权限的可视化 -->
            <template v-for="(item, index) in childRouter">
              <el-menu-item
                :index="item.meta.fullpath"
                :key="index"
                v-if="item.meta.roles.includes($store.state.role)"
              >
                <i :class="item.meta.icon"></i>
                <span slot="title">{{item.meta.title}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <!-- 内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入首页网络请求封装方法
import { apiLogout } from "@/api/index.js";
// 导入操作token的方法
import { removeToken } from "@/utils/myToken.js";
// 导入封装的子路由
import childRouter from "../../router/childRouter.js";
export default {
  data() {
    return {
      userInfo: {},
      imgUrl: "",
      // 左边导航栏是否折叠
      iscollapse: false,
      // 保存子路由数据
      childRouter: childRouter
    };
  },
  methods: {
    logout() {
      this.$confirm("您确定要退出吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiLogout().then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              // 删除token
              removeToken();
              this.$router.push("/login");

              this.$message({
                type: "success",
                message: "退出成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less">
.index,
.box,
.contentbox {
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      margin-right: 22px;
    }
    img {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }
    span {
      font-size: 22px;
      color: #49a1ff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .right_logo {
      width: 43px;
      height: 43px;
      border-radius: 50%;
      margin-right: 9px;
    }
    .word {
      font-size: 14px;
      margin-right: 38px;
    }
  }
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
}

.el-main {
  background-color: #e9e9e9;
  color: #333;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>