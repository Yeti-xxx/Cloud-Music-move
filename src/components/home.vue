<template>
  <!-- 下拉刷新loading -->
  <div class="loadingBoxHome" v-if="loadingShow">
    <div class="loading"></div>
  </div>
  <div class="container" ref="container">

    <!-- 导航栏区域 -->
    <div class="nav">
      <el-icon color="#eee" :size="28">
        <Expand />
      </el-icon>
      <div class="searchBox" @click="gotoSearch">
        <div class="content">
          <div class="iconSearch">
            <el-icon :size="18" color="#777777">
              <Search />
            </el-icon><span>搜一搜</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 轮播图区域 -->
    <div class="block text-center swiper-container" m="t-4">
      <span class="demonstration"></span>
      <el-carousel trigger="click" height="120px" arrow="never">
        <el-carousel-item v-for="(item, i) in bannerArray.slice(0, 4)">
          <img :src="item.pic" />
        </el-carousel-item>
        <!-- <el-carousel-item>
          <img src="https://p1.music.126.net/BslMskq6ErHDp0Ofs8twtA==/109951168005893915.jpg?imageView&quality=89" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="http://p1.music.126.net/JD41xXDJOm6JeBY2Tl1JCA==/109951168008178362.jpg?imageView&quality=89" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="http://p1.music.126.net/2qz-OK92qCCp2_eE7hP1sQ==/109951168006173044.jpg?imageView&quality=89" />
        </el-carousel-item> -->
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
          <div v-for="(item, i) in musicList" :key="i" class="scrollbar-demo-item" @click="goToList(item.id)">
            <img class="ListImg" :src="item.picUrl" alt="">
            <div class="ListTitle">{{ item.name }}</div>
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
            <div class="WeListen-item" v-for="(item, index) in weListen.slice(0, 3)" :key="index"
              @click="playMusic(item)">
              <div class="Welisten-item-song">
                <img :src="item.picUrl" class="song-img" />
                <div class="song-item">{{ item.name }}</div>
                <div class="song-artists">-{{ item.song.artists[0].name }}</div>
              </div>
            </div>
          </div>
          <div class="scrollbar-demo-item">
            <div class="WeListen-item" v-for="(item, index) in weListen.slice(3, 6)" :key="index"
              @click="playMusic(item)">
              <div class="Welisten-item-song">
                <img :src="item.picUrl" class="song-img" />
                <div class="song-item">{{ item.name }}</div>
                <div class="song-artists">-{{ item.song.artists[0].name }}</div>
              </div>
            </div>
          </div>
          <div class="scrollbar-demo-item">
            <div class="WeListen-item" v-for="(item, index) in weListen.slice(6, 9)" :key="index"
              @click="playMusic(item)">
              <div class="Welisten-item-song">
                <img :src="item.picUrl" class="song-img" />
                <div class="song-item">{{ item.name }}</div>
                <div class="song-artists">-{{ item.song.artists[0].name }}</div>
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
import { reactive } from 'vue'
import { mapState, mapMutations } from 'vuex'
// import axios from '../axios/http.js'
import playmusic from './playmusic/playmusic.vue'
import Tabbar from './tababr/tabbar.vue'
export default {
  name: 'home',
  setup() {
    const weListen = reactive([]);
    return {
      weListen
    }
  },
  components: {
    Tabbar,
    playmusic
  },
  computed: {
    ...mapState('m_home', ['musicListinStore', 'weListeninStore', 'refreshTime', 'bannerArrayinStore'])
  },
  data() {
    return {
      musicList: {},
      // weListen: [],
      pageIndex: 1,
      musicUrl: '',
      isRefresh: true,
      loadingShow: false,
      searchHotArray: [],
      bannerArray: []
    }
  },
  async created() {
    // 无缓存
    if (this.musicListinStore == '11' && this.weListeninStore == '22') {
      // 获取轮播图
      this.getBanner()
      // 获取推荐歌单
      this.getMusicList()
      // 获取大家都在听
      this.getWeListen()
      // 获取热搜数据
      this.getSearchHot()
      this.updatedMusicListinStore(this.musicList)
      this.updatedWeListeninStore(this.weListen)
      this.updatedSerachHot(this.searchHotArray)
      this.updatedBannerArrayinStore(this.bannerArray)

    }
    // 设置时间戳，用于每隔一小时进行一次刷新获取新数据
    if (this.refreshTime === '0') {
      let startDate = new Date()
      this.uodateRefreshTime(startDate.getTime() + '')
    } else {
      let nowDate = new Date()
      const nowtime = nowDate.getTime() //获取当前时间
      if (nowtime - parseInt(this.refreshTime) > 1000 * 60 * 60) {
        this.uodateRefreshTime(nowtime + '')
        // 获取轮播图
        this.getBanner()
        // 获取推荐歌单
        this.getMusicList()
        // 获取大家都在听
        this.getWeListen()
        // 获取热搜数据
        this.getSearchHot()
        this.updatedMusicListinStore(this.musicList)
        this.updatedWeListeninStore(this.weListen)
        this.updatedSerachHot(this.searchHotArray)
        this.updatedBannerArrayinStore(this.bannerArray)

      }
    }
    // 有缓存
    this.musicList = this.musicListinStore
    this.weListen = this.weListeninStore
    this.bannerArray = this.bannerArrayinStore

  },
  mounted() {
    this.downRefresh()
  },
  inject: ['playMusictoApp'],
  methods: {
    ...mapMutations('m_home', ['updatedMusicListinStore', 'updatedWeListeninStore', 'uodateRefreshTime', 'updatedSerachHot', 'updatedBannerArrayinStore']),
    // 获取轮播图数据
    async getBanner() {
      const { banners: res } = await this.$h.get('/banner?type=2')
      this.bannerArray = res
    },
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
        this.playMusictoApp(this.musicUrl, songInfo.picUrl, songInfo.name, songInfo.id)
      }
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
    // 下拉刷新
    downRefresh() {
      let start = 0 //初始位置
      let transitionHeight = 0  //移动距离
      let This = this
      this.$refs.container.addEventListener('touchstart', function (e) {
        start = e.touches[0].pageY
      }, false)
      this.$refs.container.addEventListener('touchmove', async function (e) {
        transitionHeight = e.touches[0].pageY - start //记录差值
        if (transitionHeight > 0 && document.documentElement.scrollTop === 0) {
          if (transitionHeight > 250 && This.isRefresh) {
            This.isRefresh = false
            This.loading()
            await This.getMusicList()
            await This.getWeListen()
            await This.getSearchHot()
            await This.getBanner()
            This.updatedBannerArrayinStore(This.bannerArray)
            This.updatedMusicListinStore(This.musicList)
            This.updatedWeListeninStore(This.weListen)
            This.updatedSerachHot(This.searchHotArray)

          }
        }
      }, { passive: false })
    },
    //刷新效果动画
    loading() {
      this.loadingShow = true
      setTimeout(() => {
        this.isRefresh = true
        this.loadingShow = false
      }, 1000);
    },
    // 前往搜索页面
    gotoSearch() {
      this.$router.push('/search')
    },
    // 获取搜索界面的热搜数据
    async getSearchHot() {
      const { data: res } = await this.$h.get('/search/hot/detail')
      this.searchHotArray = res
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

  .searchBox {
    width: 100%;
    position: absolute;
    top: 0;
    left: 65px;

    .content {
      position: relative;
      margin-top: 7px;
      height: 30px;
      width: 70%;
      background-color: #3d3d3d;

      .iconSearch {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        position: absolute;
        top: 7px;
        left: 35%;

        span {
          margin-left: 5px;
          font-weight: 600;
          color: #646464;
        }
      }

    }

    .content::after {
      position: absolute;
      right: -20px;
      display: inline-block;
      content: "";
      height: 30px;
      width: 30px;
      border-radius: 50%;
      background-color: #3d3d3d;
    }

    .content::before {
      position: relative;
      left: -20px;
      display: inline-block;
      content: "";
      height: 30px;
      width: 30px;
      border-radius: 50%;
      background-color: #3d3d3d;
    }
  }
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

// 转转转动画
@keyframes circle {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loadingBoxHome {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;

  .loading {
    width: 20px;
    height: 20px;
    border: 2px solid #e63434;
    border-top-color: transparent;
    border-radius: 100%;
    animation: circle infinite 0.75s linear;
  }
}
</style>
