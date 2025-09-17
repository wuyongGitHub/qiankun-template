// src/qiankun.ts
import { registerMicroApps, start } from 'qiankun'

export function registerQiankunApps() {
  registerMicroApps(
    [
      {
        name: 'son-vue3',
        entry: '//192.168.80.32:8081/',
        container: '#subapp-container',
        activeRule: '/hsk-admin/son-vue3',
        props: { baseName: '/hsk-admin' },
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
