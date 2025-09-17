<template>
  <div class="link-container layout-padding flex-column-center">
    <img class="link-img" src="@/assets/link.svg" />
    <div class="link-wrap">
      <h3>即将跳转到外部网站[{{ state.title }}]</h3>
      <div>您将要访问的链接不属于 {{ hostname }}，请关注您的帐号安全！</div>
      <div>{{ state.link }}</div>
      <el-button @click="handleOpenPage" round class="link-btn">继续前往访问</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="wuyouke">
import { useRoute } from "vue-router";
import { watch, reactive } from "vue";
import { validateURL } from "../../utils/validate";

const route = useRoute();

interface State {
  title: string;
  link: string;
}

const state = reactive<State>({
  title: "", // 链接标题
  link: "", // 目标跳转url
});

const hostname = window.location.hostname;
watch(
  () => route.path,
  () => {
    state.title = (route.meta?.title as string) || "外链";
    state.link = (route.meta?.linkTo as string) || "";
  }
);
// 继续前往访问
function handleOpenPage() {
  const { origin } = window.location;
  if (validateURL(state.link)){
    window.open(state.link);
  }else{
    window.open(`${origin}${state.link}`);
  }
}
</script>

<style scoped lang="scss">
.link-container {
  .link-img {
    width: 200px;
  }
  .link-wrap {
    width: 500px;
    border: 1px solid var(--wyk-border-color-light);
    border-radius: 10px;
    padding: 20px;
    line-height: 30px;
    font-size: 15px;
    margin-top: 20px;
    .link-btn {
      float: right;
    }
  }
}
</style>