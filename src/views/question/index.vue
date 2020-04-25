<template>
  <div>
    <!-- 顶部区域(element-ui Card卡片) -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="学科">
          <subjectcom v-model="formInline.subject"></subjectcom>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.status" class="long" placeholder="请选择阶段">
            <el-option label="请选择" value></el-option>
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <EPcom v-model="formInline.enterprise"></EPcom>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.status" class="long" placeholder="请选择题型">
            <el-option label="请选择" value></el-option>
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.status" class="long" placeholder="请选择难度">
            <el-option label="请选择" value></el-option>
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.name" class="long"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="formInline.status" class="long" placeholder="请选择状态">
            <el-option label="请选择" value></el-option>
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker class="long" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <br />

        <el-form-item label="标题">
          <el-input v-model="formInline.username" class="title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onDelete">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openAddDialog">
            <i class="el-icon-plus"></i> &nbsp; 新增试题
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 内容区域(Element-ui Table表格) -->
    <el-card class="table_content">
      <el-table :data="questionDataList" style="width: 100%" :border="true">
        <el-table-column type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
        <el-table-column label="题目" width="160">
          <template slot-scope="scope">
            <span v-html="scope.row.answer_analyze"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段" width="160">
          <template slot-scope="scope">
            {{scope.row.subject_name}}
            <span v-if="scope.row.step == 1">初级</span>
            <span v-if="scope.row.step == 2">中级</span>
            <span v-if="scope.row.step == 3">高级</span>
          </template>
        </el-table-column>
        <el-table-column label="题型" width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">单选</span>
            <span v-if="scope.row.type == 2">多选</span>
            <span v-if="scope.row.type == 3">简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业" width="160"></el-table-column>
        <el-table-column prop="username" label="创建者" width="160"></el-table-column>

        <el-table-column prop="reads" label="访问量" width="160"></el-table-column>

        <!-- 自定义列模块 -->
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status == 1 ? "启用" : "禁用" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" class="operating" @click="openEditDialog(scope.row)">编辑</el-link>
            <el-link
              class="operating"
              :type="scope.row.status == 0 ? 'primary' : 'danger'"
              @click="forbidden(scope.row)"
            >{{scope.row.status == 0 ? "启用" : "禁用"}}</el-link>
            <el-link type="primary" class="operating" @click="deleteSubject(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- Element-ui(分页) -->
      <el-pagination
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="formInline.page"
        :page-sizes="sizesArr"
        :page-size="formInline.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="mypagintation"
      ></el-pagination>
    </el-card>
    <processEnt ref="processEnt"></processEnt>
  </div>
</template>

<script>
// 导入封装的axios请求
import processEnt from "./components/processEnt.vue";

import {
  apiGetQuestionList,
  apiChangeStatus,
  apiDelete
} from "../../api/question.js";

export default {
  data() {
    return {
      formInline: {
        title: "",
        subject: 97,
        enterprise: "",
        type: "",
        step: "",
        usernam: "",
        status: "",
        difficulty: "",
        create_date: "",
        page: 1,
        limit: 4
      },
      questionDataList: [],
      currentPage4: 1,
      // 数据总条数
      total: 0,
      // 页容量的数组
      sizesArr: [2, 4, 8],
      value1: ""
    };
  },
  methods: {
    // 打开新增面板
    openAddDialog() {
      // 打开面板
      this.$refs.processEnt.dialogFormVisible = true;
      this.$refs.processEnt.isEdit = false;
      
    },
    // 打开编辑面板
    openEditDialog(row) {
      // 打开面板
      this.$refs.processEnt.dialogFormVisible = true;
      this.$refs.processEnt.isEdit = true;

      // 因为v-model的双向绑定, 当你在编辑页面对数据进行修改是, 页面数据也会随之跟着变化
      // 解决办法:
      // this.$refs.editDialog.form = JSON.parse(JSON.stringify(row));

      if (row.id !== this.$refs.processEnt.form.id) {
        // 重新赋值
        this.$refs.processEnt.form = JSON.parse(JSON.stringify(row));
      }
    },
    // 删除学科
    deleteSubject(row) {
      this.$confirm("确定删除当前学科吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiDelete(row.id).then(res => {
            // window.console.log(res);

            if (res.data.code == 200) {
              this.$message.success("删除成功");
              this.getSubjectData();
              // 调整页码
              if (this.questionDataList.length === 1) {
                this.formInline.page = 1;
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作失败"
          });
        });
    },
    indexMethod(index) {
      index += 1;
      return index++;
    },
    sizeChange(index) {
      this.formInline.limit = index;
      // 重新发送请求
      this.getSubjectData();
    },
    currentChange(index) {
      this.formInline.page = index;
      // 重新发送请求
      this.getSubjectData();
    },
    // 获取学科列表
    getSubjectData() {
      apiGetQuestionList(this.formInline).then(res => {
        // window.console.log(res);
        this.questionDataList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    // 学科启用禁用
    forbidden(row) {
      // window.console.log(row)
      this.$confirm(row.status == 0 ? "是否启用?" : "是否禁用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiChangeStatus(row.id).then(() => {
            // window.console.log(res);
            // 禁用成功后重新获取科学科列表数据
            this.getSubjectData();

            if (row.status == 0) {
              this.$message.success("启动成功");
            } else {
              this.$message.success("禁用成功");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作失败"
          });
        });
    },
    // 数据筛选
    search() {
      this.getSubjectData();
    },
    // 清除筛选数据
    onDelete() {
      this.formInline.rid = "";
      this.formInline.name = "";
      this.formInline.username = "";
      this.formInline.status = "";
      this.$message.success("清除成功");
    },
    changesubject(value) {
      // 将改变之后的值赋值给 formInline.subject
      this.formInline.subject = value;
    }
  },
  created() {
    this.getSubjectData();
  },
  components: {
    processEnt
  }
};
</script>

<style lang="less">
.demo-form-inline {
  .el-form-item__label {
    padding: 0 31px 0 31px;
  }
  .long {
    width: 150px;
  }
  .title {
    width: 401px;
  }
}
.operating {
  padding-left: 6px;
}
.table_content {
  margin-top: 20px;
}
.mypagintation {
  text-align: center;
  margin-top: 30px;
}
</style>