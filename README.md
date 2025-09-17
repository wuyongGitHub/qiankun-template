# qiankun-template
在当今的前端开发中，微前端架构已经成为了一种流行的架构模式。本文将介绍如何结合Vue 2或vue3基座、Vue3子应用、Vite构建工具和TypeScript语言，利用qiankun微前端框架实现动态菜单和登录共享功能的实战指南。
## 前言
### 实践文章指南
1. [vue微前端qiankun框架学习到项目实战,基座登录动态菜单及权限控制>>>>](https://blog.csdn.net/qq_42696432/article/details/133172593?fromshare=blogdetail&sharetype=blogdetail&sharerId=133172593&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)
2. [实战指南：Vue 2基座 + Vue 3 + Vite + TypeScript微前端架构实现动态菜单与登录共享>>>>](https://blog.csdn.net/qq_42696432/article/details/139267950?fromshare=blogdetail&sharetype=blogdetail&sharerId=139267950&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)
3. [构建安全的Vue前后端分离架构：利用长Token与短Token实现单点登录(SSO)策略>>>>](https://blog.csdn.net/qq_42696432/article/details/132854079?fromshare=blogdetail&sharetype=blogdetail&sharerId=132854079&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)
4. [从零开始发布你的第一个npm插件包并在多项目中使用>>>>](https://blog.csdn.net/qq_42696432/article/details/139493893?fromshare=blogdetail&sharetype=blogdetail&sharerId=139493893&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)
5. [基于vue2基座接入vue3+vite+ts+arcoDesign进行vue3子应用改造详细步骤真实项目实战保姆教学附带nginx配置>>>>](https://blog.csdn.net/qq_42696432/article/details/139065861?fromshare=blogdetail&sharetype=blogdetail&sharerId=139065861&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)
6. [Vue封装组件发布到npm私服保姆级教程【环境版本区分】>>>>](https://blog.csdn.net/qq_42696432/article/details/135008434?fromshare=blogdetail&sharetype=blogdetail&sharerId=135008434&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)

### 先不多说，看效果！
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/22debbf11f2943698d75bbf4ccdf0016.gif)

前面基本上都是讲解了`vue2`主应用+`vue3`子应用配置的微前端集成方法，下面讲解如何使用`vue3+vite`基座+`vue3+vite`子应用配置微前端集成方法。基于vue2，qiankun官网还没出vue3的集成方法：vue3版本稳定后再补充。
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/51ec71986aa94b2182a46782965af743.png)
## 环境准备

> - node版本：`v18.18.2`。
>  - npm 版本：`9.8.1`。 
>  - vue版本：`vue3+vite`。
>  - qiankun版本：`2.10.16`。 
>  - UI框架版本：`element-plus2.9.1`。

注意，如果配置`vue3`子应用，需要安装`node`版本`18`以上版本，也是必须的版本支持。

## 开始配置主应用
### 第一步，安装qiankun框架

```javascript
 npm i qiankun -S
```
### 第二步，主应用在main.ts同目录下创建qiankun.js

```javascript
// src/qiankun.ts
import { registerMicroApps, start } from 'qiankun'
export function registerQiankunApps() {
  let msg = { system: 'fmas' }
  registerMicroApps(
    [
      {
        name: 'son-vue3',
        entry: '//192.168.80.32:8081/',
        container: '#subapp-container',
        activeRule: '/systemSon',
        props: msg,
        sandbox: { strictStyleIsolation: true }
      }
    ],
    {
      beforeLoad: [app => console.log('before load', app)],
      beforeMount: [app => console.log('before mount', app)],
      afterUnmount: [app => console.log('after unload', app)]
    }
  )
  start()
}

```

### 第三步、配置主应用承载子应用模块的载体盒子
![ Vue3 + Vite：我的 Qiankun 微前端主子应用实践指南](https://i-blog.csdnimg.cn/direct/41152a11264d4e51a4537b540da47edd.png)

由于我一开始在`main.js`中调用`qiankun.js`方法的时候拿不到`id`为`“subapp-container”`的`dom`元素就会找不到为`null`值，我的解决办法为，在需要承载渲染的文件下的`onMounted`生命周期的时候注册子应用开启`qiankun`。
![ Vue3 + Vite：我的 Qiankun 微前端主子应用实践指南](https://i-blog.csdnimg.cn/direct/cedc567f040f448fbb2e1cc9a55154b4.png)

```javascript
<template>
  <!-- 右侧主区域 -->

  <div id="subapp-container"></div>
  <el-main class="layout-main">
    <el-scrollbar>
      <div class="layout-main-warp">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cacheRouteNames">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<script setup lang="ts" name="LayoutMain">
import { useViewRoutesStore } from "../../stores/viewRoutes";
import { computed, onMounted } from "vue";
import { registerQiankunApps } from "../../qiankun.js";
const viewRoutesStore = useViewRoutesStore();
// 获取要缓存的路由组件name
const cacheRouteNames = computed(() => viewRoutesStore.cacheRouteNames);
// 在 LayoutMain 加载完毕并插入 DOM 后再注册子应用
onMounted(() => {
  registerQiankunApps();
});
</script>

<style scoped lang="scss">
:deep(.el-scrollbar__view) {
  /* 铺满高度 */
  height: 100%;
}
</style>
```
### 第四步、子应用安装qiankun相应插件
`vite-plugin-qiankun` 是专门为 `Vite` 开发环境设计的插件，用于集成 `qiankun` 微前端库。`qiankun` 是一个基于 `Web Components` 的微前端实现库，可以让你将一个大型应用拆分成多个独立的小块，每个小块可以在不同的环境下独立开发、测试和部署。
```javascript
npm install vite-plugin-qiankun --save-dev
```
![ Vue3 + Vite：我的 Qiankun 微前端主子应用实践指南](https://i-blog.csdnimg.cn/direct/7b2e078fd4c24f77bf1a6a046579e6c8.png)
### 第五步、在 子应用 src 目录新增 public-path.js
```javascript
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```
### 第六步、子应用入口文件 main.ts 修改
在子应用开发初期，我直接在` router/index `中硬编码了根据 `Qiankun` 环境设置的 `history`和 `base` 路径。然而，这种方法缺乏灵活性，难以适应不同的部署场景或满足父级应用的需求变化。因此，我决定不再将路由的基础地址硬编码到子应用中，而是通过接收主应用传递的 `baseName` 参数来动态创建路由实例。这种方式确保了子应用能够在不同上下文中正确运行，尤其是在子应用可能需要部署在不同路径的情况下尤为重要。
上述配置不仅支持子应用在独立模式（非 `Qiankun` 环境）和嵌入 `Qiankun` 模式之间的无缝切换，还大幅提高了应用的复用性和灵活性。这样做的好处是，子应用无需修改代码即可适应多种环境，仅需在主应用中调整相应的配置参数，就能实现对子应用的灵活部署和集成。这种设计使得子应用更加健壮，能够更好地应对未来的变化和需求。
为此，我决定在子应用为`qiankun`模式也就是嵌入模式的时候，我重写了子应用的路由。

```javascript
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
```
### 第七步、子应用打包配置
其中`base`要与主应用中的`activeRule`参数保持一致。设置`CORS`响应头，用来告诉浏览器允许哪些域请求资源。当设置为 * 时，表示允许任何域访问资源。这意味着，如果服务器设置了这个头部，它允许来自任何域名的请求访问其资源（尽管实际应用中可能会根据需求进行更严格的限制）。保证在 `vite-plugin-qiankun` 或构建插件中，设置 `origin` 的效果是：明确告诉构建系统“子应用的资源来自哪个主机和端口”；避免默认拼接 `window.location.origin`（即主应用的端口）导致资源 `404`；特别在 `?import` 或 动态资源拼接 时效果明显。
```javascript
const path = require("path");
import { fileURLToPath, URL } from 'node:url'
import qiankun from 'vite-plugin-qiankun'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
// 向 defineConfig 传递对象改为传递方法，并返回配置对象
export default defineConfig(({ mode }) => {
  // mode：获取 --mode 指定的模式，process.cwd()项目根目录,下面 `env` 相当于 `import.meta.env`
  const env = loadEnv(mode, process.cwd())
  return {
    base: qiankunWindow.__POWERED_BY_QIANKUN__ ? '/hsk-admin/son-vue3/' : '/',
    // 开发服务器选项
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      port: 8080, // //端口号， 如果端口号被占用，会自动提升1
      open: true, //启动服务时自动打开浏览器访问
      host: '0.0.0.0',
      origin: 'http://localhost:8081',
      proxy: {
        // 匹配以env.VITE_APP_BASE_API开头的请求，交给代理服务器转换到目标接口
        [env.VITE_APP_BASE_API]: {
          // 代理后的目标地址
          target: env.VITE_APP_SERVICE_URL,
          // 开启代理，是否允许跨域
          changeOrigin: true,
          // /dev-api/xxx => xxx, 将 env.VITE_APP_BASE_AP 替换为 '',也就是 /dev-api 会移除
          rewrite: (path) => path.replace(/^\/dev-api/, '')
        },

      }
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'static',
      sourcemap: true,
      rollupOptions: {
        output: {
          format: 'umd',
          name: 'son-vue3',
          entryFileNames: `static/js/[name].js`,
          assetFileNames: `static/[ext]/[name].[ext]`,
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    plugins: [
      vue(),
      qiankun(`son-vue3`, {  // 子应用的name值
        useDevMode: true
      }),
      vueSetupExtend(), // // 让 `<script setup name="xx">` 上 name 作为缓存组件名
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
```
### 第八步、子应用嵌入模式下配置
子应用嵌入情况下，不显示多余的内容，只显示需要现实的内容，比如右侧的内容模块，我配置在嵌入模式下，不会显示子应用的菜单，`header`栏，登录等`dom`元素。

```javascript
<template>
  <el-container class="layout-container">
    <layoutAside v-if="!qiankunWindow.__POWERED_BY_QIANKUN__"></layoutAside>
    <!-- 右侧垂直 -->
    <el-container direction="vertical">
      <layoutHeader v-if="!qiankunWindow.__POWERED_BY_QIANKUN__"></layoutHeader>
      <layoutMain></layoutMain>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="Layout">
// 同步导入
// import LayoutMain from './layoutMain/index.vue'
// import LayoutHeader from './layoutHeader/index.vue'
// import LayoutAside from './layoutAside/index.vue'
// 异步导入

import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";
import { defineAsyncComponent } from "vue";

const LayoutAside = defineAsyncComponent(
  () => import("./layoutAside/index.vue")
);
const layoutMain = defineAsyncComponent(() => import("./layoutMain/index.vue"));
const LayoutHeader = defineAsyncComponent(
  () => import("./layoutHeader/index.vue")
);
</script>

<style></style>

```

### 第九步、配置主应用路由
我设置了主应用的路由为createWebHistory模式，子应用路由应与其保持一致，主应用的base为`hsk-admin/` ，主应用配置子应用路由为`/son-vue3`开头或者`/son-vue2`等类型开头，区分不同子应用的路由，如下：

```javascript

export const defaultRoutes: any[] = [
  {
    path: '/son-vue3/systemSon',
    name: 'systemSon',
    meta: {
      title: 'son',
      icon: 'ele-Setting',
    },
    children: [
      {
        path: '/son-vue3/systemSon/menu',
        name: 'systemSonMenu',
        meta: {
          title: '菜单管理',
          icon: 'ele-Menu',
        }
      },
    ]
  }
];
export const fullscreenRoutes: RouteRecordRaw[] = [];
// 创建路由实例
export const router = createRouter({
  // 参数获取的是 vite.config.ts 中的 base 属性值
  history: createWebHistory('hsk-admin/'),
  routes: [...defaultRoutes, ...fullscreenRoutes],
});
export default router;
```
经过上面配置，我主营用访问`/son-vue3/systemSon/menu`会被拼接为`hsk-admin//son-vue3/systemSon/menu`，这样，qiankun根据路由判断与` activeRule: '/hsk-admin/son-vue3',`一致，则通过`entry: '//192.168.80.32:8081/',`的连接访问子应用，并渲染到主应用中`id`为`subapp-container`的`DOM`元素中，并通过`props`将主营用的base传递给子应用，防止子应用判断`hsk-admin/son-vue3`的时候出现`404`的报错。
![ Vue3 + Vite：我的 Qiankun 微前端主子应用实践指南](https://i-blog.csdnimg.cn/direct/b7ed4fa2b80c48e58d1eb18ce9fde74a.png)
### 第十步、配置子应用路由
如果子应用为嵌套模式下启动时候，使用主应用传递的 props.baseName 来设置子应用的路由 base，又的人会问我为什么这么做，实践出真理，我得出以下好处：

> 1. 动态配置主应用挂在路径，保证其灵活配置，在微前端中，子应用的挂在路径不是固定的，比如又是挂载在`/subapp1/`有时候挂载在`/hsk-admin/son-vue3`，通过 `props.baseName` 由主应用传入，你的子应用可以灵活适应各种路径结构，不依赖硬编码的路径。
> 2. 保证子应用内部路由正确运行，刷新，跳转都能正常不会出现空白页面，如果不设置，刷新/hsk/admin/son-vue3/menu会导致子应用匹配不到路由，页面报错或者空白。

唉~，还是通过表格更直观吧！

| 编号 | 好处                          | 说明                                               |
| -- | --------------------------- | ------------------------------------------------ |

| 1  |  避免路由刷新后 404               | 页面刷新（F5）后仍能正确加载当前路由页面，不报错。                       |
| 2  |  子应用路径不和主应用冲突              | 子应用只处理 `props.baseName` 下的路径，避免与主应用路由冲突。         |
| 3  |  动态挂载路径适配性强                | 子应用不固定在某个路径下，可以根据主应用挂载路径动态调整，无需硬编码。              |
| 4  |  解决静态资源路径错误问题              | Vue Router 的 base 决定 `<img>、CSS、JS` 等资源的正确路径前缀。  |
| 5  |  支持主应用多实例挂载子应用             | 同一子应用可以在不同路径下被主应用复用（如 `/admin/son`、`/user/son`）。 |
| 6  |  子应用路由跳转逻辑保持清晰             | 子应用内部跳转不会跳出自己的路由范围，不影响主应用 URL。                   |
| 7  |  可配合 vite 的 base 设置，资源访问一致 | 保证构建时 `vite.config.ts` 的 base 与 router 保持一致。     |
| 8  |  SSR、预渲染也能受益               | 更好的 URL 管理，SSR 或静态部署时不会出现路径错误。                   |
| 9  |  有利于部署到任意路径                | 无论部署在二级目录还是子域名，只需主应用传入正确 base 即可运行。              |
| 10 |  更好的团队协作                   | 子应用团队只需专注于自身逻辑，主应用控制挂载路径，提高协作效率。                 |

子应用路由配置要和主应用对应，如下：

```javascript
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
export const dynamicRoutes: RouteRecordRaw[] = [];
/**
* 默认路由配置，所有用户都可访问的路由，不管前端控制还是后端控制路由权限，都要将下面添加到路由表
* （后端路由控制：后端配置菜单数据中不需要下面的菜单项）
* @returns 默认路由配置数组
*/
export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/son-vue3/systemSon',
    name: 'systemSon',
    redirect: '/son-vue3/systemSon/menu',
    meta: {
      title: 'son',
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
export const fullscreenRoutes: RouteRecordRaw[] = [];
// 创建路由实例
export const router = createRouter({
  // 参数获取的是 vite.config.ts 中的 base 属性值
  history: createWebHistory(import.meta.env.BASE_URL),
  // 默认添加 401、404 路由配置，有 404 可防止控制台一直提示 No match found for location with path  'xxx'
  routes: [...defaultRoutes, ...fullscreenRoutes],
});
export default router;
```
### 第十一步、查看效果
![ Vue3 + Vite：我的 Qiankun 微前端主子应用实践指南](https://i-blog.csdnimg.cn/direct/10bf53c02f3f4986a4d88c8010fd0db6.png)
![ Vue3 + Vite：我的 Qiankun 微前端主子应用实践指南](https://i-blog.csdnimg.cn/direct/0d6f83340e904b7e80b9c57663bd59d6.gif)
经过上面的十个步骤，也就配置好了vue3+vite的微前端框架了，后续可以自己写一些动态菜单，sso单点登录，权限控制等逻辑即可。
### 后续实现指南
1. [vue微前端qiankun框架学习到项目实战,基座登录动态菜单及权限控制>>>>](https://blog.csdn.net/qq_42696432/article/details/133172593?fromshare=blogdetail&sharetype=blogdetail&sharerId=133172593&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)
2. [实战指南：Vue 2基座 + Vue 3 + Vite + TypeScript微前端架构实现动态菜单与登录共享>>>>](https://blog.csdn.net/qq_42696432/article/details/139267950?fromshare=blogdetail&sharetype=blogdetail&sharerId=139267950&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)
3. [构建安全的Vue前后端分离架构：利用长Token与短Token实现单点登录(SSO)策略>>>>](https://blog.csdn.net/qq_42696432/article/details/132854079?fromshare=blogdetail&sharetype=blogdetail&sharerId=132854079&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)
4. [从零开始发布你的第一个npm插件包并在多项目中使用>>>>](https://blog.csdn.net/qq_42696432/article/details/139493893?fromshare=blogdetail&sharetype=blogdetail&sharerId=139493893&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)
5. [基于vue2基座接入vue3+vite+ts+arcoDesign进行vue3子应用改造详细步骤真实项目实战保姆教学附带nginx配置>>>>](https://blog.csdn.net/qq_42696432/article/details/139065861?fromshare=blogdetail&sharetype=blogdetail&sharerId=139065861&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)
6. [Vue封装组件发布到npm私服保姆级教程【环境版本区分】>>>>](https://blog.csdn.net/qq_42696432/article/details/135008434?fromshare=blogdetail&sharetype=blogdetail&sharerId=135008434&sharerefer=PC&sharesource=qq_42696432&sharefrom=from_link)
