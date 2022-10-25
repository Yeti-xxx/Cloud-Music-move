<template>
  <div class="myInfoContainer">
    <el-card class="box-card">
      <div class="backImg">
        <div class="back" @click="Back">
          <el-icon :size="24" color="#f2eeeb">
            <Back />
          </el-icon>
        </div>
        <img src="http://p1.music.126.net/pf6wr3laJhP56M-3UxfQNA==/109951164663755261.jpg" />
      </div>
      <div class="avatarContainer">
        <Avatars v-bind:nickname="userInfo.profile.nickname" v-bind:avatarUrl="userInfo.profile.avatarUrl">
          <div class="level">
            <span>{{ userInfo.profile.follows }}关注</span>
            <span>{{ userInfo.profile.followeds }}粉丝</span>
            <span>LV.{{ userInfo.level }}</span>
          </div>
        </Avatars>
      </div>
      <el-card class="userInfo">
        <div class="top">
          <div class="title">基本信息</div>
          <div class="revise" @click="gotoRevise">编辑资料</div>
        </div>
        <div class="form">
          <span class="cun">村龄:
            <span>{{ cunAge }}年({{ registerTime.Y }}年{{ registerTime.M }}月注册)</span>
          </span>
          <span class="gender">性别:
            <span>{{ sex }}</span>
          </span>
          <span class="age">年龄:
            <span>{{ AgeLater }} {{ Zodiac }}</span>
          </span>
          <span class="age">简介:
            <span>{{userInfo.profile.signature}}</span>
          </span>
        </div>
      </el-card>
      <el-card class="userInfo comment">
        <div class="title">已购</div>
        <div class="tabsContainer">
          <div class="tabsTop">
            <div :class="['album', changeFlag === 'album' ? 'show' : '']" @click="change('album')">数字专辑</div>
            <div :class="['song', changeFlag === 'song' ? 'show' : '']" @click="change('song')">单曲</div>
          </div>
          <div class="content">
            <div class="item" v-for="(item, i) in BuyArray" :key="i" @click="playMusic(item.pic, item.title, item.id)">
              <div class="pic">
                <img :src="item.pic" alt="">
              </div>
              <div class="right">
                <div class="songTitle">{{ item.title }}</div>
                <div class="author">{{ item.author }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { mapState, mapMutations } from 'vuex'
import Avatars from '../avatar/avatar.vue';
import mixinItem from '../../mixins/mixin.js'
export default {
  name: 'myInfo',
  // setup() {
  //   const BuyArray = reactive([]);
  //   return {

  //   }
  // },
  inject: ['playMusictoApp'],
  components: {
    Avatars
  },
  mixins: [mixinItem],
  computed: {
    ...mapState('m_my', ['userInfo']),
    ...mapState('t_my',['birthdayTimeInStore'])
  },
  data() {
    return {
      birthdayTimeStr: '',
      registerTimeStr: '',
      gender: 0,
      sex: '女',
      birthdayTime: {},
      registerTime: {},
      cunAge: 0,
      AgeLater: '',
      Zodiac: '',
      changeFlag: 'album',
      BuyItem: {},
      BuyArray: []
    }
  },
  created() {
    // 获取生日时间戳
    this.birthdayTimeStr = this.userInfo.profile.birthday
    // 获取账号创建的时间戳
    this.registerTimeStr = this.userInfo.profile.createTime
    // 获取性别
    this.gender = this.userInfo.profile.gender
    if (this.gender !== 1) {
      this.sex = '女'
    } else if (this.gender !== 0) {
      this.sex = '男'
    } else {
      this.sex = '保密'
    }

    this.birthdayTime = this.getDate(this.birthdayTimeStr)
    this.updatedBirthdayTimeInStore(this.birthdayTime)
    this.registerTime = this.getDate(this.registerTimeStr)
    this.cunAge = (new Date()).getFullYear() - this.registerTime.Y
    this.AgeLater = this.getAge(this.birthdayTime)
    this.Zodiac = this.getZodiac(this.birthdayTime)
    // 获取专辑
    this.getAlbum()
  },
  methods: {
    // 存储生日对象方法
    ...mapMutations('t_my',['updatedBirthdayTimeInStore']),
    // 返回上一页
    Back() {
      this.$router.go(-1)
    },
    // tab标签切换
    change(flag) {
      if (this.changeFlag === flag) {
        return
      }
      this.changeFlag = flag
      if (this.changeFlag === 'album') {
        this.getAlbum()
      } else if (this.changeFlag === 'song') {
        this.getSong()
      }

    },
    // 获取专辑
    async getAlbum() {
      const res = await this.$h.get('/digitalAlbum/purchased?limit=10')
      this.BuyArray = []
      for (let i = 0; i < res.total; i++) {
        this.BuyItem = {}
        this.BuyItem.title = res.paidAlbums[i].albumName
        this.BuyItem.id = res.paidAlbums[i].albumId
        this.BuyItem.pic = res.paidAlbums[i].cover
        this.BuyItem.author = res.paidAlbums[i].artist.name
        this.BuyArray.push(this.BuyItem)
      }

    },
    // 获取歌曲
    async getSong() {
      const { data: res } = await this.$h.get('/song/purchased?limit=10')
      console.log(res.count);
      this.BuyArray = []
      for (let i = 0; i < res.count; i++) {
        this.BuyItem = {}
        this.BuyItem.title = res.list[i].name
        this.BuyItem.id = res.list[i].songId
        this.BuyItem.pic = res.list[i].picUrl
        this.BuyItem.author = res.list[i].artistName
        this.BuyArray.push(this.BuyItem)
      }
    },
    // 播放单曲
    async playMusic(pic, name, id) {
      if (this.changeFlag === 'album') {
        return
      } else if (this.changeFlag === 'song') {
        const { data: res } = await this.getMusicUrl(id)
        const url = res[0].url
        this.playMusictoApp(url, pic, name, id)
      }
    },
    //进入资料编辑页面
    gotoRevise() {
      this.$router.push('./reviseMyInfo')
    }
  }

}

</script>

<style lang='less' scoped>
::v-deep(.el-card) {
  --el-card-padding: 0;
  border: 0;
}

.myInfoContainer {
  width: 100%;
  padding-bottom: 56px;

  .box-card {
    width: 100%;
    background-color: #1b1b1d;

  }

  .backImg {
    height: 200px;
    overflow: hidden;

    .back {
      position: absolute;
      left: 10px;
      top: 10px;
    }

    img {
      width: 100%;

    }
  }

  .avatarContainer {
    z-index: 999;
    margin-top: 10px;

    .level {
      margin-top: 10px;
      color: #b5b5b5;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      justify-content: space-around;

      span {
        margin-left: 20px;
      }
    }
  }

  .userInfo {
    box-sizing: border-box;
    width: 90%;
    margin-left: 50%;
    background-color: #2b2b2b;
    transform: translateX(-50%);
    margin-top: 20px;
    padding: 15px 10px;

    .top {
      display: flex;
      justify-content: space-between;

      .title {
        color: #e9e9e9;
        font-weight: 600;

      }

      .revise {
        color: #e9e9e9;
        font-size: 13px;
        font-weight: 600;
      }

      .revise::after {
        content: '';
        top: 13px;
        right: 3px;
        height: 20px;
        width: 65px;
        position: absolute;
        border: 1px solid #fff;
        border-radius: 5%;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-top: 10px;

      .cun,
      .age,
      .gender {
        margin-top: 10px;
        color: #b5b5b5;
        font-size: 13px;

        span {
          color: #d5d5d5;
        }
      }
    }
  }

  .comment {
    .top {
      display: flex;

      img {
        width: 25px;
        height: 25px;
      }

      .name {
        margin-left: 12px;
        color: #b5b5b5;
      }
    }

    .tabsContainer {
      .tabsTop {
        display: flex;
        margin-top: 8px;
        color: #b5b5b5;
        font-size: 14px;
        font-weight: 600;

        .song {
          margin-left: 15px;
        }

        .show {
          color: #c52930;
        }
      }

      .content {
        margin-top: 20px;

        .item {
          margin-top: 10px;
          display: flex;

          .pic {
            img {
              border-radius: 8%;
              width: 100px;
              height: 100px;
            }
          }

          .right {
            margin-left: 15px;

            .songTitle {
              margin-top: 10px;
              color: #e9e9e9;
              font-weight: 600;
              font-size: 17px;
              /*将对象作为弹性伸缩盒子模型显示*/
              display: -webkit-box;
              /*设置子元素排列方式*/
              -webkit-box-orient: vertical;
              /*设置显示的行数，多出的部分会显示为...*/
              -webkit-line-clamp: 1;
              overflow: hidden;
            }

            .author {
              margin-top: 5px;
              color: #d5d5d5;
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
      }
    }



  }
}
</style>
