<template>
  <!-- 注册组件 -->
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" width="630px" class="register_title">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <!-- action上传文件的地址 -->
        <!-- name修改文件名 -->
        <el-upload
          class="avatar-uploader formUser_icon"
          :action="imgUpload"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" :label-width="formLabelWidth" prop="userName">
        <el-input v-model="form.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userEmail">
        <el-input v-model="form.userEmail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="userPhone">
        <el-input v-model="form.userPhone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth" prop="verifyCode">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.verifyCode" autocomplete="off" class="code_inputValue"></el-input>
          </el-col>
          <el-col :span="7">
            <img :src="verifyCodeImg" alt class="loginCode" @click="changeImg" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="phoneCode">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.phoneCode" autocomplete="off" class="code_inputValue"></el-input>
          </el-col>
          <el-col :span="7">
            <el-button @click="getPhoneCode" :disabled="time!=0">{{time == 0 ? "获取用户验证码" : time}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入封装的自定义校验规则
import { checkPhone, checkEmail } from "@/utils/myCheck.js";

// 导入封装的axios 按需导入
// import { apiGetCode, apiRegister } from "../../../api/register";
// @表示src目录别名
import { apiGetCode, apiRegister } from "@/api/register.js";

export default {
  data() {
    return {
      // 控制对话框闭合
      dialogFormVisible: false,
      // 说明文本宽度
      formLabelWidth: "67px",
      // from的数据源
      form: {
        userName: "",
        userEmail: "",
        userPhone: "",
        password: "",
        verifyCode: "",
        phoneCode: "",
        avatar: "" // 头像校验属性
      },
      // 表单验证规则
      rules: {
        userName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        userEmail: [
          // validator：验证规则    trigger 触发验证的条件
          { validator: checkEmail, trigger: "blur", required: true }
        ],
        userPhone: [
          // validator：验证规则    trigger 触发验证的条件
          { validator: checkPhone, trigger: "blur", required: true }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        verifyCode: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "长度是 4 个字符", trigger: "blur" }
        ],
        phoneCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度是 4 个字符", trigger: "blur" }
        ],
        // 头像验证:
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }]
      },
      // 定义一个验证码链接;
      verifyCodeImg:
        process.env.VUE_APP_URL + // 利用环境变量获取基地址
        "/captcha?type=sendsms&t=" +
        Date.now(),
      // 点击"发送手机短信验证"按钮后警用倒计时的两个时间参数;

      // setInterval的返回值;
      timer: null,
      // 设定倒计时的单位时间;
      time: 0,

      // 头像上传的地址:
      imgUpload: process.env.VUE_APP_URL + "/uploads",
      // 图片上传url
      imageUrl: ""
    };
  },
  methods: {
    // 提交form表单
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          apiRegister({
            username: this.form.userName,
            phone: this.form.userPhone,
            email: this.form.userEmail,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.phoneCode
          }).then(res => {
            // window.console.log(res)
            if (res.data.code == 200) {
              this.$message.success("注册成功");
              // 关闭注册面板
              this.dialogFormVisible = false;
              // 完成注册表单重置
              this.$refs.form.resetFields();
              this.dialogFormVisible = false;
              // 单独重置头像
              this.imageUrl = null;
            }
          });
        } else {
          this.$message.error("注册失败");
        }
      });
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 上传成功给avatar赋值
      this.form.avatar = res.data.file_path;
      // 单独验证avatar(当avatar已赋值后, 无法再次出发校验, 所以单独再校验)
      this.$refs.form.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 点击验证码图片切换验证码
    changeImg() {
      this.verifyCodeImg =
        process.env.VUE_APP_URL + // 利用环境变量获取基地址
        "/captcha?type=sendsms&t=" +
        Date.now();
    },
    // 点击获取手机验证码
    getPhoneCode() {
      // 判断手机号是否合法
      // eslint-disable-next-line no-unused-vars
      var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!phoneReg.test(this.form.userPhone)) {
        this.$message.error("手机号不合法");
        return;
      }
      // 判断验证码是否合法
      if (this.form.verifyCode.trim().length != 4) {
        this.$message.error("图片验证码不合法");
        return;
      }

      // 添加一个定时器: 判断按钮是否可以点击
      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        if (this.time == 0) {
          clearInterval(this.timer);
        }
      }, 1000);

      // 使用封装的js文件发送请求:
      // 封装后:
      apiGetCode({
        code: this.form.verifyCode,
        phone: this.form.userPhone
      }).then(res => {
        // 判断res返回值是否==200,如果是则为首次注册
        if (res.data.code == 200) {
          // 将手机验证码输出
          this.$message.success("手机验证码为: " + res.data.data.captcha);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 按注册表单重置
    cancelForm() {
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
      // 单独重置头像
      this.imageUrl = null;
    }
  }
};
</script>

<style lang="less">
.register_title {
  .el-dialog__header {
    text-align: center;
    background: linear-gradient(
      -90deg,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
    padding: 0px;
    height: 53px;
    .el-dialog__title {
      color: #fff;
      line-height: 53px;
    }
  }
  .loginCode {
    width: 100%;
    height: 41px;
  }
  .dialog-footer {
    text-align: center;
  }
  .code_inputValue {
    padding-right: 20px;
  }

  // 上传头像
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .formUser_icon {
    text-align: center;
    margin-bottom: 48px;
  }
}
</style>