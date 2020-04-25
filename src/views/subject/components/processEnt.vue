<template>
  <div>
    <el-dialog
      :title="isEdit ? '编辑学科': '新增学科'"
      :visible.sync="dialogFormVisible"
      width="630px"
      class="register_title"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
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
// 导入封装编辑的网络请求
import { apiEditDialog, apiAddSubject } from "../../../api/subject.js";
export default {
  data() {
    return {
      // 控制对话框闭合
      dialogFormVisible: false,
      // 说明文本宽度
      formLabelWidth: "80px",
      // 表单数据
      form: {
        rid: "", // 学科编号
        name: "", // 学科名称
        short_name: "", // 简称
        intro: "", // 简介
        remark: "", // 备注
        id: ""
      },
      // 校验规则
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
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
    // 编辑学科
    editSubject() {
      // 验证表达合法性, 通过后发送求情添加学科
      this.$refs.form.validate(valid => {
        if (valid) {
          apiEditDialog(this.form).then(res => {
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
    // 新增学科
    addSubject() {
      // 验证表达合法性, 通过后发送求情添加学科
      this.$refs.form.validate(valid => {
        if (valid) {
          apiAddSubject(this.form).then(res => {
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