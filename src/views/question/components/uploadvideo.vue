<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="moviePath"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
      <!-- 视频窗口 -->
      <video :src="videoURL" v-if="videoURL" controls loop class="video_box"></video>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      // 上传视频的路径
      moviePath: process.env.VUE_APP_URL + `/question/upload`,
      // 视频路径
      videoURL: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.videoURL = URL.createObjectURL(file.raw);
      // 视频上传成功后将视频地址返回父组件
      this.$emit("input", res.data.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 8;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 mp4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 8MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
.video_box {
  width: 600px;
  height: 300px;
  margin-left: 20px;
}
</style>