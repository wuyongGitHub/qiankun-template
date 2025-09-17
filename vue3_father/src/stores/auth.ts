import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';
import { Session, Local } from '@/utils/storage';
import { login, logout, getMenuUser } from '@/api/auth';
// 保存到 Local或 Session的key名
export const Key = {
  rememberKey: 'isRemember', // 记住密码的key
  accessTokenKey: 'accessToken', // 访问令牌本地保存的key
  userInfoKey: 'userInfo', // 用户信息本地保存的key
}
/**
* 用户所拥有的路由权限
*/
export const useAuthStore = defineStore('auth', {
  state: (): AuthState<RouteRecordRaw> => {
    return {
      rememberData: Local.get(Key.rememberKey), // 记住密码
      accessToken: Session.get(Key.accessTokenKey), // 访问令牌字符串
      userInfo: Session.get(Key.userInfoKey),
      buttonList: [],
      menuList: []
    }
  },
  actions: {
    // 更新用户信息 ++++++
    async setUserInfo(data: UserInfo) {
      this.userInfo = data;
      Session.set(Key.userInfoKey, data);
    },
    // 获取按钮列表
    async setButtonList(data: string[]) {
      this.buttonList = data;
    },
    // 更新菜单权限 
    async setMenuList(data = [] as RouteRecordRaw[]) {
      console.log("data", data)
      this.menuList = data;
    },
    // 记住密码
    setRememberPwd(data?: LoginData) {
      this.rememberData = data;
      if (data) {
        Local.set(Key.rememberKey, { username: data.username, password: data.password });
      } else {
        Local.remove(Key.rememberKey);
      }
    },
    // 登录操作
    userLogin(loginData: LoginData) {
      return new Promise((resolve, reject) => {
        login(loginData).then((res: any) => {
          const { data } = res;
          // 状态赋值
          const { access_token } = data;
          this.accessToken = access_token;
          // 保存到session中
          Session.set(Key.accessTokenKey, access_token);
          // 正常响应钩子
          resolve(res);
        }).catch((error: Error) => {
          reject(error); // 异常
        });
      });
    },

    userLogout() {
      return new Promise((resolve, reject) => {
        logout().then((res: any) => {
          // 重置状态
          this.resetUserState();
          // 重新加载当前页，需认证页面会去登录页
          window.location.reload();
          resolve(res);
        }).catch((error: Error) => {
          reject(error);
        })
      });
    },
    // 重置用户状态
    resetUserState() {
      this.menuList = [];
      this.accessToken = undefined;
      this.userInfo = undefined;
      // 移除保存的数据
      Session.remove(Key.accessTokenKey);
      Session.remove(Key.userInfoKey);
    }
  }
});