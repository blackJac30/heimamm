<template>
  <div>
    <el-card class="topData">
      <el-progress type="circle" :percentage="100" color="#0086FA" :show-text="false"></el-progress>
      <el-progress type="circle" :percentage="100" color="#0086FA" :show-text="false"></el-progress>
      <el-progress type="circle" :percentage="100" color="#F76238" :show-text="false"></el-progress>
      <el-progress type="circle" :percentage="100" color="#F76238" :show-text="false"></el-progress>
      <el-progress type="circle" :percentage="100" color="#55CD78" :show-text="false"></el-progress>
      <el-progress type="circle" :percentage="100" color="#55CD78" :show-text="false"></el-progress>
    </el-card>
    <el-card class="echartData">
      <div id="myChart" :style="{width: '100%', height: '463px'}"></div>
    </el-card>
  </div>
</template>

<script>
// 导入网络请求的接口
import { apiGetChartData } from "../../api/chart.js";
export default {
  data() {
    return {
      chartList: {}
    };
  },
  methods: {
    getChartData() {
      apiGetChartData().then(res => {
        window.console.log(res);
        this.chartList = res.data.data;
        window.console.log(this.chartList);
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 10,
          data: [
            "直接访问",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "搜索引擎",
            "手机查询"
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
              { value: 158, name: "手机查询" }
            ]
          }
        ]
      });
    }
  },
  created() {
    this.getChartData();
  },
  mounted() {
    this.drawLine();
  }
};
</script>

<style lang="less">
.topData {
  .el-card__body {
    display: flex;
    justify-content: space-around;
  }
}
.echartData {
  margin-top: 13px;
}
</style>