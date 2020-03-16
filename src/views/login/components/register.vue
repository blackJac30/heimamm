<template>
  <div>
    <!-- 注册组件 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" width="630px" class="register_title">
      <el-form :model="form" :rules="rules" ref="form">
        <el-upload
          class="avatar-uploader formUser_icon"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

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
              <img src="../../../assets/login_captcha.png" alt class="loginCode" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="验证码" :label-width="formLabelWidth" prop="phoneCode">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.phoneCode" autocomplete="off" class="code_inputValue"></el-input>
            </el-col>
            <el-col :span="7">
              <el-button>获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
        phoneCode: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        userEmail: [
          // 非空
          { required: true, message: "请输入邮箱", trigger: "blur" },
          // 长度
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        userPhone: [
          // 非空
          { required: true, message: "请输入手机号", trigger: "blur" },
          // 长度
          { min: 4, max: 4, message: "验证码不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        verifyCode: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        phoneCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      // 图片上传
      imageUrl: ""
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            showClose: true,
            message: "恭喜你，这是一条成功消息",
            type: "success"
          });
        } else {
          this.$message.error("验证不通过");
          return false;
        }
      });
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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