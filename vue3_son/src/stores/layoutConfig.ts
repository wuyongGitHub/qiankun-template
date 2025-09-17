import { defineStore } from 'pinia'
import { Local } from '@/utils/storage'
import { nextTick } from 'vue'

export const useLayoutConfigStore = defineStore('layoutConfig', {
  state: (): layoutConfigState => {
    return {
      isCollapse: false, // 菜单是否折叠
      globalTitle: "手撸管理后台", // 网站主标题
      isFullscreen: false, // 是否全屏
      isDark: false, // 黑暗模式
    }
  },
  getters: {

  },
  actions: {    // 更新状态
    updateState(state:layoutConfigState){
      // 将传递的值更新到state状态中
      this.$patch(state)
    }
  }
})
nextTick(() => {
  const layoutConfig = useLayoutConfigStore()
  // 监听状态变化,将状态持久化
  layoutConfig.$subscribe((mutation, state) => {
    // 保存到浏览器的localStorage中
    Local.set('layoutConfig', state)
  })
})
