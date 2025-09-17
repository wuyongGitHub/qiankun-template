import './public-path'
/* eslint-disable no-underscore-dangle */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

import App from './App.vue'
import router from './router'
import {
  defaultRoutes,
  fullscreenRoutes
} from './router';
// 整合ElementPlus
import ElementPlus from 'element-plus';
// @ts-ignore 汉化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import "@/styles/index.scss"
// 图标
import { useElIcon } from '@/utils/setGlobal';
import '@/router/permission';
// 自定义全局指令
import { directive } from '@/directive';
import { createRouter, createWebHistory } from 'vue-router';

console.log("我背加载了");
// 第五版本
let app: any;
// 判断是否在qiankun环境下
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  app = createApp(App)
  //注册自定义全局指令 
  app.use(createPinia())
  app.use(router)
  app.use(ElementPlus, { locale: zhCn });
  // 全局注册图标`ele-`开头（样式在index.scss中）
  useElIcon(app);
  directive(app);
  app.mount('#app')
} else {
  console.log('qiankun模式')
  renderWithQiankun({
    // qiankun的生命周期，挂载
    mount(props) {
      // 创建子应用独立的路由配置
      const subAppRouter = createRouter({
        history: createWebHistory(props.baseName), // 使用父应用传递的 baseName 创建 history
        routes: [{
          path: '/',
          redirect: 'login',
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/login/index.vue'),
          meta: {
            requiresAuth: false,
          },
        },
        ...defaultRoutes, ...fullscreenRoutes], // 这里可以添加你的子应用路由配置
      });
      app = createApp(App)

      //注册自定义全局指令 
      app.use(createPinia())
      app.use(subAppRouter);
      app.use(ElementPlus, { locale: zhCn });
      // 全局注册图标`ele-`开头（样式在index.scss中）
      useElIcon(app);
      directive(app);
      // 传递的值可以获取到了
      app.mount(
        props.container
          ? props.container.querySelector("#app")
          : document.getElementById("app")
      );
    },
    // 应用加载
    bootstrap() {
      console.log("--bootstrap");
      return Promise.resolve();
    },
    // 修改
    update(props) {
      console.log("--update");
      return Promise.resolve();
    },
    // 销毁
    unmount() {
      console.log("--unmount");
      app?.unmount();
      return Promise.resolve();
    },
  });

}


