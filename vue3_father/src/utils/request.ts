import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { ElMessage } from 'element-plus';
console.log(import.meta.env.VITE_APP_BASE_API)
import { useAuthStore } from '@/stores/auth';
// 手动创建一个 axios 对象, 参考: https://github.com/axios/axios#creating-an-instance
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 20000, // 请求超时的毫秒数，请求时间超过指定值，则请求会被中断
});
// 请求拦截器
request.interceptors.request.use(config => {
  // 在此处可向请求头加上认证token
  const authStore = useAuthStore();
  // 获取token
  const accessToken = authStore.accessToken;
  if (accessToken) {
    // oauth2 请求头 Authorization: Bearer xxxxx
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, error => {
  // 出现异常, catch可捕获到
  return Promise.reject(error);
})
// 响应拦截器
request.interceptors.response.use(response => {
  const res = response.data;
  // 20000 正常响应，返回响应结果给调用方
  if (res.code === 20000) {
    return res;
  }
  // 非正常响应弹出错误信息，
  ElMessage.error(res.message);
  return Promise.reject(res);
}, error => {
  // 处理响应错误
  const { message, response } = error;
  if (message.indexOf('timeout') != -1) {
    ElMessage.error('网络超时！');
  } else if (message == 'Network Error') {
    ElMessage.error('网络连接错误！');
  } else {
    if (response.data) ElMessage.error(response.statusText);
    else ElMessage.error('接口路径找不到');
  }
  return Promise.reject(error);
});
export default request; // 导出 axios 对象 