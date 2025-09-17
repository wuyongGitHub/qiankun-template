<template>
  <el-container class="layout-container">
    <layoutAside></layoutAside>
    <!-- 右侧垂直 -->
    <el-container direction="vertical">
      <layoutHeader></layoutHeader>
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
import { defineAsyncComponent } from 'vue';

const LayoutAside = defineAsyncComponent(() => import('./layoutAside/index.vue'));
const layoutMain = defineAsyncComponent(() => import('./layoutMain/index.vue'));
const LayoutHeader = defineAsyncComponent(() => import('./layoutHeader/index.vue'));

</script>

<style>
</style>
