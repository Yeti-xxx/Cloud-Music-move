<template>
  <div class="tabbar">
    <div class="home">
      <div class="home-item home" @click="TabbarChange(1)">
        <div class="ActiveHome" v-if="pageNum==1">
          <div class="ActiveHome-item">
            <div class="back">
              <el-icon color="#fff" :size="24">
                <Headset />
              </el-icon>
            </div>
            <p style="fontSize:12px;color:#fff;margin-top:5px;">首页</p>
          </div>
        </div>
        <div class="noActiveHome" v-else>
          <div class="noActive-item">
            <div class="no-back">
              <el-icon color="#747378" :size="24">
                <Headset />
              </el-icon>
            </div>
            <p style="fontSize:12px;color:#747378;margin-top:5px;">首页</p>
          </div>
        </div>
      </div>
      <div class="home-item my" @click="TabbarChange(2)">
        <div class="ActiveHome" v-if="pageNum==2">
          <div class="ActiveHome-item">
            <div class="back">
              <el-icon color="#fff" :size="24">
                <User />
              </el-icon>
            </div>
            <p style="fontSize:12px;color:#fff;margin-top:5px;">我的</p>
          </div>
        </div>
        <div class="noActiveHome" v-else>
          <div class="noActive-item">
            <div class="no-back">
              <el-icon color="#747378" :size="24">
                <User />
              </el-icon>
            </div>
            <p style="fontSize:12px;color:#747378;margin-top:5px;">我的</p>
          </div>
        </div>
      </div>
      <div class="home-item play" @click="TabbarChange(3)">
        <div class="ActiveHome" v-if="pageNum==3">
          <div class="ActiveHome-item">
            <div class="back">
              <el-icon color="#fff" :size="24">
                <MostlyCloudy />
              </el-icon>
            </div>
            <p style="fontSize:12px;color:#fff;margin-top:5px;">云盘</p>
          </div>
        </div>
        <div class="noActiveHome" v-else>
          <div class="noActive-item">
            <div class="no-back">
              <el-icon color="#747378" :size="24">
                <MostlyCloudy />
              </el-icon>
            </div>
            <p style="fontSize:12px;color:#747378;margin-top:5px;">云盘</p>
          </div>
        </div>
      </div>
      <div class="home-item commune" @click="TabbarChange(4)">
        <div class="ActiveHome" v-if="pageNum==4">
          <div class="ActiveHome-item">
            <div class="back">
              <el-icon color="#fff" :size="24">
                <ChatDotRound />
              </el-icon>
            </div>
            <p style="fontSize:12px;color:#fff;margin-top:5px;">社区</p>
          </div>
        </div>
        <div class="noActiveHome" v-else>
          <div class="noActive-item">
            <div class="no-back">
              <el-icon color="#747378" :size="24">
                <ChatDotRound />
              </el-icon>
            </div>
            <p style="fontSize:12px;color:#747378;margin-top:5px;">社区</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  props: {
    pageNum: Number,
  },
  data() {
    return {

    }
  },
  methods:{
    TabbarChange(num){
      if (num===1) {
        this.$router.push('/home')
      }else if(num===2){
        this.$router.push('/my')
      }else if(num===3){
        this.$router.push('/cloudPan')
      }else if(num===4){
        this.$router.push('/commune')
      }
    
    }
      
  }
}

</script>

<style lang='less' scoped>
.tabbar {
  // border-top: 2px solid #252525;
  position: fixed;
  background: #1c1c1e;
  bottom: 0;
  width: 100%;
  height: 60px;
}

.home {
  display: flex;
  justify-content: space-around;

  .ActiveHome {
    display: flex;

    .ActiveHome-item {
      width: 25%;
      padding: 5px 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        width: 24px;
      }

      .back {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: red;
      }
    }
  }
  .noActiveHome {
    display: flex;

    .noActive-item {
      width: 25%;
      padding: 5px 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  
    }

    .no-back {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #1c1c1e;
      }

    p {
      width: 24px;

    }
  }
}
</style>
