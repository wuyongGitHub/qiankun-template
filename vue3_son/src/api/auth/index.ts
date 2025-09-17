import request from "@/utils/request";
const baseUrl = "/auth";
// 登录系统
export function login(data: LoginData) {
  return request({
    url: `${baseUrl}/token`,
    method: 'POST',
    data
  });
}
// 退出系统
export function logout() {
  return request({
    url: `${baseUrl}/logout`,
    method: 'POST',
  });
}

// 查询用户拥有的菜单按钮权限（动态路由）
export function getMenuUser() {
  return request({
    url: `system/menu/user`,
    method: 'GET',
  });
}