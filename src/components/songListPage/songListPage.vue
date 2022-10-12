<template>
  <div class="songListPageContainer">
    <!-- 数据加载完成时 -->
    <div v-if="getOver">
      <el-card class="List">
        <div class="topBackImg">
          <img class="backimg" :src="SongListDetail.coverImgUrl" alt="" />
        </div>
        <!-- 顶部的歌单信息 -->
        <div class="TopBox">
          <div class="nav">
            <div class="goBack" @click="goBack">
              <el-icon :size="22" color="#f2eeeb">
                <Back />
              </el-icon>
              <div>歌单</div>
            </div>
          </div>
          <div class="content">
            <img class="cover" :src="SongListDetail.coverImgUrl" />
            <div class="right">
              <div class="title">{{SongListDetail.name}}</div>
              <div class="author">
                <el-avatar :size="28" :src="author.avatarUrl" />
                <span>{{author.nickname}}</span>
              </div>
              <div class="describe">{{SongListDetail.description}}</div>
            </div>
          </div>
        </div>

      </el-card>
      <!-- 歌曲项 -->
      <el-card class="box-card songItems">
        <div class="songItem" v-for="(item,i) in song" :key="i" @click="play(item)">
          <div class="index">{{i+1}}</div>
          <div class="songFrom">
            <div class="songName">{{item.name}}</div>
            <div class="songAuthor">{{item.ar[0].name}}</div>
          </div>
        </div>


      </el-card>
    </div>
    <!-- 数据未完成加载时 -->
    <el-card class="loadingbox" v-else>
      <div class="loading"></div>
      <div class="text">加载中....</div>
    </el-card>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import mixinItem from '../../mixins/mixin.js'
export default {
  name: 'soangListPage',
  mixins: [mixinItem],
  inject: ['playMusictoApp'],
  data() {
    return {
      ListId: 0,
      Listlength: 0,
      song: [],
      SongListDetail: {},
      getOver: false,
      author: {}
    }
  },
  created() {
    this.ListId = this.$route.query.id;
    // 获取长度
    this.getSongList(this.ListId)


  },
  methods: {
    // 获取歌单长度
    async getSongList(id) {
      const { songs: res } = await this.$h.get('/playlist/track/all?id=' + id)
      this.Listlength = res.length
      // 得到长度后,获取歌曲
      this.getSong(id, this.Listlength)
      // 获取详情
      this.getSongListDetail(id)
    },
    // 获取歌单内的歌曲
    async getSong(id, length) {

      for (let i = 0; i < 40; i += 10) {
        if (i >= length) {
          return
        }
        const { songs: res } = await this.$h.get('/playlist/track/all?id=' + id + '&limit=10&offset=' + i)
        this.song = [...this.song, ...res]
      }
      // 当歌曲获取完毕后，getOver设为true
      this.getOver = true

    },
    // 获取歌单详情
    async getSongListDetail(id) {
      const { playlist: res } = await this.$h.get('/playlist/detail?id=' + id)
      this.SongListDetail = res
      // console.log(this.SongListDetail);
      this.author = await this.getUserInfo(this.SongListDetail.userId)
      console.log(this.author);
    },

    // 播放歌曲
    async play(item) {
      const res = await this.getMusicUrl(item.id)
      if (res === 'urlNull') {
        return ElMessage({
          showClose: false,
          center:true,
          message: '歌曲暂时无法播放.',
          type: 'error',
        })
      }
      this.playMusictoApp(res.data[0].url, item.al.picUrl, item.name, item.id)
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1)
    }

  }

}

</script>

<style lang='less' scoped>
::v-deep(.el-card) {
  --el-card-padding: 0;
}

.List {
  background: #151515;
  border-radius: 0;
  // margin: 0;
  // padding: 0 !import;

  .topBackImg {
    width: 100%;
    height: 200px;
  }

  .TopBox {
    width: 100%;
    height: 200px;
    position: absolute;
    top: 0;

    // background:red;
    .nav {
      height: 30px;
      width: 100%;
      padding: 3px;
      margin-top: 10px;

      .goBack {
        display: flex;
        font-size: 15px;
        font-weight: 700;
        color: #f2eeeb;

        div {
          margin-left: 6px;
        }
      }
    }

    .content {
      display: flex;
      padding-left: 20px;
      margin-top: 20px;

      .cover {
        width: 100px;
        height: 100px;
        border-radius: 5%;
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;

        .author {
          display: flex;
          margin-top: 5px;
          align-items: center;

          span {
            font-size: 13px;
            font-weight: 600;
            margin-left: 5px;
            color: #f2eeeb;
          }

        }

        .title {
          margin-left: 5px;
          width: 200px;
          color: #f2eeeb;
          font-weight: 500;

        }

        .describe {
          margin-left: 5px;
          margin-top: 5px;
          font-size: 13px;
          font-weight: 800;
          color: rgba(0, 0, 0, 0.6);
          // height: 16px;
          width: 200px;
          overflow: hidden;
          /*文本不会换行*/
          white-space: nowrap;
          /*当文本溢出包含元素时，以省略号表示超出的文本*/
          text-overflow: ellipsis;
        }
      }


    }
  }

  .backimg {
    width: 100%;
    height: 100%;
    filter: blur(50px);
    transform: scale(3);
  }


}

.songItems {
  margin-top: -2px;
  background: #151515;
  border-radius: 0;

  .songItem {
    width: 100%;
    height: 50px;
    background: #151515;
    display: flex;
    align-items: center;
    padding-left: 15px;

    .index {
      color: #949494;
      font-size: 16px;
    }

    .songFrom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;

      .songName {
        width: 200px;
        overflow: hidden;
        /*文本不会换行*/
        white-space: nowrap;
        /*当文本溢出包含元素时，以省略号表示超出的文本*/
        text-overflow: ellipsis;
        color: #e8e8e8;
        font-size: 14px;
        font-weight: 400;
      }

      .songAuthor {
        color: #acacac;
        font-size: 13px;
      }
    }
  }
}

.loadingbox {
  display: flex;
  padding-top: 100px;
  height: 617px;
  background: #151515;
  justify-content: center;

  .text {
    margin-top: 10px;
    font-weight: 800;
    color: #e8e8e8;
    font-size: 15px;
  }

  .loading {
    width: 40px;
    height: 40px;
    border: 2px solid #e63434;
    border-top-color: transparent;
    border-radius: 100%;
    animation: circle infinite 0.75s linear;
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

}
</style>
