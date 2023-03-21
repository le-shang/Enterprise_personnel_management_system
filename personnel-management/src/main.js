import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// ant design
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as allIcon from '@ant-design/icons-vue'
const app = createApp(App)
// 注册图标组件
for (const i in allIcon) {
  app.component(i, allIcon[i])
}
app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
