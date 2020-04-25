<template>
  <div>
    <el-cascader
      :options="options"
      clearable
      :value="value"
      :props="{value: 'label'}"
      @input="v=>$emit('input',v)"
    ></el-cascader>
  </div>
</template>

<script>
import { regionDataPlus } from "element-china-area-data";
export default {
  props: ["value"],
  data() {
    return {
      options: regionDataPlus
    };
  }
};
</script>

<style>
</style>