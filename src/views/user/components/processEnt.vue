<template>
  <div>
    <el-dialog
      :title="isEdit ? '编辑用户': '新增用户'"
      :visible.sync="dialogFormVisible"
      width="630px"
      class="register_title"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
          <el-select v-model="form.role_id">
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="send">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入封装 新增&编辑 的网络请求
import { apiAddUser, apiEditUser } from "../../../api/user.js";
export default {
  data() {
    return {
      // 控制对话框闭合
      dialogFormVisible: false,
      // 说明文本宽度
      formLabelWidth: "80px",
      // 表单数据
      form: {
        id: "",
        username: "",
        phone: "",
        email: "",
        avatar: "",
        password: "",
        remark: "",
        status: "",
        role_id: ""
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      // 判断编辑&新增
      isEdit: true
    };
  },
  methods: {
    send() {
      if (this.isEdit) {
        this.editSubject();
      } else {
        this.addSubject();
      }
    },
    // 编辑用户
    editSubject() {
      // 验证表达合法性, 通过后发送求情添加用户
      this.$refs.form.validate(valid => {
        if (valid) {
          apiEditUser(this.form).then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
              //成功后的操作
              // 关闭面板
              this.dialogFormVisible = false;
              // 提示成功
              this.$message.success("修改成功");
              // 刷新页面(用到父组件的方法)
              this.$parent.getSubjectData();
            } else if (res.data.code == 201) {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("修改不成功");
        }
      });
    },
    // 新增用户
    addSubject() {
      // 验证表达合法性, 通过后发送求情添加用户
      this.$refs.form.validate(valid => {
        if (valid) {
          apiAddUser(this.form).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("新增成功");
              // 关闭面板
              this.dialogFormVisible = false;
              // 重置数据
              this.$refs.form.resetFields();
              this.form.short_name = "";
              this.form.intro = "";
              this.form.remark = "";
              // 调用父组件的方法从新渲染页面数据
              this.$parent.getSubjectData();
            } else if (res.data.code == 201) {
              this.$message.error({
                message: res.data.message,
                type: "warning"
              });
            } else {
              this.$message.error("新增失败");
            }
          });
        }
      });
    }
  }
};
</script>

<style>
</style>