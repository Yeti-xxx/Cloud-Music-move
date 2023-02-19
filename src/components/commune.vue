<template>
  <div class="communeContainer" ref="communeContainer">
    <!-- 下拉刷新loading -->
    <div class="loadingBoxHome" v-if="loadingShow">
      <div class="loading"></div>
    </div>
    <el-card class="box-card">
      <div class="box" v-for="(item, i) in videoArray" :key="i">
        <div class="videoItem" v-if="item.data.urlInfo">
          <div class="videoBox">
            <!-- 视频组件 -->
            <VideoPlay v-bind:videoUrl="item.data.urlInfo.url"></VideoPlay>
          </div>
          <div class="bottomBox">
            <div class="title">{{ item.data.title }}</div>
            <div class="information">
              <div class="authorAvator">
                <el-avatar :src="item.data.creator.avatarUrl" :size="30" />
              </div>
              <div class="authorNickname">{{ item.data.creator.nickname }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <Tabbar :pageNum="4"></Tabbar>
  </div>
</template>
  
<script>
import { mapState, mapMutations } from 'vuex'
import Tabbar from './tababr/tabbar.vue'
import VideoPlay from './video/video.vue'
export default {
  name: 'commune',
  data() {
    return {
      videoArray: [],
      page: 1,
      fresh: true,
      isRefresh: true,
      loadingShow: false
    }
  },
  computed: {
    ...mapState('m_video', ['videoPageInstore', 'videoArrayInstore']),
    ...mapState('t_video', ['videoScrollTop'])
  },
  components: {
    Tabbar,
    VideoPlay
  },
  watch: {

  },
  created() {
    // 获取视频资源
    if (this.videoArrayInstore === '11') {
      this.getVideo()
    } else {
      this.videoArray = this.videoArrayInstore
    }
    this.videoPage = this.videoPageInstore
  },
  mounted() {
    document.documentElement.scrollTop = this.videoScrollTop
    this.upFresh()
    this.downRefresh()
    this.MoveScrollTop()
  },
  beforeUnmount() {
    // 离开时记录scrollTop
    this.getScrollTop()
  },
  methods: {
    ...mapMutations('m_video', ['updatedVideoPageInstore', 'updatedVideoArrayInstore']),
    ...mapMutations('t_video', ['updatedVideoScrollTop', 'updatedToPlayScrollTop']),
    // 获取视频
    async getVideo() {
      const { datas: res } = await this.$h.get('/video/timeline/recommend?offset=' + this.page)
      this.videoArray = [...this.videoArray, ...res]
      this.updatedVideoArrayInstore(this.videoArray)
      this.page++
    },
    /**
     * 上拉加载视频
     */
    upFresh() {
      let This = this
      this.$refs.communeContainer.addEventListener('touchstart', async function (e) {
        let clientHeight = document.documentElement.clientHeight; //浏览器高度
        let scrollHeight = document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop;
        let distance = 20  //距离可视窗口多高时发起请求
        // 已经触底 发起请求
        if ((scrollTop + clientHeight) >= (scrollHeight - distance)) {
          if (This.fresh) {
            This.fresh = false
            await This.getVideo()
            This.fresh = true
          }
        }
      }, false)

    },
    /**
     * 下拉刷新
     */
    downRefresh() {
      let start = 0 //初始位置
      let transitionHeight = 0  //移动距离
      let This = this
      this.$refs.communeContainer.addEventListener('touchstart', function (e) {
        start = e.touches[0].pageY
      }, false)
      this.$refs.communeContainer.addEventListener('touchmove', async function (e) {
        transitionHeight = e.touches[0].pageY - start //记录差值
        if (transitionHeight > 0 && document.documentElement.scrollTop === 0) {
          if (transitionHeight > 250 && This.isRefresh) {
            This.isRefresh = false
            This.loading()
            This.videoArray = []
            This.getVideo()
            This.updatedVideoScrollTop(0)
          }
        }
      })
    },
    // 当屏幕发生滚动时，我们需要记录scrollTop值，用于判断应该播放当前的哪一个视频
    MoveScrollTop() {
      this.$refs.communeContainer.addEventListener('touchmove', e => {
        this.updatedToPlayScrollTop(Math.ceil(document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop))

      })
    },
    // 动画函数
    loading() {
      this.loadingShow = true
      setTimeout(() => {
        this.isRefresh = true
        this.loadingShow = false
      }, 1000);
    },
    // 获取滚动条的位置
    getScrollTop() {
      this.updatedVideoScrollTop(document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop)
    }
  },

}

</script>
  
<style lang='less' scoped>
@keyframes circle {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

::v-deep(.el-card) {
  --el-card-padding: 0;
  border: 0;
  background-color: #141414;
  padding-bottom: 200px;
}

.communeContainer {
  width: 100%;
  height: 100%;

  .loading {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    border: 2px solid #e63434;
    border-top-color: transparent;
    border-radius: 100%;
    animation: circle infinite 0.75s linear;
  }

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
  }

  .videoItem {
    margin-top: 10px;
    left: 50%;
    width: 94%;
    height: 400px;
    background-color: #2a2a2a;
    border-radius: 3%;

    .videoBox {
      width: 100%;
      height: 76%;
      background-color: #000;
      border-radius: 3%;
    }

    .bottomBox {
      width: 100%;
      height: 24%;

      .title {
        display: flex;
        align-items: center;
        color: #eaeaea;
        width: 100%;
        height: 50%;
      }

      .information {
        display: flex;
        align-items: center;
        padding: 0 8px;
        width: 100%;
        height: 50%;
        color: #b3b3b3;

        .authorNickname {
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
  