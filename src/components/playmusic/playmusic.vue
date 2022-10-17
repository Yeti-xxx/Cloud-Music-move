<template>
    <div class="music" ref="big">
        <div class="music__main">
            <div :class="['music__main__cover',isPlay ? 'active' : '']" ref="cover" @click="pause">
                <img :src="songPic" />
            </div>
            <div class="music__main__timeBar">
                <!-- <div class="time" ref="time" style="display:none">
                    <span>{{ realMusicTime }}</span>
                    <span>{{ totalMusicTime }}</span>
                </div> -->
                <div class="title" ref="title" @click="gotoSongPage">
                    <spna>{{songName}}</spna>
                </div>
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
import { reactive } from 'vue'
import { mapState, mapMutations } from 'vuex'
import mixinItem from '../../mixins/mixin.js'
export default {
    setup() {
        const audioSrcs = reactive([]);
        return {
            audioSrcs
        }
    },
    computed: {
        ...mapState('m_play', ['playIt', 'changeMusic', 'songStore', 'songListStore']),
        ...mapState('t_play', ['TsongListStore'])
    },
    watch: {
        changeMusic(newV, oldV) {
            this.changeTheMusic(this.changeMusic)
        }
    },
    mixins: [mixinItem],
    data() {
        return {
            isPlay: false,
            realMusicTime: "00:00",
            totalMusicTime: "00:00",
            audioSrc: '',
            songPic: 'data:image/jpeg;base64,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',
            songName: '',
            songId: 0,
            song: {},
            audioIndex: 0
        };
    },
    created() {
    },
    mounted() {
        this.watchMusicTime();
    },
    methods: {
        ...mapMutations('m_play', ['updateChangeMusic', 'updatesongStore', 'updateplayIt','playTotrue']),
        // 离开回复缩下版样式
        showStyle() {
            this.$refs.cover.style.display = 'block'
            this.$refs.title.style.display = 'block'
            // this.$refs.time.style.display = 'none'
            this.$refs.bar.style.height = '1px'
            this.$refs.big.style.width = '374px'
            this.$refs.big.style.background = '#1c1c1e'

        },
        // 进入songPage页面需要修改布局和样式
        noneStyle() {
            this.$refs.cover.style.display = 'none'
            this.$refs.title.style.display = 'none'
            // this.$refs.time.style.display = 'flex'
            this.$refs.big.style.width = '360px'
            // 进度条放大
            this.$refs.bar.style.height = '2px'
            this.$refs.big.style.background = 'rgba(0,0,0,0)'


        },
        // 点击歌曲标题，进入歌曲详情页面
        gotoSongPage() {
            this.$router.push({
                path: '/songPage',
                query: {
                    id: this.songId
                }
            })
        },
        // 点击单首歌曲时的方法
        OneclickPlay(url, pic, name, id) {
            // console.log(6666);
            this.audioSrc = '' + url
            if (this.audioSrcs.indexOf(url + '@#' + id) === -1) {
                this.audioSrcs.push(url + '@#' + id)
            }
            this.songPic = pic
            this.songName = name
            this.songId = id
            setTimeout(() => {
                this.play()
            }, 300);

        },
        play() {
            this.music.play();
            this.isPlay = true;
        },
        pause() {
            console.log(this.isPlay);
            if (this.isPlay === true) {
                this.isPlay = false;
                this.music.pause();
            } else {
                this.isPlay = true;
                this.music.play()
            }
            this.updateplayIt()
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
            // console.log(y);
            head.style.marginLeft = y + 'px';
        },
        // 处理点击进度条事件
        handClickBar(e) {
            this.playTotrue()
            const barTotalWidth = this.bar.offsetWidth; // bar 总宽度
            const rect = e.target.getBoundingClientRect(); // 元素右边距离页面边距的距离 返回上下左右
            let length = e.pageX - rect.left;
            this.music.currentTime = length / barTotalWidth * this.music.duration; // 计算播放时间 位置百分比*总时间
            this.$nextTick(() => {
                this.music.play();
                this.isPlay = true;
            })
        },
        // 播放完后随机切换歌曲
        async switchMusic() {
            const preaudioSrc = this.audioSrc
            this.isPlay = false;
            this.audioIndex = Math.floor(Math.random() * this.audioSrcs.length)
            // console.log(this.audioIndex);
            const str = this.audioSrcs[this.audioIndex];
            // 获取到随机值后
            const arr = str.split('@#')
            // 获取url
            this.audioSrc = arr[0]
            // 判断前后歌曲是否相同，减少请求
            if (this.audioSrc !== preaudioSrc) {
                // 获取id
                const id = arr[1]
                // 调用获取歌曲详情函数
                const { songs: res } = await this.getMusicDetail(id)
                // 修改封面
                this.songPic = res[0].al.picUrl
                // 修改歌曲名称
                this.songName = res[0].al.name
                this.song = res[0]
                this.songToStore(this.song)
            }
            this.updateChangeMusic(this.changeMusic + '1')
            this.music.load()
            // 文件下载完毕，如果不用等到全部下载完毕，可以用canplay事件
            this.music.addEventListener("canplay", () => {
                this.music.play();
                this.isPlay = true;
            });
        },
        // 切换歌曲
        async changeTheMusic() {
            let res = null
            const temp = this.audioSrc + '@#' + this.songId
            // 获取当前歌曲在歌曲数组中的位置
            for (let index = 0; index < this.audioSrcs.length; index++) {
                if (temp === this.audioSrcs[index]) {
                    this.audioIndex = index
                    // console.log(this.audioIndex);+
                    break;
                }

            }
            if (this.changeMusic === 'next') {
                // 获取当前的audioIndex加一
                if (this.audioIndex === this.audioSrcs.length - 1) {
                    this.audioIndex = 0
                } else {
                    this.audioIndex++
                }
            } else if (this.changeMusic === 'pre') {
                // 获取当前的audioIndex减一
                if (this.audioIndex === 0) {
                    this.audioIndex = this.audioSrcs.length - 1
                } else {
                    this.audioIndex--
                }
            } else if (changeMusicHandle === 'qie') {

            }
            const str = this.audioSrcs[this.audioIndex];
            const arr = str.split('@#')
            // 获取url
            this.audioSrc = arr[0]
            // 获取id
            const id = arr[1]
            let flagToget = true
            console.log(id);
            // 判断缓存中是否存在歌曲的封面等信息，避免重复请求
            for (let i = 0; i < this.TsongListStore.length; i++) {
                if (this.TsongListStore[i].id == id) {
                    this.songPic = this.TsongListStore[i].al.picUrl
                    this.songName = this.TsongListStore[i].name
                    this.song = this.TsongListStore[i].al
                    flagToget = false
                    res = i
                    break;
                }

            }
            // 缓存中不存在歌曲的信息
            if (flagToget) {
                // 调用获取歌曲详情函数
                const data = await this.getMusicDetail(id)
                res = data.songs
                // 修改封面
                this.songPic = res[0].al.picUrl
                // 修改歌曲名称
                this.songName = res[0].al.name
                this.song = res[0].al
                // 加入缓存中
                console.log(1111);
                console.log(this.TsongListStore);
                this.TsongListStore.push(res[0])
            }
            this.songToStore(this.song)
            this.music.load()
            // 文件下载完毕，如果不用等到全部下载完毕，可以用canplay事件
            this.music.addEventListener("canplay", () => {
                this.music.play();
                this.isPlay = true;
            });
            return res
        },
        songToStore(song) {
            // console.log(111);
            this.updatesongStore(song)
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

    width: 374px;
    margin: 0 auto;
    margin-left: 1px;
    // border-radius: 15px;
    // position: relative;
    padding: 5px 22px;
    box-sizing: border-box;
    overflow: hidden;
    background: #1c1c1e;
    transition: .7s;

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
                width: 40px;
                height: 40px;
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

            .title {
                width: 200px;
                color: #e9e9e9;
                font-size: 12px;
                // line-height: 12px;
                font-weight: 500;
                overflow: hidden;
                /*文本不会换行*/
                white-space: nowrap;
                /*当文本溢出包含元素时，以省略号表示超出的文本*/
                text-overflow: ellipsis;

            }

            .time {
                display: flex;
                justify-content: space-between;
                color: #ceb8b7;

                span {
                    // position:absolute;
                    font-size: 12px;
                    line-height: 1;
                    transform: scale(0.8);
                }


            }

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
                top: 34px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
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
        // background-image: url('../../assets/meet.jpg');
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