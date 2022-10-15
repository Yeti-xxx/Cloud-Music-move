import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/dist/index.css'
import './style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from './axios/http'
import Router from './router/router.js'
import store from './store/store.js'
// 下拉刷新包
// import VueLoadmore from 'vuejs-loadmore'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$h = axios;
app.use(ElementPlus)
app.use(Router)
app.use(store)
// app.use(VueLoadmore, {
//     lang: 'en-US'
// })
app.mount('#app')