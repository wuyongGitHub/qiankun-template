<template>
  <div class="layout-header-breadcrumb">
    <!-- 收缩图标 -->
    <SvgIcon
      :name="layoutConfig.isCollapse ? 'ele-Expand' : 'ele-Fold'"
      @click="handleChangeCollapse"
      class="layout-header-expand-icon"
    />
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <!-- v-for过滤效果 -->
      <TransitionGroup name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
        >
          <!-- 最后一级路由（当前路由），不可点击跳转 -->
          <span v-if="index === breadcrumbList.length - 1" class="flex-center">
            <SvgIcon v-if="item.meta.icon" :name="item.meta.icon" :size="14" />
            {{ item.meta.title }}
          </span>
          <a v-else @click.prevent="handleLink(item)" class="flex-center">
            <SvgIcon v-if="item.meta.icon" :name="item.meta.icon" :size="14" />
            {{ item.meta.title }}
          </a>
        </el-breadcrumb-item>
      </TransitionGroup>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutConfigStore } from "../../stores/layoutConfig";
import { onMounted, ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import type {
  RouteLocationNormalized,
  RouteRecordNormalized,
} from "vue-router";
const route = useRoute();
const router = useRouter();
// 面包屑渲染数据
const breadcrumbList = ref<RouteRecordNormalized[]>([]);
// 用于第一次加载时触发
onMounted(() => {
  getBreadcrumb(route);
});
// 路由更新时触发,当前目标路由对象
onBeforeRouteUpdate((to) => {
  getBreadcrumb(to);
});
function getBreadcrumb(to: RouteLocationNormalized) {
  // 过滤出当前有 meta.title 值且isBreadcrumb不为false的路由对象
  const matched = to.matched.filter(
    (item) => item.meta && item.meta.title && item.meta.isBreadcrumb !== false
  );
  breadcrumbList.value = matched || [];
}

const layoutConfig = useLayoutConfigStore();
//  点击展开或收起左侧菜单
function handleChangeCollapse() {
  layoutConfig.isCollapse = !layoutConfig.isCollapse;
}
// 点击面包屑的某标题跳转
function handleLink(_route: RouteRecordNormalized) {
  const { redirect, path } = _route;
  if (redirect) {
    router.push(<string>redirect);
  } else {
    router.push(path);
  }
}
</script>

<style>
</style>