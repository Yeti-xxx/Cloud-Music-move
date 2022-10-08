export default {
    methods: {
        async getUserInfo(uid) {
            console.log(uid);
            const { profile: res } = await this.$h.get('/user/detail?uid=' + uid)
            return res

        },// 获取歌曲url
        async getMusicUrl(info) {
            const res = await this.$h.get('/song/url?id=' + info.id)
            this.musicUrl = res.data[0].url
            return true
        },
        // 向父组件中的音乐播放器组件传入数据
        async playMusic(songInfo) {
            console.log(songInfo);
            const res = await this.getMusicUrl(songInfo);
            if (res) {
                // console.log(this.musicUrl);
                this.playMusictoApp(this.musicUrl, songInfo.picUrl, songInfo.name)
            }
        },
        // 获取歌曲url
        async getMusicUrl(id) {
            const res = await this.$h.get('/song/url?id=' + id)
            return res
        },
        
        test() {
            console.log(111);
        }
    },
}