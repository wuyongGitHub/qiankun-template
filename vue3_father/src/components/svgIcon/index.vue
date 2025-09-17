<template>
  <div>
    <render />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from "vue";
/*
const reander1 = () => h("div", { class: "bar", innerHTML: "hello" });

const reander2 = () => h("div", "WuYouKe");
const reander3 = () => h("el-icon", {color: "red",size:118},'ele-Plus');
// 如果以名称注册组件时，可以使用resolveComponent函数加载动态组件，参数3还可以为h函数，并且建议使用函数返回()=>h(xx,xx,xx)

const reander4 = () => h(resolveComponent('el-icon'), {color: "red",size:118},h(resolveComponent('ele-Plus')));
*/

const props = withDefaults(
  defineProps<{
    name?: string; //图标名称，‘ele-’开头为elementplus图标
    color?: string; // 图标颜色
    size?: number | string; //图标大小
  }>(),
  {
    name: "",
    color: "",
    size: 18,
  }
);
const render = () => {
  if (props.name?.startsWith("ele-")) {
    return h(
      resolveComponent("el-icon"),
      { color: props.color, size: props.size },
      () => h(resolveComponent(props.name))
    );
  } else {
    return h("i");
  }
};
</script>

<style>
</style>