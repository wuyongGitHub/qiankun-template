<template>
  <!-- 右侧头部区域 -->
  <el-header class="layout-header"> 
    <div class="layout-header-index">
      <!-- 左侧面包屑 -->
      <Breadcrumb />
      <!-- 右侧用户信息下拉框 -->
      <UserDropdown/>
    </div>
  </el-header>
  
</template>

<script setup lang="ts" name="LayoutHeader">
import { defineAsyncComponent } from 'vue';
const Breadcrumb = defineAsyncComponent(() => import('../../layout/layoutHeader/breadcrumb.vue'));
const UserDropdown = defineAsyncComponent(() => import('../../layout/layoutHeader/userDropdown.vue'));
</script>

<style>
</style>
