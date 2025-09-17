<script setup lang="ts" name="App">
import { onMounted } from "vue";
import { Local } from "./utils/storage";
import { start } from "qiankun";
// 导入 test.ts，
import { useLayoutConfigStore } from "./stores/layoutConfig";
const layoutConfigStore = useLayoutConfigStore();
onMounted(() => {
  // 获取localStorage配置
  const layoutConfig = Local.get("layoutConfig");
  if (layoutConfig) {
    layoutConfigStore.updateState(layoutConfig);
  }
});
</script>
<template>
  <div class="h100">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
