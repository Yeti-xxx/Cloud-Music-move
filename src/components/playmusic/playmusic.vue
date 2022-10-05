<template>
    <div class="music">
        <div class="music__main">
            <div :class="['music__main__cover',isPlay ? 'active' : '']" @click="play">
                <img
                    src="https://p1.music.126.net/Z4JpVcBpiT6FOuuFXH1m7A==/109951167908040334.jpg?imageView&quality=89" />
            </div>
            <div class="music__main__timeBar">
                <!-- <div class="time">
                    <span>{{ realMusicTime }}</span>
                    <span>{{ totalMusicTime }}</span>
                </div> -->
                <div class="bar" ref="bar" @click="handClickBar">
                    <div class="bar__slid" ref="slid" @click="handClickBar"></div>
                </div>
                <div class="head" ref="head"></div>
            </div>
        </div>
        <div class="music__btn">
            <i class="el-icon-refresh" @click="switchMusic"></i>
        </div>
        <div class="music__mask"></div>
        <audio ref="music" :src="audioSrc"></audio>
    </div>
</template>
<script>
export default {
    data() {
        this.audioSrcs = [
            'https://music.163.com/song/media/outer/url?id=1369798757.mp3', // 芒种
            
        ];
        return {
            isPlay: false,
            realMusicTime: "00:00",
            totalMusicTime: "00:00",
            audioSrc: this.audioSrcs[0]
        };
    },
    created() { },
    mounted() {
        this.watchMusicTime();
    },
    methods: {
        play() {
            if (this.music.paused) {
                this.music.play();
                this.isPlay = true;
            } else {
                this.music.pause();
                this.isPlay = false;
            }
        },
        // 处理时间
        handlMusicTime() {
            //用秒数来显示当前播放进度
            let timeDisplay = Math.floor(this.music.currentTime); //获取实时时间
            //分钟
            let minute = parseInt(timeDisplay / 60);
            if (minute < 10) {
                minute = "0" + minute;
            }
            //秒
            let second = Math.round(timeDisplay % 60);
            if (second < 10) {
                second = "0" + second;
            }
            this.realMusicTime = minute + ":" + second;
        },
        // 处理进度条
        handMusicBar() {
            let head = this.$refs.head;
            let slid = this.$refs.slid;
            let duration = this.music.duration;
            let x = ((this.music.currentTime / duration) * 100).toFixed(2) + "%";
            slid.style.width = x;
            let y = 281 * (this.music.currentTime / duration).toFixed(2);
            console.log(y);
            head.style.marginLeft = y + 'px';
        },
        // 处理点击进度条事件
        handClickBar(e) {
            const barTotalWidth = this.bar.offsetWidth; // bar 总宽度
            const rect = e.target.getBoundingClientRect(); // 元素右边距离页面边距的距离 返回上下左右
            let length = e.pageX - rect.left;
            this.music.currentTime = length / barTotalWidth * this.music.duration; // 计算播放时间 位置百分比*总时间
            this.$nextTick(() => {
                this.music.play();
                this.isPlay = true;
            })
        },
        // 切换歌曲
        switchMusic() {
            this.isPlay = false;
            this.audioSrc = this.audioSrcs[Math.floor(Math.random() * this.audioSrcs.length)];
            this.music.load()
            // 文件下载完毕，如果不用等到全部下载完毕，可以用canplay事件
            this.music.addEventListener("canplaythrough", () => {
                this.music.play();
                this.isPlay = true;
            });
        },
        //使用事件监听方式捕捉事件
        watchMusicTime() {
            this.music = this.$refs.music;
            this.bar = this.$refs.bar;
            this.music.addEventListener(
                "timeupdate",
                () => {
                    this.handlMusicTime();
                    this.$nextTick(() => {
                        this.handMusicBar();
                    })
                },
                false
            );
            // 播放完毕
            this.music.addEventListener("ended", () => {
                this.switchMusic(); // 自动播放
            });
            // 捕获音频文件已准备完毕
            // 当媒体文件可以播放的时候会触发oncanplay事件,也可以用oncanplay
            this.music.oncanplaythrough = () => {
                let time = this.music.duration;
                //分钟
                let minutes = parseInt(time / 60);
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                //秒
                let seconds = Math.round(time % 60);
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                this.totalMusicTime = minutes + ":" + seconds;
            };
        }
    }
};
</script>
<style lang="less">
@keyframes musicRotate {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

.music {
    position: fixed;
    bottom:59px;
    width: 375px;
    margin: 0 auto;
    // border-radius: 15px;
    // position: relative;
    padding: 5px 22px;
    box-sizing: border-box;
    overflow: hidden;
    background:#1c1c1e;

    &__main {
        display: flex;

        &__cover {
            width: 40px;
            height: 40px;
            overflow: hidden;
            border-radius: 50%;
            background-color: #dddddd;
            cursor: pointer;
            animation: musicRotate 10s linear infinite;
            animation-play-state: paused; // 暂定动画

            img {
                width: 100%;
                height: 100%;
            }

            &.active {
                animation-play-state: running; // 运行动画
            }
        }

        &__timeBar {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            padding-left: 10px;
            box-sizing: border-box;

            // .time {
            //     display: flex;
            //     justify-content: space-between;
            //     color: #fff;

            //     span {
            //         font-size: 12px;
            //         line-height: 1;
            //     }
            // }

            .bar {
                height: 1px;
                background-color: rgba(235, 241, 251, 0.5);
                border-radius: 8px;
                position: relative;
                border-radius: 8px;
                overflow: hidden;
                cursor: pointer;

                &__slid {
                    position: absolute;
                    left: 0;
                    top: 0;
                    background-color: rgba(241, 243, 244, 0.9);
                    height: 100%;
                    width: 0;
                    transition: width 0.3s;
                }


            }

            .head {
                transition: width 0.3s;
                position: absolute;
                width: 8px;
                height: 8px;
                border-radius:50%;
                background: rgba(241, 243, 244, 0.9);
            }
        }
    }

    &__btn {
        position: absolute;
        right: 30px;
        top: 10px;

        i {
            font-size: 18px;
            color: #fff;
            cursor: pointer;
        }
    }

    &__mask {
        background-image: url('../../assets/meet.jpg');
        z-index: -2;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        filter: blur(15px);
        opacity: 0.5;
        transition: all 0.8s;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;

        &::before {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: -1;
            content: '';
            background-color: rgba(0, 0, 0, 0.08);
        }
    }
}
</style>