<script setup lang='ts'>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
  <div class="error-container layout-padding flex-center">
    <img class="error-img" src="@/assets/401.svg" />
    <div class="error-wrap">
      <div class="error-title">您没有操作权限，请联系管理员！</div>
      <div class="error-msg">联系方式：https://www.baidu.com</div>
      <el-button @click="router.push('/login')" round type="primary"
        >重新登录</el-button
      >
    </div>
  </div>
</template>
<style scoped lang="scss">
.error-container {
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