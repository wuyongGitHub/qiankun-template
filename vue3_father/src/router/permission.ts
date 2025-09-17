import router from '@/router';
import { initBackEndRoutes } from '../router/backEnd';
import { useAuthStore } from '@/stores/auth';
// 白名单，无需认证可访问路由地址
const whiteList = ['/login'] // no redirect whitelist
// 路由前置：跳转到目标路由前被调用
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  // 获取访问令牌
  const hasToken = authStore.accessToken;
  if (hasToken) {
    // 已登录，有令牌
    if (to.path === '/login') {
      return next({ path: '/' });
    } else {
      // 获取用户拥有的菜单权限信息
      if (!authStore.userInfo || authStore.menuList.length <= 0) {
        // 后端控制路由
        await initBackEndRoutes();
        // 解决刷新时：一直跳 404 页面问题
        return next({ path: to.path, query: to.query });
      } else {
        return next();
      }
    }
  } else {
    // 未登录，无令牌
    // 如果是白明单，放行
    if (whiteList.indexOf(to.path) !== -1) {
      return next();
    } else {
      // 无令牌，跳转登录页
      return next(`/login?redirect=${to.path}`);
    }
  }
});