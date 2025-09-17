<template>
  <el-container class="layout-container">
    <layoutAside v-if="!qiankunWindow.__POWERED_BY_QIANKUN__"></layoutAside>
    <!-- 右侧垂直 -->
    <el-container direction="vertical">
      <layoutHeader v-if="!qiankunWindow.__POWERED_BY_QIANKUN__"></layoutHeader>
      <layoutMain></layoutMain>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="Layout">
// 同步导入
// import LayoutMain from './layoutMain/index.vue'
// import LayoutHeader from './layoutHeader/index.vue'
// import LayoutAside from './layoutAside/index.vue'
// 异步导入

import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";
import { defineAsyncComponent } from "vue";

const LayoutAside = defineAsyncComponent(
  () => import("./layoutAside/index.vue")
);
const layoutMain = defineAsyncComponent(() => import("./layoutMain/index.vue"));
const LayoutHeader = defineAsyncComponent(
  () => import("./layoutHeader/index.vue")
);
</script>

<style></style>
