<template>
    <div class="videoContainer" ref="videoContainer">
        <video ref="videoPlay" loop="true">
            <source ref="source" :src="videoUrl" type="video/mp4" />
        </video>
        <div class="model" @click="playVideo">
            <div class="playFlagBox" v-show="!play">
                <el-icon :size="50" color="#fff">
                    <VideoPlay />
                </el-icon>
            </div>
        </div>
        <div class="timeBar" ref="timeBar" @click="handlerClickTimeBar">
        </div>
        <div class="timeOverBar" ref="timeOverBar" @click="handlerClickTimeBar"></div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'video',
    props: {
        videoUrl: String
    },
    watch: {
        toPlayScrollTop(newV, oldV) {
            if (this.$refs.videoContainer.offsetTop - newV < 250 && -100 < this.$refs.videoContainer.offsetTop - newV) {
                this.$refs.videoPlay.play()
                this.play = true
            } else {
                this.$refs.videoPlay.pause()
                this.play = false
            }
        }
    },
    computed: {
        ...mapState('t_video', ['toPlayScrollTop'])
    },
    data() {
        return {
            alltimer: 0,
            currentTime: 0,
            play: false,
            videoContainerScrollTop: 0
        }
    },
    mounted() {
        this.handlerTimeBar()
    },
    methods: {
        playVideo() {
            this.$refs.videoPlay.play()
        },
        // 处理进度条
        handlerTimeBar() {
            let This = this
            this.$refs.videoPlay.addEventListener('timeupdate', function () {
                This.alltimer = This.$refs.videoPlay.duration
                This.currentTime = This.$refs.videoPlay.currentTime
                const persent = Math.ceil((This.currentTime / This.alltimer) * 100)
                This.$refs.timeOverBar.style.width = persent + '%'
            })
        },
        // 处理点击进度条
        handlerClickTimeBar(e) {
            // (e);
            const barTotalWidth = this.$refs.timeBar.offsetWidth
            const rect = e.target.getBoundingClientRect() //元素右边距离页面边距的距离 返回上下左右
            let length = e.pageX - rect.left;   //获取点击的长度
            this.$refs.videoPlay.currentTime = length / barTotalWidth * this.$refs.videoPlay.duration
        },
        // 暂停或播放处理
        playVideo() {
            if (this.play) {
                this.$refs.videoPlay.pause()
                this.play = false
            } else {
                this.$refs.videoPlay.play()
                this.play = true
            }
        },

    }

}

</script>

<style lang='less' scoped>
.videoContainer {
    position: relative;
    height: 100%;
    width: 100%;

    video {
        width: 99%;
        height: 99%;
    }

    .model {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;

    }

    .timeBar {
        position: absolute;
        bottom: 5px;
        height: 2px;
        width: 100%;
        background-color: #adadad;
    }

    .timeOverBar {
        position: absolute;
        bottom: 5px;
        height: 2px;
        background-color: #e63434;
        transition: all .4s;
    }

}
</style>
