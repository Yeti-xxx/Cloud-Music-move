import { ElMessage } from 'element-plus'
export default {
    methods: {
        async getUserInfo(uid) {
            console.log(uid);
            const res = await this.$h.get('/user/detail?uid=' + uid)
            return res

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
            // const res = await this.$h.get('/song/url?id=' + id)
            const res = await this.$h.get('/song/url/v1?id=' + id + '&level=standard')
            if (res.data[0].url === null) {
                return 'urlNull'
            }
            return res
        },
        // 获取歌曲信息
        async getMusicDetail(id) {
            const res = await this.$h.get('/song/detail?ids=' + id)
            console.log(res);
            return res
        },
        test() {
            console.log(111);
        },
        // 点击歌单进入歌单详情页面
        goToList(ListId) {
            this.$router.push({
                path: '/songListPage',
                query: {
                    id: ListId
                }
            })
        },
        // 时间戳转时间
        getDate(timeStr) {
            let date = new Date(timeStr)
            let Y = date.getFullYear()
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
            let D = parseInt((date.getDate() < 10 ? '0' + date.getDate() : date.getDate()))
            const time = {
                Y,
                M, D
            }
            return time
        },
        // 判断几零后
        getAge(time) {
            let Y = time.Y
            let res1 = '神秘后'
            switch (true) {
                case 2030 > Y && Y >= 2020:
                    res1 = '20后'
                    break;
                case 2020 > Y && Y >= 2010:
                    res1 = '10后'
                    break;
                case 2010 > Y && Y >= 2000:
                    res1 = '00后'
                    break;
                case 2000 > Y && Y >= 1990:
                    res1 = '90后'
                    break;
                case 1990 > Y && Y >= 1980:
                    res1 = '80后'
                    break;
                case 1980 > Y && Y >= 1970:
                    res1 = '70后'
                    break;
                case 1970 > Y && Y >= 1960:
                    res1 = '60后'
                    break;
                case 1960 > Y && Y >= 1950:
                    res1 = '50后'
                    break;
                case 1950 > Y && Y >= 1940:
                    res1 = '40后'
                    break;
                case 1940 > Y && Y >= 1930:
                    res1 = '30后'
                    break;
                case 1930 > Y && Y >= 1920:
                    res1 = '20后'
                    break;

            }
            return res1
        },
        // 判断星座
        getZodiac(time) {
            const M = parseInt(time.M)
            const D = parseInt(time.D)
            // 星座判断表
            const sdate = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22]
            // 星座表
            const conts = ['摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座']
            if (D < sdate[M - 1]) {
                return conts[M - 1]
            } else {
                return conts[M]
            }
        },
        // 读取身份证开头四位对应省市地区
        cityIdtoArea() {

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
        // 获取歌词
        async getWord(id) {
            const res = await this.$h.get('/lyric?id=' + id)
            return res.lrc
        },
    },
}