<template>
  <div>
    <el-dialog
      :title="isEdit ? '编辑企业': '新增企业'"
      :visible.sync="dialogFormVisible"
      width="630px"
      class="register_title"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
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
import { apiAddEP, apiEditEP } from "../../../api/enterprise";
export default {
  data() {
    return {
      // 控制对话框闭合
      dialogFormVisible: false,
      // 说明文本宽度
      formLabelWidth: "80px",
      // 表单数据
      form: {
        eid: "", // 企业编号
        name: "", // 企业名称
        short_name: "", // 简称
        intro: "", // 简介
        remark: "", // 备注
        id: ""
      },
      // 校验规则
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "企业编号不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业编号不能为空", trigger: "blur" }
        ],
        remark: []
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
    // 编辑企业
    editSubject() {
      // 验证表达合法性, 通过后发送求情添加企业
      this.$refs.form.validate(valid => {
        if (valid) {
          apiEditEP(this.form).then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
              //成功后的操作
              // 关闭面板
              this.dialogFormVisible = false;
              // 提示成功
              this.$message.success("修改成功");
              // 刷新页面(用到父组件的方法)
              this.$parent.getEPData();
            } else if (res.data.code == 201) {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("修改不成功");
        }
      });
    },
    // 新增企业
    addSubject() {
      // 验证表达合法性, 通过后发送求情添加企业
      this.$refs.form.validate(valid => {
        if (valid) {
          apiAddEP(this.form).then(res => {
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