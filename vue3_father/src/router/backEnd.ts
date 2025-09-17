import { getMenuUser } from '@/api/auth/index';
import { router } from '@/router';
import { dynamicRoutes, defaultRoutes } from '@/router';
import { useAuthStore } from '@/stores/auth';
import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import { useViewRoutesStore } from '@/stores/viewRoutes';
/**
* 获取 src/views 目录下的 .vue 全部文件，排除其 components 目录下的子组件文件
* import.meta.glob 参考：https://cn.vitejs.dev/guide/features.html#glob-import
*/
const modules: Record<string, RouteComponent> = import.meta.glob(['@/views/**/*.vue',
  '!@/views/**/components/**']);
// 相对路径路由模块: 将key本地路由组件路径 `/src/views` 或 `../views` 都替换为 ''
const viewsModules: Record<string, RouteComponent> = Object.keys(modules).reduce((prevObj, currKey) => Object.assign(prevObj, {
  [currKey.replace(/\/src\/views|..\/views/, '')]:
    modules[currKey]
}), {});
// console.log('viewsModules', viewsModules);
/**
* 根据后端返回路由数据，进行动态路由控制
* 1. 请求接口获取用户数据和权限数据
*/
export async function initBackEndRoutes() {
  // 1、判断用户是否登录，未登录结束
  const authStore = useAuthStore();
  if (!authStore.accessToken) return false;
  // 2、请求接口获取用户拥有的权限菜单（路由数据）
  const { data } = await getMenuUser();
  const { userInfo, menuList, buttonList } = data;
  // 3、没有任何菜单权限，返回false
  if (!userInfo || !menuList || menuList.length <= 0) return false;
  authStore.setUserInfo(userInfo);
  authStore.setButtonList(buttonList);
  // authStore.setMenuList(menuList);
  // 4、路由对象中 component 属性的字符串值，从 viewsModules 中查找对应的动态导入路由组件方法
  dynamicRoutes[0].children = dynamicImportComponent(menuList);
  // console.log('dynamicRoutes0', dynamicRoutes, data);
  // 5. 添加动态路由
  await addRouteHandle();
  // 6. 存储动态路由到 pinia store
  setDynamicRoutes();
  // 7. 存储缓存路由名到 pinia store 
  setCacheRouteNames();
}
/**
* 后端路表中 component 转换为动态导入路由组件
* @param dynamicRoutes 后端返回的路由表数组
* @returns component 值已转换为动态导入路由组件方法
*/
export function dynamicImportComponent(dynamicRoutes: RouteRecordRaw[]) {
  if (!dynamicRoutes || dynamicRoutes.length <= 0) return;
  return dynamicRoutes.map((route) => {
    // 存在 component 值，则查找对应动态导入组件方法
    const { component } = route;
    if (component) route.component = viewsModules[`${component}`] ||
      viewsModules[`/${component}`];
    route.children && dynamicImportComponent(route.children);
    return route;
  });
}
/**
* 添加动态路由，使用 `router.addRoute`
* @link 参考：https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html
*/
export function addRouteHandle() {
  // 1. 将默认路由 401、404 合并，防止不在 layout 布局中；不然会全屏显示401、404页面
  const layoutRouteChildren = [...dynamicRoutes[0].children || [], ...defaultRoutes];
  dynamicRoutes[0].children = layoutRouteChildren;
  // 2. 添加动态路由
  // console.log('dynamicRoutes', dynamicRoutes)
  dynamicRoutes.forEach(route => {
    router.addRoute(route);
  });
}
/**
* 将动态路由保存到pinia状态中
*/
function setDynamicRoutes() {
  // 存储动态路由
  const authStore = useAuthStore();
  authStore.setMenuList(dynamicRoutes[0].children);
}
/**
* ++++++
* 获取需要缓存的路由名称 `name` 存在到pinia
* 用于：src/layout/layoutMain/index.vue 文件中的 <keep-alive :includes=[xxx, xxx] />
*/
export function setCacheRouteNames() {
  // 存储缓存路由name
  const cacheRouteNames: string[] = [];
  const _getNames = (route: RouteRecordRaw) => {
    // 获取缓存路由的name值
    if (route.meta?.cache && route.name) cacheRouteNames.push(route.name as string);
    // 有子路由，则递归获取name值
    if (route.children && route.children.length) {
      route.children.forEach(item => _getNames(item));
    }
  }
  _getNames(dynamicRoutes[0]);
  // 保存到 pinia
  const viewRoutesStore = useViewRoutesStore();
  viewRoutesStore.setCacheRouteNames(cacheRouteNames);
}