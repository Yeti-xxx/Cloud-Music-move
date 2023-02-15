import { createRouter, createWebHashHistory } from "vue-router";
import home from '../components/home.vue'
import my from '../components/my.vue'
import cloudPan from '../components/cloudPan.vue'
import commune from '../components/commune.vue'
import songListPage from '../components/songListPage/songListPage.vue'
import songPage from '../components/songPage/songPage.vue'
import comment from '../components/comment/comment.vue'
import myInfo from '../components/myInfo/myInfo.vue'
import reviseMyInfo from '../components/reviseMyInfo/reviseMyInfo.vue'
import search from '../components/search/search.vue'

const Router = createRouter({
    history: createWebHashHistory(),
    // 声明路由规则
    routes: [ 
        { path: '/', redirect: '/home' },
        { path: '/home', component: home, name: 'home' },
        { path: '/my', component: my, name: 'my' },
        { path: '/cloudPan', component: cloudPan, name: 'cloudPan' },
        { path: '/commune', component: commune, name: 'commune' },
        { path: '/songListPage', component: songListPage, name: 'songListPage' },
        { path: '/songPage', component: songPage, name: 'songPage' },
        { path: '/comment', component: comment, name: 'comment' },
        { path: '/myInfo', component: myInfo, name: 'myInfo' },
        { path: '/reviseMyInfo', component: reviseMyInfo, name: 'reviseMyInfo' },
        { path: '/search', component: search, name: 'search' }
    ]
})
// Router.beforeEach((to, from, next) => {
//     next(()=>{
//         console.log(to);
//     })

//   })
export default Router;
