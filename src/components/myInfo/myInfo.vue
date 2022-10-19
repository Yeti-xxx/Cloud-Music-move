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
            <span>{{userInfo.profile.follows}}关注</span>
            <span>{{userInfo.profile.followeds}}粉丝</span>
            <span>LV.{{userInfo.level}}</span>
          </div>
        </Avatars>
      </div>
      <el-card class="userInfo">
        <div class="title">基本信息</div>
        <div class="form">
          <span class="cun">村龄:
            <span>{{cunAge}}年({{registerTime.Y}}年{{registerTime.M}}月注册)</span>
          </span>
          <span class="gender">性别:
            <span>{{sex}}</span>
          </span>
          <span class="age">年龄:
            <span>{{AgeLater}} {{Zodiac}}</span>
          </span>
        </div>
      </el-card>
      <el-card class="userInfo comment">
        <div class="title">我的评论</div>
        <div class="form">
          <div class="top">
            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <span class="name">xxxxxxxxxx</span>
          </div>
          <div class="commentContent">
            xxxxxx
          </div>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Avatars from '../avatar/avatar.vue';
import mixinItem from '../../mixins/mixin.js'
export default {
  name: 'myInfo',
  components: {
    Avatars
  },
  mixins: [mixinItem],
  computed: {
    ...mapState('m_my', ['userInfo'])
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
      Zodiac: ''
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
    } else {
      this.sex = '男'
    }
    this.birthdayTime = this.getDate(this.birthdayTimeStr)
    this.registerTime = this.getDate(this.registerTimeStr)
    this.cunAge = (new Date()).getFullYear() - this.registerTime.Y
    this.AgeLater = this.getAge(this.birthdayTime)
    this.Zodiac = this.getZodiac(this.birthdayTime)
  },
  methods:{
    // 返回上一页
    Back(){
      this.$router.go(-1)
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

  .box-card {
    width: 100%;
    background-color: #1b1b1d;

  }

  .backImg {
    height: 200px;
    overflow: hidden;
    .back{
      position:absolute;
      left:10px;
      top:10px;
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

    .title {
      color: #e9e9e9;
      font-weight: 600;

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

    .commentContent {
      color: #d5d5d5;
    }
  }
}
</style>
