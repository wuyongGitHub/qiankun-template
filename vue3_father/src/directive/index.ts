import type { App } from 'vue';
// 引入所有要注册的全局指令：权限指令
import { permissionDirective } from '@/directive/authDirective';
/**
* 导出指令方法：v-xxx
* @methods permissionDirective 用户权限指令，用法：v-permission
*/
export function directive(app: App) {
  // 用户权限指令
  permissionDirective(app);
  // 其他自定义指令
}