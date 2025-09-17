<script setup lang='ts'>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
  <div class="error-container layout-padding flex-center">
    <img class="error-img" src="@/assets/404.svg" />
    <div class="error-wrap">
      <div class="error-title">您所访问的页面不存在！</div>
      <div class="error-msg">
        请检查您输入的网址是否正确，或点击下面的按钮返回首页。
      </div>
      <el-button @click="router.push('/')" round type="primary"
        >返回首页</el-button
      >
    </div>
  </div>
</template>
<style scoped lang="scss">
.error-container {
  flex-direction: row !important;
  .error-img {
    width: 350px;
    margin-bottom: 20px;
  }
  .error-wrap {
    margin-left: 50px;
    .error-title {
      font-size: 22px;
      font-weight: 600;
    }
    .error-msg {
      font-size: 13px;
      margin: 10px 0 30px 0;
      color: var(--el-color-info);
    }
  }
}
</style>