<template>
  <div>
    <el-dialog
      title="新增题库测试"
      :visible.sync="dialogFormVisible"
      width="630px"
      class="register_title"
      :fullscreen="true"
    >
      <!-- 学科 -->
      <el-form :model="formInline" :rules="rules" ref="form" class="addForm">
        <el-form-item label="学科">
          <subjectcom v-model="formInline.subject"></subjectcom>
        </el-form-item>
        <!-- 阶段 -->
        <el-form-item label="阶段">
          <el-select v-model="formInline.step" class="long" placeholder="请选择阶段">
            <el-option label="请选择" value></el-option>
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- 企业 -->
        <el-form-item label="企业">
          <EPcom v-model="formInline.enterprise"></EPcom>
        </el-form-item>
        <!-- 城市 -->
        <el-form-item label="城市">
          <myCity v-model="formInline.city"></myCity>
        </el-form-item>
        <!-- 题型 -->
        <el-form-item label="题型">
          <el-radio-group v-model="formInline.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 难度 -->
        <el-form-item label="难度">
          <el-radio-group v-model="formInline.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 试题标题 -->
        <el-form-item label="试题标题">
          <!-- 富文本编辑框 -->
          <br />
          <quill-editor
            :content="formInline.title"
            class="quill_editor"
            @change="titleChange($event)"
          ></quill-editor>
        </el-form-item>
        <!-- 出题区 -->
        <!-- 单选 -->
        <el-form-item v-if="formInline.type == 1" label="单选">
          <el-radio-group v-model="formInline.single_select_answer">
            <myradio
              v-for="(item, index) in formInline.select_options"
              :key="index"
              :text="item.text"
              :label="item.label"
              :image="item.image"
              @changetext="v=>{item.text=v}"
              @changeImg="v=>{item.image=v}"
            ></myradio>
            {{formInline.single_select_answer}}
          </el-radio-group>
        </el-form-item>

        <!-- 多选 -->
        <el-form-item v-if="formInline.type == 2" label="多选">
          <el-checkbox-group v-model="formInline.multiple_select_answer">
            <br />
            <mycheckbox
              v-for="(item, index) in formInline.select_options"
              :key="index"
              :text="item.text"
              :label="item.label"
              :image="item.image"
              @changetext="v=>{item.text=v}"
              @changeImg="v=>{item.image=v}"
            ></mycheckbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 简答 -->
        <el-form-item v-if="formInline.type == 3" label="简答">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formInline.short_answer"></el-input>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 上传视频 -->
        <el-form-item label="解析视频">
          <uploadvideo v-model="formInline.video"></uploadvideo>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 答案解析 -->
        <el-form-item label="答案解析" class="answer">
          <!-- 富文本编辑框 -->
          <br />
          <quill-editor
            :content="formInline.answer_analyze"
            class="quill_editor"
            @change="answerChange($event)"
          ></quill-editor>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <el-form-item label="试题备注" class="question_notes">
          <el-input v-model="formInline.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入添加的网络请求方法
import { apiAddQuestion } from "../../../api/question.js";
// 导入子组件
// 单选
import myradio from "./myRadio.vue";
// 多选
import mycheckbox from "./myCheckbox";
// 上传视频
import uploadvideo from "./uploadvideo";
export default {
  data() {
    return {
      // 控制对话框闭合
      dialogFormVisible: false,
      // 说明文本宽度
      formLabelWidth: "80px",
      // 表单数据,
      formInline: {
        title: "我是标题", // 试题的标题
        subject: 97, // 所属学科
        step: "", // 阶段： 1 初级 2 中级 3 高级
        enterprise: "", // 企业标识
        city: [], // 城市
        type: 1, // 类型
        difficulty: 1, // 难度 1简单 、2一般 、3困难
        single_select_answer: "", // 单选题答案
        multiple_select_answer: [], // 多选题答案
        short_answer: "", // 简答
        video: "", // 视频路径
        answer_analyze: "", // 答案解析
        remark: "", // 答案备注
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      // 判断编辑&新增
      isEdit: true
    };
  },
  methods: {
    // 标题富文本编辑器改变时触发
    titleChange(e) {
      this.formInline.title = e.html;
    },
    // 答案解析富文本编辑器改变时触发
    answerChange(e) {
      this.formInline.answer_analyze = e.html;
    },
    // 添加题库
    sendAdd() {
      apiAddQuestion(this.formInline).then(res => {
        if (res.data.code == 200) {
          this.$message.success("新增成功");
          this.dialogFormVisible = false;
          this.$parent.getSubjectData();
        }
      });
    }
  },
  components: {
    myradio,
    mycheckbox,
    uploadvideo
  }
};
</script>

<style lang="less">
.addForm {
  width: 1200px;
  margin: 0 auto;
  .el-form-item {
    label {
      padding-right: 41px;
    }
    .el-radio {
      padding: 0;
    }
  }
  .el-input {
    width: 364px;
  }
  .quill_editor {
    margin-top: 35px;
  }
}
.register_title {
  .el-dialog__header {
    text-align: initial;
  }
  .el-dialog__title {
    padding-left: 18px;
  }
  .answer {
    margin-bottom: 60px;
  }
  .question_notes {
    .el-input {
      width: 100%;
      padding-left: 70px;
    }
  }
}
.el-dialog__headerbtn .el-dialog__close:hover {
  color: #fff;
  font-size: 18px;
}
</style>