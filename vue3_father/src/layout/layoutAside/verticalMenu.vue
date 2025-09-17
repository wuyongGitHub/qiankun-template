<!-- 侧栏(垂直)菜单-->
<script setup lang='ts'>
import { storeToRefs } from "pinia";
import { useLayoutConfigStore } from "../../stores/layoutConfig";
import { defineAsyncComponent } from "vue";
import type { RouteRecordRaw } from "vue-router";
const SubMenu = defineAsyncComponent(
  () => import("../../layout/layoutAside/subMenu.vue")
);
const layoutConfig = useLayoutConfigStore();
// 是否折叠收起菜单
const { isCollapse } = storeToRefs(layoutConfig);
// 父组件传递的prop
withDefaults(
  defineProps<{
    menuList: RouteRecordRaw[];
  }>(),
  {
    menuList: () => [],
  }
);
</script>
<template>
  <!--滚动条-->
  <el-scrollbar>
    <!--
      router 开启路由功能，使用 index 属性指定路由地址
      default-active 默认选中哪个菜单
      background-color 背景色
      :default-openeds 默认选中哪个菜单，值为index值数组，要v-bind绑定
    -->
    <el-menu
      router
      :default-active="$route.path"
      background-color="transparent"
      :default-openeds="['/system']"
      :collapse="isCollapse"
    >
      <SubMenu v-for="menu in menuList" :key="menu.path" :menu="menu" />
    </el-menu>
  </el-scrollbar>
</template>
<style scoped>
</style>