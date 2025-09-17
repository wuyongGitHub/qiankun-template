import { isContainArr } from '@/utils/validate';
import { useAuthStore } from "@/stores/auth";
/**
* auth('xxx') 单个权限验证
* 在 js 中使用：
* import {permission, permissions, permissionAll} from '@/directive/authFunction';
* const info = auth('goods:add') ? '有权限': '无权限';
* @param value 权限值
* @returns 有权限，返回 `true`，反之则反
*/
export function permission(value: string): boolean {
  const authStore = useAuthStore();
  return authStore.buttonList.some((btn: string) => btn === value);
}
/**
* auths(['xxx', 'xxx']) 多个权限验证，满足一个则返回 true
* @param value 权限值
* @returns 有权限，返回 `true`，反之则反
*/
export function permissions(value: string[]): boolean {
  const authStore = useAuthStore();
  return authStore.buttonList.some((btn: string) => value.indexOf(btn) != -1)
}
/**
* authAll(['xxx', 'xxx']) 多个权限验证，全部满足则返回 true
* @param value 权限值
* @returns 有权限，返回 `true`，反之则反
*/
export function permissionAll(value: string[]): boolean {
  const authStore = useAuthStore();
  return isContainArr(authStore.buttonList, value);
}