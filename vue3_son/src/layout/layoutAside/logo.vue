<template>
  <div class="layout-logo">
    <img class="layout-logo-img" src="@/assets/logo(1).png" alt="logo" />
    <span v-if="!layoutConfig.isCollapse">{{ layoutConfig.globalTitle }}</span>
  </div>
</template>

<script lang="ts" setup name="LayoutLogo">
import { useLayoutConfigStore } from "../../stores/layoutConfig";
const layoutConfig = useLayoutConfigStore();
</script>

<style>
</style>