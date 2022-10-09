import { createRouter, createWebHashHistory } from "vue-router";
import home from '../components/home.vue'
import my from '../components/my.vue'
import play from '../components/play.vue'
import commune from '../components/commune.vue'
import songListPage from '../components/songListPage/songListPage.vue'
import songPage from '../components/songPage/songPage.vue'

const Router = createRouter({
    history: createWebHashHistory(),
    // 声明路由规则
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home, name: 'home' },
        { path: '/my', component: my, name: 'my' },
        { path: '/play', component: play, name: 'play' },
        { path: '/commune', component: commune, name: 'commune' },
        { path: '/songListPage',component: songListPage, name: 'songListPage'},
        { path: '/songPage',component: songPage, name: 'songPage'}
    ]
})

export default Router;
