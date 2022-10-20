<template>
    <div class="container" :style="{'--height':'100%'}">
        <el-card class="box-card content" v-if="song">
            <div class="background">
                <img :src="song.al.picUrl" />
            </div>
            <div class="top">
                <div class="close" @click="closed">
                    <el-icon :size="20">
                        <ArrowLeft />
                    </el-icon>
                </div>
                <div class="title">
                    <div class="name">{{song.name}}</div>
                    <div class="author">{{song.ar[0].name}}</div>
                </div>
                <div class="share" @click="gotoComment">
                    <el-icon :size="20">
                        <ChatDotRound />
                    </el-icon>
                </div>
            </div>
            <div class="coverAndWord">
                <!-- <div class="cover">
                    <img src="../../assets/img/playDefaultPic.png" />
                    <div class="pic" :class="[playIt ? 'active' : '']">
                        <img :src="song.al.picUrl" />
                    </div>
                </div> -->
                <div class="Word cover" @click="wordHandle">
                    1111
                </div>
            </div>
            <div class="bottom">
                <div class="left" @click="changeTheMusic('pre')">
                    <el-icon :size="20" color="#dfd6d6">
                        <ArrowLeftBold />
                    </el-icon>
                </div>
                <div class="play" @click="playMusic">
                    <el-icon :size="50" color="#dfd6d6" v-if="playIt">
                        <VideoPause />
                    </el-icon>
                    <el-icon :size="50" color="#dfd6d6" v-else>
                        <VideoPlay />
                    </el-icon>
                </div>
                <div class="right" @click="changeTheMusic('next')">
                    <el-icon :size="20" color="#dfd6d6">
                        <ArrowRightBold />
                    </el-icon>
                </div>
            </div>
        </el-card>
        <!-- 数据未完成加载时 -->
        <!-- <el-card class="loadingbox" v-else>
            <div class="loading">

            </div>
            <div class="text">加载中....</div>
        </el-card> -->
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import mixinItem from '../../mixins/mixin.js'
import { useRoute } from "vue-router";
export default {
    name: 'SongPage',
    mixins: [mixinItem],
    inject: ['showPlaytoApp', 'changeMusicStoApp', 'playContainertoApp'],
    data() {
        return {
            songId: 0,
            song: {},
            fromPath: '11',
            prePath: '',
            word: '',
            wordArray:[],
            timeArray:[]
        }
    },
    watch: {
        changeMusic(newV, oldV) {
            if (newV !== 'next' || newV !== 'pre') {
                this.song = this.songStore
                // console.log(this.songStore);
            }
        }
    },
    beforeRouteUpdate(to, from) {
        this.prePath = '777'
    },
    computed: {
        ...mapState('m_play', ['showPlay', 'playIt', 'changeMusic', 'songStore', 'songListStore']),
        ...mapState('t_play', ['TsongListStore', 'TsongPageIdStore'])

    },
    async created() {
        let flagToGet = true
        if (this.TsongPageIdStore == '11') {
            this.songId = this.$route.query.id
        } else {
            this.songId = this.TsongPageIdStore
        }
        for (let i = 0; i < this.TsongListStore.length; i++) {
            if (this.TsongListStore[i].id == this.songId) {
                this.song = this.TsongListStore[i]
                flagToGet = false
                break;
            }
        }
        if (flagToGet) {
            const res = await this.getMusicDetail(this.songId)  //获取歌曲信息
            this.word = (await this.getWord(this.songId)).lyric
            this.song = res.songs[0]
            this.TsongListStore.push(this.song)


        }
        this.updateShowPlay()
        // this.prePath = this.$route.path
    },
    methods: {
        ...mapMutations('m_play', ['updateShowPlay', 'updateplayIt', 'updateChangeMusic', 'playTotrue']),
        ...mapMutations('t_play', ['updateTsongPageIdStore']),
        // 关闭SongPage
        closed() {
            this.showPlaytoApp()
            this.updateTsongPageIdStore('11')
            this.$router.go(-1)
        },
        // 暂停或播放音乐
        playMusic() {
            this.playContainertoApp()
        },
        // 切换音乐
        async changeTheMusic(direction) {
            // console.log(this.song);
            this.updateChangeMusic(direction)
            this.playTotrue()
            const res = await this.changeMusicStoApp()
            if (typeof res == 'object') {
                this.song = res[0]
            } else {
                this.song = this.TsongListStore[res]
                this.songId = this.song.id
                this.updateTsongPageIdStore(this.songId)
                console.log(this.songId);
            }

            // console.log(this.song);

        },
        gotoComment() {
            this.$router.push({
                path: '/comment',
                query: {
                    id: 'sid' + this.songId,
                }
            })

        },
        // 获取歌词
        async getWord(id) {
            const res = await this.$h.get('/lyric?id=' + id)
            return res.lrc
        },
        // 歌词处理
        wordHandle(){
            // console.log(this.word);
            //先通过“\n”将每行歌词存入数组之中
            let arr = this.word.split('\n')
            for (let i = 0; i < arr.length; i++) {
                let row = arr[i].split(']') //文本切割
                let text = row[1]   //拿到当前行的真正的歌词
                console.log(text);
            }
            

        }

    },

}

</script>

<style lang='less' scoped>
@keyframes musicRotate {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

::v-deep(.el-card) {
    --el-card-padding: 0;
}

.container {
    height: 100%;

    // overflow:hidden;
    .content {
        height: 100%;
    }

    .background {
        img {
            // width:100%;
            height: 150%;
            filter: blur(50px);
            transform: scale(3);
        }
    }

    .top {
        // border-box: box-sizing;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 0;
        height: 50px;
        width: 100%;
        color: #f2eeec;

        // background: red;
        .share {
            margin-right: 5px;
        }

        .close {
            margin-left: 5px;
        }

        .title {
            display: flex;
            flex-direction: column;
            align-items: center;

            .name {
                font-weight: 600;
            }

            .author {
                color: #d0bdbe;
                font-size: 13px;
            }
        }
    }

    .cover {
        height: 265px;
        width: 265px;
        position: absolute;
        border-radius: 50%;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);

        img {
            height: 265px;
            width: 265px;

        }

        .active {
            animation: musicRotate 10s linear infinite;
            animation-play-state: running;
        }

        .pic {
            display: flex;
            justify-content: center;
            margin-top: -216px;

            img {
                width: 160px;
                height: 160px;
                border-radius: 50%;
            }
        }
    }

    .bottom {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        bottom: 30px;
        width: 275px;
        height: 65px;
        // background:red;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
