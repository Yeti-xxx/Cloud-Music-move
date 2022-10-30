<template>
  <!-- 下拉刷新loading -->
  <div class="loadingBoxHome" v-if="loadingShow">
    <div class="loading"></div>
  </div>
  <div class="cloudContainer" ref="container">
    <input type="file" ref="songFileInput" accept="audio/mp3" @change="uploadSong" v-show="false"/>
    <el-card class="box-card">
      <div class="top" v-show="!searchFlag">
        <div class="topLeft">
          <el-icon :size="27" color="#fdfdfd">
            <MostlyCloudy />
          </el-icon>
          <div class="titleAndDetail">
            <div class="title">音乐云盘</div>
            <div class="detail">{{ (size.useSize / 1024 / 1024 / 1024).toFixed(2) }} / {{ size.maxSize / 1024 / 1024 /
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
          <div class="search" @click="goSearch">
            <el-icon :size="25" color="#fdfdfd">
              <Search />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="top topSearch" v-show="searchFlag">
        <div class="closeSearch" @click="goNormal">
          <el-icon :size="24" color="#fdfdfd">
            <ArrowLeft />
          </el-icon>
        </div>
        <div class="SearchInputBox">
          <input placeholder="搜索云盘内的歌曲" class="SearchInput" ref="SearchInput" />
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
        <!-- 上传按钮 -->
        <div class="uploadBox" v-show="!searchFlag" @click="clickInput">
          <el-icon :size="23" color="#fdfdfd">
            <Upload />
          </el-icon>
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
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default {
  name: 'cloudPan',
  setup() {
    const songArray = reactive([]);
    const temp2 = reactive([]);
    return {
      songArray,
      temp2
    }
  },
  components: {
    Tabbar
  },
  mixins: [mixinItem],
  computed: {
    ...mapState('m_cloud', ['cloudPanSongArray', 'sizeStore']),
    ...mapState('m_my', ['cookie'])
  },
  watch: {
    searchFlag(newV, oldV) {
      if (newV) {
        this.searchSong()
      }
    }
  },
  data() {
    return {
      pageIndex: 3,
      // songArray: [],
      flag: false,
      size: {},
      isRefresh: true,
      loadingShow: false,
      searchFlag: false,
      tempArray: [],
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
          console.log(url[0].url);
          songDetail.url = url[0].url
        }
        this.songArray.push(songDetail)
      }
      this.flag = true
      console.log(this.songArray);
      this.updatedCloudPanSongArray(this.songArray)
    },
    // 点击搜索按钮发生的事件
    goSearch() {
      this.searchFlag = true
      this.tempArray = this.songArray
      this.songArray = this.temp2
    },
    //  从搜索状态退出
    goNormal() {
      this.songArray = this.cloudPanSongArray
      this.searchFlag = false
      this.temp2.length = 0
      this.$refs.SearchInput.value = ''
    },
    // 输入关键词对数据进行处理
    searchSong() {
      let This = this
      this.$refs.SearchInput.addEventListener('input', function () {
        clearTimeout(This.timer)
        This.timer = setTimeout(() => {
          if (!This.$refs.SearchInput.value) {
            return
          } else {
            This.temp2.length = 0
            const imKey = This.$refs.SearchInput.value
            for (let i = 0; i < This.tempArray.length; i++) {
              const songNameItem = This.tempArray[i].name;
              if (songNameItem.indexOf(imKey) !== -1) {
                This.songArray.push(This.tempArray[i])
              }
            }
          }
        }, 1000)
      })

    },
    // 模拟点击input
    clickInput() {
      this.$refs.songFileInput.click()
    },
    // 上传歌曲
    uploadSong(e) {
      let file = e.target.files[0]
      let This = this
      let formData = new FormData()
      formData.append('songFile', file)
      ElMessage({
        showClose: false,
        message: '上传中...',
        center: true,
      })
      axios({
        method: 'post',
        url: 'https://netease-cloud-music-api-nxzt.vercel.app/cloud?time=' + Date.now() + '&cookie=' + This.cookie,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }).then(res => {
        ElMessage({
          showClose: false,
          message: '上传成功',
          type:'succ',
          center: true,
        })
      }).catch(err => {
        console.log(err);
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
            const res = await This.$h.get('/user/cloud')
            This.handleRes(res.data)
            This.size.maxSize = res.maxSize
            This.size.useSize = res.size
            This.updatedSize(This.size)
            // This.$router.go(0)
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
          font-size: 14px;
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


  .topSearch {

    .closeSearch {
      width: 10%;
    }

    .SearchInputBox {
      position: relative;
      left: -10px;
      width: 84%;
      padding-right: 5px;

      .SearchInput {
        outline: none;
        border: none;
        background-color: #2b2b2b;
        width: 100% !important;
        font-size: 16px;
        border-bottom: 1px solid #5f6065;
        color: #5f6065;
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

    .uploadBox {
      position: absolute;
      bottom: 130px;
      left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid #fdfdfd;
      width: 40px;
      height: 40px;
      background-color: #e63434;
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

  