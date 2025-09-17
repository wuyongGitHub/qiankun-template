<script setup lang="ts" name="App">
import { onMounted } from "vue";
import { Local } from "./utils/storage";
// 导入 test.ts，
import { test1 } from "@/api/test";
import { useLayoutConfigStore } from "./stores/layoutConfig";
const layoutConfigStore = useLayoutConfigStore();
onMounted(() => {
  // 获取localStorage配置
  const layoutConfig = Local.get("layoutConfig");
  if (layoutConfig) {
    layoutConfigStore.updateState(layoutConfig);
  }
});

// 调用方法发送请求
test1();
</script>
<template>
  <div class="h100">
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>
