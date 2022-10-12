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
                <div class="share">
                    <el-icon :size="20">
                        <Share />
                    </el-icon>
                </div>
            </div>
            <div class="cover">
                <img src="../../assets/img/playDefaultPic.png" />
                <div class="pic">
                    <img :src="song.al.picUrl" />
                </div>
            </div>
        </el-card>
        <!-- 数据未完成加载时 -->
        <el-card class="loadingbox" v-else>
            <div class="loading"></div>
            <div class="text">加载中....</div>
        </el-card>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import mixinItem from '../../mixins/mixin.js'
import { useRoute } from "vue-router";
export default {
    name: 'SongPage',
    mixins: [mixinItem],
    data() {
        return {
            songId: 0,
            song: {},

        }
    },
    computed: {
        ...mapState('m_play', ['showPlay']),

    },
    async created() {
        this.songId = this.$route.query.id
        const res = await this.getMusicDetail(this.songId)
        this.song = res.songs[0]
        this.updateShowPlay()
        // console.log(this.song);

    },
    methods: {
        ...mapMutations('m_play', ['updateShowPlay']),
        // 关闭SongPage
        closed() {
            this.$router.push('/home')
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
    height: 667px;

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
            animation: musicRotate 10s linear infinite;
            animation-play-state: running;
            height: 265px;
            width: 265px;

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
}
</style>
