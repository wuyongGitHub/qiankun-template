<template>
  <div class="layout-header-user">
    <div class="layout-header-user-icon mr5" @click="handleToggleFullscreen">
      <SvgIcon name="ele-FullScreen" />
    </div>
    <div class="layout-header-user-icon mr5">
      <el-switch
        v-model="isDark"
        @change="changeDark"
        inline-prompt
        active-icon="ele-Moon"
        inactive-icon="ele-Sunny"
        style="--el-switch-on-color: #333"
      />
    </div>
    <el-dropdown>
      <span class="user-dropdown-link">
        <el-avatar class="mr3" :size="30" icon="ele-UserFilled" />admin
        <SvgIcon class="ml3" name="ele-ArrowDown"></SvgIcon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="router.push('/home')"
            >首页</el-dropdown-item
          >
          <el-dropdown-item @click.prevent="router.push('/404')"
            >404</el-dropdown-item
          >
          <el-dropdown-item @click.prevent="router.push('/401')"
            >401</el-dropdown-item
          >
          <el-dropdown-item @click="authStore.userLogout()" divided
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { useFullscreen, useDark } from "@vueuse/core";
import { useLayoutConfigStore } from "../../stores/layoutConfig";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
const router = useRouter();
const authStore = useAuthStore();
const layoutConfig = useLayoutConfigStore();
// 全屏切换
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();
// 点击切换全屏
async function handleToggleFullscreen() {
  await toggleFullscreen();
  // 更新状态
  layoutConfig.isFullscreen = isFullscreen.value;
}
// 暗黑模式切换，会将状态值自动保存到localStorage中，：`vueuse-color-scheme: dark|auto`
// 会自动监听isDaek值得变化，来切换到对应主题
const isDark = useDark({
  initialValue: "dark",
});
// 切换暗黑模式，更新状态值
function changeDark(isDark: boolean) {
  layoutConfig.isDark = isDark;
}
</script>

<style>
</style>