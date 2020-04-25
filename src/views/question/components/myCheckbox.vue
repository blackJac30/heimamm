<template>
  <div class="onecheckbox">
    <!-- 封装一个单选框的子组件 -->
    <el-checkbox :label="label">
      <span class="span">{{label}}</span>
      <el-input class="ipt" :value="text" placeholder="请输入内容" @input="v=>$emit('changetext',v)"></el-input>
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-checkbox>
  </div>
</template>

<script>
export default {
  // 接收参数
  props: ["label", "text", "image"],
  data() {
    return {
      // 图片上传的路径
      uploadUrl: process.env.VUE_APP_URL + `/question/upload`,
      // 上传后的图片信息
      imageUrl: process.env.VUE_APP_URL + this.image
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 将改变后的图片发送到父组件
      this.$emit("changeImg", res.data.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.onecheckbox {
  .el-checkbox {
    display: flex;
    align-items: center;
  }
  .el-checkbox__label {
    display: flex;
    align-items: center;
  }
  .span {
    margin: 0px 30px 0 10px;
  }
  .ipt {
    margin-right: 20px;
    width: 450px;
  }
}
</style>