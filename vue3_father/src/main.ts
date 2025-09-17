import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

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

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn });
// 全局注册图标`ele-`开头（样式在index.scss中）
useElIcon(app);

directive(app);

app.mount('#app')