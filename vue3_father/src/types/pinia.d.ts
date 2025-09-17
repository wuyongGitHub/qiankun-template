/**
 * pinia状态类型定义
 */
declare interface layoutConfigState {
  isCollapse: boolean; // 是否展开菜单
  globalTitle: string; // 网站主标题
  isFullscreen: boolean; // 是否全屏
  isDark: boolean;  // 是否暗黑主题
}
// 登录信息
declare interface LoginData {
  username: string;
  password: string;
}

// 认证用户信息
declare interface UserInfo {
  nickName: string;
  username: string;
  imageUrl: string;
}
// 用户认证状态
declare interface AuthState<T = any> {
  rememberData?: LoginData; // 记住我（登录数据）
  accessToken?: string; //访问令牌
  userInfo?: UserInfo; // 登录用户信息 ++++++
  buttonList: string[]; // 路由菜单权限 ++++++
  menuList: T[]; // 路由菜单权限 ++++++
}
// 视图路由状态
declare interface ViewRoutesState {
  cacheRouteNames: string[]; // 要缓存路由的name
}