import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
/**
* 因为 Vue-Router 提供的配置路由对象的 meta 属性有限，所以须要扩展 RouteMeta 接口。
* 路由对象 meta 属性说明：
* meta: {
* title： 菜单标题
* icon: 菜单图标
* linkTo： 外链地址（新窗口打开)
* cache： 是否缓存：true缓存，false不缓存，会将 name 值用于 <keep-alive>的includes上
* hidden: 是否在菜单中显示：true显示，false隐藏
* isBreadcrumb： 是否显示到面包屑：默认或true会显示，false不显示。
* }
*/
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    icon?: string;
    linkTo?: string;
    cache?: boolean;
    hidden?: boolean;
    isBreadcrumb?: boolean;
  }
}
/**
* 动态路由：后端请求路由配置数据后，赋值给下面路由数组的顶级对象的children属性（即 布局 Layout 对象的
children属性）
* @returns 动态路由配置数组
*/
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'ele-HomeFilled',
        }
      },
      {
        path: '/system',
        name: 'System',
        redirect: '/system/menu',
        meta: {
          title: '系统管理son',
          icon: 'ele-Setting',
        },
        children: [
          {
            path: '/system/menu',
            name: 'SystemMenu',
            component: () => import('@/views/system/menu/index.vue'),
            meta: {
              title: '菜单管理',
              icon: 'ele-Menu',
            }
          },
        ]
      },

    ]
  },
];
/**
* 默认路由配置，所有用户都可访问的路由，不管前端控制还是后端控制路由权限，都要将下面添加到路由表
* （后端路由控制：后端配置菜单数据中不需要下面的菜单项）
* @returns 默认路由配置数组
*/
export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/401',
    name: 'NoPermission',
    component: () => import('@/views/error/401.vue'),
    meta: {
      title: '401页面',
      icon: 'ele-Warning',
      hidden: false,
    },
  },
  {
    path: '/:path(.*)*', // 404匹配其他路由地址
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '未找到此页面',
      hidden: true,
    },
  },
  {
    path: '/son-vue3/systemSon',
    name: 'systemSon',
    redirect: '/son-vue3/systemSon/menu',
    meta: {
      title: '我是子系统',
      icon: 'ele-Setting',
    },
    children: [
      {
        path: '/son-vue3/systemSon/menu',
        name: 'systemSonMenu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'ele-Menu',
        }
      },
    ]
  },
];
/**
* 全屏显示路由，不作用到 layout 布局渲染出口。
* （后端路由控制：后端配置菜单数据中不需要下面的菜单项）
*/
export const fullscreenRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
];
// 创建路由实例
export const router = createRouter({
  // 参数获取的是 vite.config.ts 中的 base 属性值
  history: createWebHistory(import.meta.env.BASE_URL),
  // 默认添加 401、404 路由配置，有 404 可防止控制台一直提示 No match found for location with path  'xxx'
  routes: [...defaultRoutes, ...fullscreenRoutes],
});
export default router;