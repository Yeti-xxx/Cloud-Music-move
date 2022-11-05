<template>
    <div class="music" ref="big">
        <div class="music__main">
            <div :class="['music__main__cover', isPlay ? 'active' : '']" ref="cover" @click="pause">
                <img :src="songPic" />
            </div>
            <div class="music__main__timeBar">
                <!-- <div class="time" ref="time" style="display:none">
                    <span>{{ realMusicTime }}</span>
                    <span>{{ totalMusicTime }}</span>
                </div> -->
                <div class="title" ref="title" @click="gotoSongPage">
                    <spna>{{ songName }}</spna>
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
import urltext from './url.js'
export default {
    setup() {
        const audioSrcs = reactive([]);
        return {
            audioSrcs
        }
    },
    computed: {
        ...mapState('m_play', ['playIt', 'changeMusic', 'songStore', 'songListStore']),
        ...mapState('t_play', ['TsongListStore', 'TlyricTime'])
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
            songPic: urltext.url,
            songName: '',
            songId: 0,
            song: {},
            audioIndex: 0,
            word: {},
            lyric: {}
        };
    },
    created() {
    },
    mounted() {
        this.watchMusicTime();
    },
    methods: {
        ...mapMutations('m_play', ['updateChangeMusic', 'updatesongStore', 'updateplayIt', 'playTotrue']),
        ...mapMutations('t_play', ['updatedTlyricTime']),
        // 离开回复缩下版样式
        showStyle() {
            this.$refs.cover.style.display = 'block'
            this.$refs.title.style.display = 'block'
            // this.$refs.time.style.display = 'none'
            this.$refs.bar.style.height = '1px'
            this.$refs.big.style.width = '100%'
            this.$refs.big.style.background = '#1c1c1e'

        },
        // 进入songPage页面需要修改布局和样式
        noneStyle() {
            this.$refs.cover.style.display = 'none'
            this.$refs.title.style.display = 'none'
            // this.$refs.time.style.display = 'flex'
            this.$refs.big.style.width = '100%'
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
            // console.log(this.music);
            this.isPlay = true;
        },
        pause() {
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
            let lyricTime = Math.ceil(this.music.currentTime)   //向外传递当前播放的时间
            this.updatedTlyricTime(lyricTime)
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
                this.songName = res[0].name
                // console.log(res[0])
                this.song = res[0]
                // 10.23晚处理
                this.songId = res[0].id
                this.song.Id = res[0].id
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
            // console.log(this.songId);
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
            this.songId = id
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
                this.word = (await this.getWord(id)).lyric
                res = data.songs
                // 歌词存入res
                res[0].word = this.word
                // 修改封面
                this.songPic = res[0].al.picUrl
                // 修改歌曲名称
                this.songName = res[0].al.name
                this.song = res[0].al
                // 加入缓存中
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
                // console.log(time);
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
        },
        downLoadForm() {
            let form = {}
            form.id = this.songId
            form.name = this.songName
            form.url = this.audioSrc
            // form.author = this.
            return form
    }   }
};
</script>
<style lang="less">
::v-deep(.el-card) {
    --el-card-padding: 0;
    --el-card-border-color: 0;
    background-color: #2b2b2b;
    border: 0;
    border-radius: 0;
}

::v-deep(.el-card__body) {
    padding: 0;
}

@keyframes musicRotate {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

.music {

    width: 100%;
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