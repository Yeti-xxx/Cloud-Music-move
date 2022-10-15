<template>
    <div class="container">
        <!-- 已登录 -->
        <div class="myConatiner" v-if="accountStore!=11">
            <!-- <span style="color:#fff">{{userInfo}}</span> -->
            <Avatars v-bind:nickname="userInfo.profile.nickname" v-bind:avatarUrl="userInfo.profile.avatarUrl">
                <div class="level">
                    <span>{{userInfo.profile.follows}}关注</span>
                    <span>{{userInfo.profile.followeds}}粉丝</span>
                    <span>LV.{{userInfo.level}}</span>
                </div>
            </Avatars>
            <!-- 测试使用 -->
            <!-- <Avatars v-bind:nickname="accountStore.profile.nickname" v-bind:avatarUrl="accountStore.profile.avatarUrl">
                <div class="level">
                    <span>{{accountStore.profile.follows}}关注</span>
                    <span>{{accountStore.profile.followeds}}粉丝</span>
                    <span>LV.{{accountStore.level}}</span>
                </div>
            </Avatars> -->
            <!-- 我喜欢的歌单 -->
            <div class="myLove">
                <Songlist v-bind:title="songList[0].name" v-bind:count="songList[0].trackCount"
                    v-bind:songImg="songList[0].coverImgUrl" @click="gotoList(songList[0].id)"></Songlist>
            </div>
            <!-- 其他歌单 -->
            <div class="songListOther">
                <div class="title">歌单({{songList.length-1}}个)</div>
                <Songlist v-for="(item,i) in songList.slice(1,songList.length-1)" :key="i" v-bind:title="item.name"
                    v-bind:count="item.trackCount" v-bind:songImg="item.coverImgUrl" @click="gotoList(item.id)">
                </Songlist>
            </div>
            <!-- 退出登录 -->
            <el-card class="box-card logOut-box" @click="LogOut">
                <div class="logOut">退出登录</div>
            </el-card>

        </div>
        <!-- 未登录 -->

        <Login v-else></Login>
        <Tabbar :pageNum="2"></Tabbar>
    </div>
</template>

<script>
import Songlist from './songlist/songlist.vue'
import Login from './login/login.vue'
import Tabbar from './tababr/tabbar.vue'
import Avatars from './avatar/avatar.vue'
import { mapState, mapMutations } from 'vuex'
import { ElLoading } from 'element-plus'
import mixinItem from '../mixins/mixin.js'
export default {
    name: 'my',
    computed: {
        ...mapState('m_my', ['accountStore', 'userInfo', 'songListinStore']),

    },
    mixins: [mixinItem],
    components: {
        Tabbar,
        Login,
        Avatars,
        Songlist
    },
    data() {
        return {
            UserId: 0,
            songList: {}
        }
    },
    async created() {
        if (this.accountStore != 11) {
            // console.log(this.accountStore);
            // this.SongListId = this.accountStore.account.id//测试使用
            this.SongListId = this.accountStore.id
            if (this.songListinStore == '11') {
                // console.log('songListNo');
                await this.getSongList(this.SongListId)
                // console.log(this.songList);
                this.updateSongListinStore(this.songList)
            }
            this.songList = this.songListinStore
            
        }

    },
    methods: {
        ...mapMutations('m_my', ['updateSongListinStore']),
        // 获取用户歌单
        async getSongList(uid) {
            const { playlist: res } = await this.$h.get('https://netease-cloud-music-api-nxzt.vercel.app/user/playlist?uid=' + uid)
            this.songList = res
        },
        // 退出登录
        LogOut() {
            localStorage.removeItem('vuex')
            this.$router.go(0)
        },
        gotoList(id) {
            this.goToList(id)
        }
    },
}

</script>

<style lang='less' scoped>
.container {
    width: 100%;
    height: 100%;
}

.myConatiner {
    padding-top: 50px;
    padding-bottom: 120px;
    width: 100%;
    background: #141414;

    .level {
        margin-top: 10px;
        color: #b5b5b5;
        font-size: 13px;
        font-weight: 600;
        display: flex;
        justify-content: space-around;

        span {
            margin-left: 10px;
        }
    }

    .myLove {
        display: flex;
        padding-left: 10px;
        align-items: center;
        margin: auto;
        margin-top: 35px;
        width: 90%;
        height: 80px;
        background: #2c2c2c;
        border-radius: 5%;
    }

    .songListOther {
        padding-top: 5px;
        padding-left: 10px;
        margin: auto;
        margin-top: 35px;
        margin-left: 10px;
        width: 91%;
        background: #2c2c2c;
        border-radius: 5%;
    }

    .title {
        margin: 10px;
        color: #a0a0a0;
        font-size: 13px;
    }

    .logOut-box {
        display: flex;
        justify-content: center;
        background: #2c2c2c;
        border: none;
        width: 95%;
        height: 60px;
        margin: auto;
        margin-top: 20px;

        .logOut {
            font-weight: 800;
            color: #f43f3f;

        }

    }

    .logOut-box:active {
        background: #1e1d1d;
    }
}
</style>
