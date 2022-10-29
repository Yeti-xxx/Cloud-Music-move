<template>
  <!-- 下拉刷新loading -->
  <div class="loadingBoxHome" v-if="loadingShow">
    <div class="loading"></div>
  </div>
  <div class="cloudContainer" ref="container">
    <el-card class="box-card">
      <div class="top">
        <div class="topLeft">
          <el-icon :size="27" color="#fdfdfd">
            <MostlyCloudy />
          </el-icon>
          <div class="titleAndDetail">
            <div class="title">音乐云盘</div>
            <div class="detail">{{ (size.useSize / 1024 / 1024 / 1024).toFixed(2) }}/{{ size.maxSize / 1024 / 1024 /
                1024
            }}G</div>
          </div>
        </div>
        <div class="topRight">
          <div class="setting">
            <el-icon :size="25" color="#fdfdfd">
              <Folder />
            </el-icon>
          </div>
          <div class="search">
            <el-icon :size="25" color="#fdfdfd">
              <Search />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="cloudItem" v-for="(item, i) in songArray" :key="i"
          @click="playMusictoApp(item.url, item.pic, item.name, item.id)">
          <span class="index">{{ i + 1 }}</span>
          <div class="song">
            <div class="songName">
              {{ item.name }}
            </div>
            <div class="author">
              {{ item.author }}
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <tabbar :pageNum="pageIndex"></tabbar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Tabbar from './tababr/tabbar.vue'
import mixinItem from '../mixins/mixin.js'
import { reactive } from 'vue'
export default {
  name: 'cloudPan',
  setup() {
    const songArray = reactive([]);
    return {
      songArray
    }
  },
  components: {
    Tabbar
  },
  mixins: [mixinItem],
  computed: {
    ...mapState('m_cloud', ['cloudPanSongArray', 'sizeStore'])
  },
  watch: {
    flag(newV, oldV) {

    }
  },
  data() {
    return {
      pageIndex: 3,
      // songArray: [],
      flag: false,
      size: {},
      isRefresh: true,
      loadingShow: false
    }
  },
  async created() {

    if (this.cloudPanSongArray === 'null') {
      const res = await this.$h.get('/user/cloud')
      this.handleRes(res.data)
      this.size.maxSize = res.maxSize
      this.size.useSize = res.size
      this.updatedSize(this.size)
    } else {
      this.songArray = this.cloudPanSongArray
      this.size = this.sizeStore
    }
    console.log(this.size);
    console.log(this.songArray);


  },
  mounted() {
    this.downRefresh()
  },
  inject: ['playMusictoApp'],
  methods: {
    ...mapMutations('m_cloud', ['updatedCloudPanSongArray', 'updatedSize']),
    // 处理初始数据
    async handleRes(res) {
      let This = this
      this.songArray = [] //清空原始数据
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        let songDetail = {}
        if (element.fileName.indexOf('@#@') !== -1) {
          const temp = element.fileName.split('@#@')
          songDetail.name = temp[0]
          songDetail.id = temp[1].split('.')[0]
          const { songs: res1 } = await This.getMusicDetail(songDetail.id)
          const { data: url } = await This.getMusicUrl(songDetail.id)
          songDetail.url = url[0].url
          songDetail.author = res1[0].ar[0].name
          songDetail.pic = res1[0].al.picUrl

        } else {
          songDetail.name = element.simpleSong.name
          songDetail.author = element.simpleSong.ar[0].name
          songDetail.id = element.songId
          songDetail.pic = element.simpleSong.al.picUrl
          const { data: url } = await This.getMusicUrl(songDetail.id)
          songDetail.url = url[0].url
        }
        this.songArray.push(songDetail)
      }
      this.flag = true
      console.log(this.songArray);
      this.updatedCloudPanSongArray(this.songArray)
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
            const res = await This.$h.get('/user/cloud')
            This.handleRes(res.data)
            This.size.maxSize = res.maxSize
            This.size.useSize = res.size
            This.updatedSize(This.size)
            This.$router.go(0)
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
    }
  },

}

</script>

<style lang='less' scoped>
::v-deep(.el-card) {
  --el-card-padding: 0;
  --el-card-border-color: 0;
  background-color: #141414;
}

.cloudContainer {
  .top {
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    background-color: #2b2b2b;

    .topLeft {
      display: flex;
      align-items: center;

      .titleAndDetail {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .title {
          color: #fafafa;
        }

        .detail {
          color: #979797;
        }

      }
    }

    .topRight {
      display: flex;

      .setting {
        margin-right: 25px;
      }
    }
  }

  .content {

    .cloudItem {
      padding: 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #3f3d3d;

      .index {
        margin-left: 10px;
        font-size: 18px;
        color: #949494;
      }

      .song {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .songName {
          width: 150px;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
          font-size: 16px;
          color: #e7e7e7;
        }

        .author {
          font-size: 14px;
          color: #aeaaab;
        }
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

  