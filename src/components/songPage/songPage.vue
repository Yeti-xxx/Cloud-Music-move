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
                    <div class="name" @click="wait=!wait">{{song.name}}</div>
                    <div class="author">{{song.ar[0].name}}</div>
                </div>
                <div class="share" @click="gotoComment">
                    <el-icon :size="20">
                        <ChatDotRound />
                    </el-icon>
                </div>
            </div>
            <div class="coverAndWord">

                <div :class="['cover',coverOrlyric===false?'dis':'']" @click="ChangecoverOrlyric">
                    <img src="../../assets/img/playDefaultPic.png" />
                    <div class="pic" :class="[playIt ? 'active' : '']">
                        <img :src="song.al.picUrl" />
                    </div>
                </div>
                <div :class="['Word cover',coverOrlyric===true?'dis':'']" @click="ChangecoverOrlyric">
                    <div class="wordBox">
                        <div class="wordContent" ref="wordContentMove" :style="lyricMove">
                            <div ref="item" :class="['wordItem',currentRow===i?'current':'']" v-for="(item,i) in lyric"
                                :key="i">
                                {{item.text}}
                            </div>
                        </div>
                    </div>
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
import { reactive } from 'vue'
import { mapState, mapMutations } from 'vuex'
import mixinItem from '../../mixins/mixin.js'
import { useRoute } from "vue-router";
export default {
    name: 'SongPage',
    setup() {
        const lyric = reactive([]);
        return {
            lyric
        }
    },
    mixins: [mixinItem],
    inject: ['showPlaytoApp', 'changeMusicStoApp', 'playContainertoApp'],
    data() {
        return {
            songId: 0,
            song: {},
            fromPath: '11',
            prePath: '',
            word: '',
            // lyric: [],
            lyricMove: {
                top: window.innerHeight * 0.23 + 'px'
            },
            currentRow: 0,
            coverOrlyric: true,
        }
    },
    watch: {
        changeMusic(newV, oldV) {
            if (newV !== 'next' || newV !== 'pre') {
                this.song = this.songStore
                // console.log(this.songStore);
            }
        },
        TlyricTime(newV, oldV) {
            this.lyric.forEach((element, index) => {
                if (this.TlyricTime === element.time) {
                    let h = window.innerHeight * 0.23
                    h += -index * 39
                    this.lyricMove.top = h + 'px'
                    this.currentRow = index
                }
            });
        }
    },
    beforeRouteUpdate(to, from) {
        this.prePath = '777'
    },
    computed: {
        ...mapState('m_play', ['showPlay', 'playIt', 'changeMusic', 'songStore', 'songListStore']),
        ...mapState('t_play', ['TsongListStore', 'TsongPageIdStore', 'TlyricTime'])

    },
    async created() {
        let flagToGet = true
        console.log(this.$route.query.id)
        if (this.TsongPageIdStore == '11' || this.$route.query.id!=this.TsongPageIdStore) {
            this.songId = this.$route.query.id
        }
        else {
            this.songId = this.TsongPageIdStore

        }
        for (let i = 0; i < this.TsongListStore.length; i++) {
            if (this.TsongListStore[i].id == this.songId) {
                this.song = this.TsongListStore[i]
                this.word = this.song.word
                flagToGet = false
                break;
            }
        }
        if (flagToGet) {
            const res = await this.getMusicDetail(this.songId)  //获取歌曲信息
            this.word = (await this.getWord(this.songId)).lyric
            this.song = res.songs[0]
            this.song.word = this.word
            this.TsongListStore.push(this.song)

        }
        this.updateShowPlay()
        this.wordHandle()
        // this.prePath = this.$route.path
    },
    methods: {
        ...mapMutations('m_play', ['updateShowPlay', 'updateplayIt', 'updateChangeMusic', 'playTotrue']),
        ...mapMutations('t_play', ['updateTsongPageIdStore']),
        // 关闭SongPage
        closed() {
            this.showPlaytoApp()
            this.$router.go(-1)
        },
        // 暂停或播放音乐
        playMusic() {
            this.playContainertoApp()
        },
        // 切换音乐
        async changeTheMusic(direction) {
            this.lyric = []
            this.updateTsongPageIdStore(this.songId)
            this.updateChangeMusic(direction)
            this.playTotrue()
            // this.wait = true;
            const res = await this.changeMusicStoApp()
            if (typeof res == 'object') {
                this.song = res[0]
                // 说明当前歌曲无缓存 需要获取新的歌词
                this.word = this.song.word
                this.wordHandle()
            } else {
                this.song = this.TsongListStore[res]
                this.word = this.song.word
                this.wordHandle()
                this.songId = this.song.id
                this.updateTsongPageIdStore(this.songId)

            }


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
        wordHandle() {
            // console.log(this.word);
            //先通过“\n”将每行歌词存入数组之中
            let arr = this.word.split('\n')
            for (let i = 0; i < arr.length; i++) {
                let lyricRow = {}   //将每行歌词及其出现的时间视为一个对象
                let row = arr[i].split(']') //文本切割
                let text = row[1]   //拿到当前行的真正的歌词
                let time_arr = row[0].substr(1, row[0].length - 1).split(":")   //将[01:13]秒转为["01","13"]用于先处理
                let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1])   //将时间统一转为秒
                lyricRow.time = s   //向对象存入数据
                lyricRow.text = text
                // push进lyryc数组
                this.lyric.push(lyricRow)
            }
        },
        // 处理显示歌词还是封面
        ChangecoverOrlyric() {
            this.coverOrlyric = !this.coverOrlyric
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

    .Word {
        height: 50%;
        width: 300px;

        .wordBox {
            width: 100%;
            height: 100%;
            // border: 1px solid red;
            position: relative;
            overflow: hidden;

            .wordContent {
                top: 100px;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 90%;
                // border: 1px solid blue;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                transition: all .3s;

                .wordItem {
                    margin-top: 20px;
                    font-size: 14px;
                    /*将对象作为弹性伸缩盒子模型显示*/
                    display: -webkit-box;
                    /*设置子元素排列方式*/
                    -webkit-box-orient: vertical;
                    /*设置显示的行数，多出的部分会显示为...*/
                    -webkit-line-clamp: 1;
                }

                .current {
                    color: #eff1f2;
                    font-size: 16px;
                }
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

    .dis {
        display: none;

    }
}
</style>
