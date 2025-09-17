import { defineStore } from 'pinia';
/**
* 管理路由组件
*/
export const useViewRoutesStore = defineStore('viewRoutes', {
  state: (): ViewRoutesState => {
    return {
      cacheRouteNames: [], // 要缓存的组件name
    }
  },
  actions: {
    // 更新状态
    async setCacheRouteNames(data: string[]) {
      this.cacheRouteNames = data;
    },
  }
});