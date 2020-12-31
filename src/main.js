import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElementTiptapPlugin } from 'element-tiptap'

// 引入element
import ElementUI from 'element-ui'
// 引入全局样式文件
import 'element-ui/lib/theme-chalk/index.css'

import './style/global.less'

Vue.use(ElementUI)
Vue.use(ElementTiptapPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
