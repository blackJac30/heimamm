<template>
  <div class="login">
    <div class="leftbox">
      <!-- 标题 -->
      <div class="title">
        <img src="../../assets/title_logo.png" alt class="titleImg" />
        <span class="titlename">黑马面面</span>
        <span class="titleline"></span>
        <span class="titlelogin">用户登录</span>
      </div>

      <!-- form表单 -->
      <el-form ref="form" :model="form" label-width="0px" class="leftBoxForm" :rules="rules">
        <!-- 输入框 -->
        <el-form-item prop="userphone">
          <el-input placeholder="请输入手机号" v-model="form.userphone" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="verifyCode">
          <el-row>
            <el-col :span="16">
              <el-input placeholder="请输入验证码" v-model="form.verifyCode" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <!-- 验证码 -->
              <img :src="verifyCodeImg" alt class="loginCode" @click="changeImg" />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 单选框 -->
        <el-form-item prop="isCheck">
          <el-checkbox v-model="form.isCheck" class="checkbox" label="check">
            我已阅读并同意
            <el-link type="primary" class="alink">用户协议</el-link>和
            <el-link type="primary" class="alink">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button class="loginbnt" type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="loginbnt" type="primary" @click="openRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bgimg"></div>
    <!-- 注册组件 -->
    <register ref="Register"></register>
  </div>
</template>

<script>
// 导入注册子组件
import register from "./components/register.vue";

// 导入封装的自定义校验规则
import { checkPhone } from "@/utils/myCheck.js";

// 导入封装登录方法
import { apiLogin } from "@/api/apiLogin.js";

// 导入封装token的方法
import { setToken } from "@/utils/myToken.js";

export default {
  data() {
    return {
      form: {
        userphone: "18511111111",
        password: "12345678",
        verifyCode: "",
        isCheck: ["check", true]
      },
      rules: {
        userphone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [
          // 非空
          { required: true, message: "请输入密码", trigger: "blur" },
          // 长度
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        verifyCode: [
          // 非空
          { required: true, message: "请输入验证码", trigger: "blur" },
          // 长度
          { min: 4, max: 4, message: "验证码不能为空", trigger: "blur" }
        ],
        isCheck: [
          {
            type: "array",
            required: true,
            message: "*请先同意服务条款",
            trigger: "change"
          }
        ]
      },
      verifyCodeImg:
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now()
    };
  },
  methods: {
    submitForm() { 
      this.$refs.form.validate(valid => {
        if (valid) {
          // 使用封装好的登录模块
          apiLogin({
            userPhone: this.form.userphone,
            password: this.form.password,
            code: this.form.verifyCode
          }).then(res => {
            // window.console.log(res);
            // 跳转到首页
            this.$router.push("/index");
            // 使用封装方法设置token
            setToken(res.data.data.token);
          });
        } else {
          this.$message.error("验证不通过");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    // 打开注册面板
    openRegister() {
      // 修改注册组件的参数打开注册组件
      this.$refs.Register.dialogFormVisible = true;
    },

    // 点击验证码图片切换验证码
    changeImg() {
      // 环境变量中的基地址
      this.verifyCodeImg =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    }
  },
  components: {
    // 注册子组件
    register
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  /* 使用flex布局 */
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.leftbox {
  width: 478px;
  height: 550px;
  background: rgba(245, 245, 245, 1);
  padding: 48px 42px 86px;
  .title {
    display: flex;
    /* 设置水平对齐 */
    align-items: center;
    .titleImg {
      width: 22px;
      height: 17px;
    }
    .titlename {
      font-size: 24px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
      margin-left: 16px;
      margin-right: 14px;
    }
    .titleline {
      width: 1px;
      height: 28px;
      background: rgba(199, 199, 199, 1);
      margin-right: 12px;
    }
    .titlelogin {
      font-size: 22px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
    }
  }
  .leftBoxForm {
    margin-top: 29px;
  }
  .loginCode {
    width: 100%;
    height: 40px;
  }
  .loginbnt {
    width: 100%;
  }
  .alink {
    padding-bottom: 3px;
  }
}

.bgimg {
  width: 633px;
  height: 435px;
  background-image: url("../../assets/login_banner_ele.png");
}
</style>