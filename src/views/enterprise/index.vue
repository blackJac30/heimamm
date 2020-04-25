<template>
  <div>
    <!-- 顶部区域(element-ui Card卡片) -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.rid" class="short"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.name" class="long"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.username" class="short"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" class="long">
            <el-option label="所有" value></el-option>
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onDelete">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openAddDialog">
            <i class="el-icon-plus"></i> &nbsp; 新增企业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 内容区域(Element-ui Table表格) -->
    <el-card class="table_content">
      <el-table :data="EPDataList" style="width: 100%">
        <el-table-column type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者" width="180"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="180">
          <!-- 使用过滤器过滤时间 -->
          <template slot-scope="scope">{{scope.row.create_time | myTime}}</template>
        </el-table-column>

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
    <!-- 新增企业面板 -->
    <!-- <addDialog ref="addDialog"></addDialog> -->
    <!-- 编辑企业面板 -->
    <!-- <editDialog ref="editDialog"></editDialog> -->
    <!-- 综合面板 -->
    <processEnt ref="processEnt"></processEnt>
  </div>
</template>

<script>
// 导入新增企业的面板
// import addDialog from "./components/addDialog.vue";
// 导入编辑企业的面板
// import editDialog from "./components/editDialog.vue";
import processEnt from "./components/processEnt.vue";

// 导入关于企业页面的axios请求
import {
  apiGetEPDataList,
  apiChangeStatus,
  apiDelete
} from "../../api/enterprise.js";

export default {
  data() {
    return {
      formInline: {
        name: "",
        page: 1,
        limit: 4,
        eid: "",
        username: "",
        status: ""
      },
      EPDataList: [],
      currentPage4: 1,
      // 数据总条数
      total: 0,
      // 页容量的数组
      sizesArr: [2, 4, 8]
    };
  },
  methods: {
    // 打开新增面板
    openAddDialog() {
      // 打开面板
      this.$refs.processEnt.dialogFormVisible = true;
      this.$refs.processEnt.isEdit = false;
      // 打开面板前清空数据
      this.$refs.processEnt.form.eid = "";
      this.$refs.processEnt.form.name = "";
      this.$refs.processEnt.form.short_name = "";
      this.$refs.processEnt.form.intro = "";
      this.$refs.processEnt.form.remark = "";
      this.$refs.processEnt.form.id = "";
      // this.$refs.processEnt.$refs.form.resetFields();
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
    // 删除企业
    deleteSubject(row) {
      this.$confirm("确定删除当前企业吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiDelete(row.id).then(res => {
            // window.console.log(res);

            if (res.data.code == 200) {
              this.$message.success("删除成功");
              this.getEPData();
              // 调整页码
              if (this.EPDataList.length === 1) {
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
      this.getEPData();
    },
    currentChange(index) {
      this.formInline.page = index;
      // 重新发送请求
      this.getEPData();
    },
    // 获取企业列表
    getEPData() {
      apiGetEPDataList(this.formInline).then(res => {
        // window.console.log(res);
        this.EPDataList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    // 企业启用禁用
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
            // 禁用成功后重新获取科企业列表数据

            if (row.status == 0) {
              this.$message.success("启动成功");
              this.getEPData();
            } else {
              this.$message.success("禁用成功");
              this.getEPData();
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
      this.getEPData();
    },
    // 清除筛选数据
    onDelete() {
      this.formInline.rid = "";
      this.formInline.name = "";
      this.formInline.username = "";
      this.formInline.status = "";
      this.$message.success("清除成功");
    }
  },
  created() {
    this.getEPData();
  },
  components: {
    processEnt
  }
};
</script>

<style lang="less">
.demo-form-inline {
  .short {
    width: 100px;
  }
  .long {
    width: 150px;
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