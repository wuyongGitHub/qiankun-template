 <template>
  <!-- 右侧主区域 -->
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

<script setup lang="ts" name="LayoutMain">
import { useViewRoutesStore } from "../../stores/viewRoutes";
import { computed } from "vue";
const viewRoutesStore = useViewRoutesStore();
// 获取要缓存的路由组件name
const cacheRouteNames = computed(() => viewRoutesStore.cacheRouteNames);
</script>

<style scoped lang="scss">
:deep(.el-scrollbar__view) {
  /* 铺满高度 */
  height: 100%;
}
</style>