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
          <img :src="imgUrl" alt class="right_logo" />
          <span class="word">{{userInfo.username}}</span>
          <el-button type="primary" @click="logout" size="mini">退出</el-button>
        </div>
      </el-header>
      <el-container class="contentBox">
        <!-- 导航栏 -->
        <el-aside width="auto">
          <!-- :router="true" 开启路由 -->
          <el-menu :router="true" class="el-menu-vertical-demo" :collapse="iscollapse">
            <el-menu-item index="/index/chart">
              <i class="el-icon-info"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/index/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/index/question">
              <i class="el-icon-edit"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/index/enterprise">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/index/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
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
import { apiInfo, apiLogout } from "@/api/index.js";
// 导入操作token的方法
import { removeToken } from "@/utils/myToken.js";
export default {
  data() {
    return {
      userInfo: {},
      imgUrl: "",
      // 左边导航栏是否折叠
      iscollapse: false
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
  },
  created() {
    // 得到用户信息
    apiInfo().then(res => {
      //   window.console.log(res);
      // 判断请求的返回值 200 是token正常, 能正常登录
      if (res.data.code == 200) {
        this.userInfo = res.data.data;
        this.imgUrl = process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
      }
      // 判断请求的返回值 206 是token不正常, 不能正常登录
      else if (res.data.code == 206) {
        this.$message.error("登录信息错误(token)");
        this.$router.push("/login");
      }
    });
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