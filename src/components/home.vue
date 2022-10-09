<template>
  <div class="container">

    <!-- 导航栏区域 -->
    <div class="nav">
      <el-icon color="#eee" :size="24">
        <Expand />
      </el-icon>
    </div>
    <!-- 轮播图区域 -->
    <div class="block text-center swiper-container" m="t-4">
      <span class="demonstration"></span>
      <el-carousel trigger="click" height="120px" arrow="never">
        <el-carousel-item>
          <img src="https://p1.music.126.net/4x-Bb_lQjE6CVYAMBwOCUA==/109951167908016146.jpg?imageView&quality=89" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="https://p1.music.126.net/FizHXcyfaQ9VBfdixMeqEQ==/109951167908041093.jpg?imageView&quality=89" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="https://p1.music.126.net/0-q3AZqok0fkG0EucQyoqw==/109951167908035565.jpg?imageView&quality=89" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="https://p1.music.126.net/Z4JpVcBpiT6FOuuFXH1m7A==/109951167908040334.jpg?imageView&quality=89" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 功能导航栏 -->
    <div class="use-nav">
      <div class="use-nav-item">
        <div class="use-nav-item-back">
          <el-icon color="red" :size="27">
            <Calendar />
          </el-icon>
        </div>
        <p style="fontSize:14px;color:gray;margin-top:5px;">每日推荐</p>
      </div>
      <div class="use-nav-item">
        <div class="use-nav-item-back">
          <el-icon color="red" :size="27">
            <Headset />
          </el-icon>
        </div>
        <p style="fontSize:14px;color:gray;margin-top:5px;">歌单</p>
      </div>
      <div class="use-nav-item">
        <div class="use-nav-item-back">
          <el-icon color="red" :size="27">
            <Histogram />
          </el-icon>
        </div>
        <p style="fontSize:14px;color:gray;margin-top:5px;">排行榜</p>
      </div>
      <div class="use-nav-item">
        <div class="use-nav-item-back">
          <el-icon color="red" :size="27">
            <Flag />
          </el-icon>
        </div>
        <p style="fontSize:14px;color:gray;margin-top:5px;">推荐音乐</p>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend-music-list">
      <div class="title" style="color:#fff;margin:13px;">推荐歌单</div>
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <div v-for="(item,i) in musicList" :key="i" class="scrollbar-demo-item" @click="goToList(item.id)">
            <img class="ListImg" :src="item.picUrl" alt="">
            <div class="ListTitle">{{item.name}}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <!-- 大家都在听 -->
    <!-- 写死只曲九首歌曲 -->
    <div class="WeListen">
      <div class="WeTitle" style="color:#fff;margin:11px 0 2px 13px;">大家都在听</div>
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <div class="scrollbar-demo-item">
            <div class="WeListen-item" v-for="(item,index) in weListen.slice(0,3)" :key="index"
              @click="playMusic(item)">
              <div class="Welisten-item-song">
                <img :src="item.picUrl" class="song-img" />
                <div class="song-item">{{item.name}}</div>
                <div class="song-artists">-{{item.song.artists[0].name}}</div>
              </div>
            </div>
          </div>
          <div class="scrollbar-demo-item">
            <div class="WeListen-item" v-for="(item,index) in weListen.slice(3,6)" :key="index"
              @click="playMusic(item)">
              <div class="Welisten-item-song">
                <img :src="item.picUrl" class="song-img" />
                <div class="song-item">{{item.name}}</div>
                <div class="song-artists">-{{item.song.artists[0].name}}</div>
              </div>
            </div>
          </div>
          <div class="scrollbar-demo-item">
            <div class="WeListen-item" v-for="(item,index) in weListen.slice(6,9)" :key="index"
              @click="playMusic(item)">
              <div class="Welisten-item-song">
                <img :src="item.picUrl" class="song-img" />
                <div class="song-item">{{item.name}}</div>
                <div class="song-artists">-{{item.song.artists[0].name}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <!-- 音乐播放器
    <playmusic></playmusic> -->
    <!-- tabbar -->
    <tabbar :pageNum="pageIndex"></tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import axios from '../axios/http.js'
import playmusic from './playmusic/playmusic.vue'
import Tabbar from './tababr/tabbar.vue'
export default {
  name: 'home',
  components: {
    Tabbar,
    playmusic
  },
  data() {
    return {
      musicList: {},
      weListen: [],
      pageIndex: 1,
      musicUrl: ''
    }
  },
  created() {
    // 获取推荐歌单
    this.getMusicList()
    // 获取大家都在听
    this.getWeListen()
  },
  inject: ['playMusictoApp'],
  methods: {
    // 获取歌单数据
    async getMusicList() {
      const { result: res } = await this.$h.get('/personalized?limit=6')
      this.musicList = res

    },
    // 大家都在听
    async getWeListen() {
      const { result: res } = await this.$h.get('/personalized/newsong?limit=9')
      this.weListen = res
    },
    // 获取歌曲url
    async getMusicUrl(info) {
      const res = await this.$h.get('/song/url?id=' + info.id)
      this.musicUrl = res.data[0].url
      return true
    },
    // 向父组件中的音乐播放器组件传入数据
    async playMusic(songInfo) {
      // console.log(songInfo);
      const res = await this.getMusicUrl(songInfo);
      if (res) {
        // console.log(this.musicUrl);
        this.playMusictoApp(this.musicUrl, songInfo.picUrl, songInfo.name,songInfo.id)
      }
    },
    // 点击歌单进入歌单详情页面
    goToList(ListId) {
      this.$router.push({
        path: '/songListPage',
        query: {
          id:ListId
        }
      })
    }
  }


}

</script>

<style lang='less' scoped>
.container {
  background-color: #242424;
  width: 100%;
  padding-bottom: 123px;
  // height: 750px;

}

.nav {
  padding-top: 5px;
  padding-left: 5px;
}

.swiper-container {
  margin: auto;
  margin-top: 20px;
  width: 340px;

  img {
    border-radius: 5%;
    width: 100%;
    height: 100%;
  }
}

.use-nav {
  margin: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #322f2f;

}

.use-nav-item-back {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  background-color: rgba(255, 0, 0, 0.3)
}

.use-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recommend-music-list {
  border-radius: 10px;
  border-bottom: 1px solid #322f2f;
}

.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  // flex-shrink: 0;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  width: 180px;
  height: 134px;
  margin: 10px;
  // text-align: center;
  // border-radius: 4px;
  // background: var(--el-color-danger-light-9);
  color: #fff;

  .ListImg {
    height: 100px;
    width: 100px;
    border-radius: 10px;
  }

  .ListTitle {
    padding: 2px 4px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.WeListen {
  .scrollbar-demo-item {
    flex-shrink: 0;
    // background-color: red;
    width: 300px;
    height: 160px;
  }

  .WeListen-item {
    .Welisten-item-song {
      width: 100%;
      padding: 5px;
      display: flex;
      align-items: center;

      border-bottom: 1px solid #1e1e1e;

      .song-img {
        border-radius: 4px;
        height: 40px;
        width: 40px;
      }

      .song-item {
        margin-left: 5px;
        font-size: 14px;
      }

      .play {
        margin-right: 5px;
      }

      .song-artists {
        font-size: 12px;
        color: #979797;
      }

    }
  }
}
</style>
