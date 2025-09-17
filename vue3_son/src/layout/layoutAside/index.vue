<template>
  <!-- 左侧菜单区域 -->
  <div class="h100">
    <el-aside
      class="layout-aside layout-aside-menu-200"
      :class="
        layoutConfig.isCollapse
          ? 'layout-aside-menu-60'
          : 'layout-aside-menu-200'
      "
    >
      <!-- LOGO -->
      <Logo />
      <!-- 菜单 -->
      <VerticalMenu :menuList="state.menuList" />
    </el-aside>
  </div>
</template>

<script setup lang="ts" name="LayoutAside">
import { defineAsyncComponent, onMounted, reactive } from "vue";
import { useLayoutConfigStore } from "../../stores/layoutConfig";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "../../stores/auth";
const authStore = useAuthStore();
const layoutConfig = useLayoutConfigStore();
const Logo = defineAsyncComponent(
  () => import("../../layout/layoutAside/logo.vue")
);
const VerticalMenu = defineAsyncComponent(
  () => import("../../layout/layoutAside/verticalMenu.vue")
);
// +++++ 开始
const state = reactive({
  menuList: [] as RouteRecordRaw[],
});
onMounted(() => {
  setFilterRoutes();
});
// 过滤菜单(路由)数据
function setFilterRoutes() {
  const _filterRoutes = (routes: RouteRecordRaw[]) => {
    // 只要·非隐藏·菜单
    const targetRoutes = routes.filter((item) => !item.meta?.hidden);
    // 递归子路由
    targetRoutes.forEach((item) => {
      if (item.children && item.children.length)
        item.children = _filterRoutes(item.children);
    });
    return targetRoutes;
  };
  // 拷贝一份，不修改pinia状态值
  const copyMenuList = JSON.parse(JSON.stringify(authStore.menuList));
  state.menuList = _filterRoutes(copyMenuList);
}
// +++++ 结束
</script>

<style>
</style>
