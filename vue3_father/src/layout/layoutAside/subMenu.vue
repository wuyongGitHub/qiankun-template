<script setup lang='ts' name="SubMenu">
import type { RouteRecordRaw } from "vue-router";
// 父组件传递的prop
defineProps<{
  menu: RouteRecordRaw;
}>();
</script>
<template>
  <!-- 只有一级菜单，没有子菜单 -->
  <el-menu-item
    v-if="!menu.children || menu.children.length <= 0"
    :index="menu.path"
  >
    <SvgIcon :name="menu.meta?.icon"></SvgIcon>
    <template #title>{{ menu.meta?.title }}</template>
  </el-menu-item>
  <!-- 有子菜单 -->
  <template v-else>
    <el-sub-menu :key="menu.path" :index="menu.path">
      <template #title>
        <SvgIcon :name="menu.meta?.icon"></SvgIcon>
        <span>{{ menu.meta?.title }}</span>
      </template>
      <!-- 引用当前组件，渲染子组件，注意要组件名 name 值为 SubMenu -->
      <SubMenu
        v-for="childMenu in menu.children"
        :menu="childMenu"
        :key="childMenu.path"
      />
    </el-sub-menu>
  </template>
</template>