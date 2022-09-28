<template>
    <div class="container">
        <div class="myContainer" v-if="token">
            已登录
        </div>
        <Login></Login>
        <Tabbar :pageNum="2"></Tabbar>
    </div>
</template>

<script>
import Login from './login/login.vue'
import Tabbar from './tababr/tabbar.vue'
import { mapState } from 'vuex'
export default {
    name: 'my',
    computed: {
        ...mapState('m_my',['token']),
        
    },
    components: {
        Tabbar,
        Login
    },
    data() {
        return {
            
        }
    },
}

</script>

<style lang='less' scoped>

</style>
