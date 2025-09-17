<template>
  <!-- 右侧主区域 -->

  <div id="subapp-container"></div>
  <el-main class="layout-main">
    <el-scrollbar>
      <div class="layout-main-warp">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cacheRouteNames">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </el-main>
</template>
<!--   -->
<script setup lang="ts" name="LayoutMain">
import { useViewRoutesStore } from "../../stores/viewRoutes";
import { computed, onMounted } from "vue";
import { registerQiankunApps } from "../../qiankun.js";
const viewRoutesStore = useViewRoutesStore();
// 获取要缓存的路由组件name
const cacheRouteNames = computed(() => viewRoutesStore.cacheRouteNames);
// 在 LayoutMain 加载完毕并插入 DOM 后再注册子应用
onMounted(() => {
  registerQiankunApps();
});
</script>

<style scoped lang="scss">
:deep(.el-scrollbar__view) {
  /* 铺满高度 */
  height: 100%;
}
</style>
