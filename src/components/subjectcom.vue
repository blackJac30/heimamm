<template>
  <div>
    <el-select class="long" :value="value" @input="v=>{$emit('input', v)}" placeholder="请选择学科">
      <el-option
        v-for="(item, index) in subjectDataList"
        :key="index"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
// 到入的到学科列表的方法
import { apiGetSubject } from "../api/subject.js";
export default {
  props: ["value"],
  data() {
    return {
      subjectDataList: []
    };
  },
  methods: {
    getSubjectData() {
      apiGetSubject({
        page: 1,
        limit: 10
      }).then(res => {
        this.subjectDataList = res.data.data.items;
      });
    }
  },
  created() {
    // 一进入页面调用得到数据方法
    this.getSubjectData();
  }
};
</script>

<style>
</style>