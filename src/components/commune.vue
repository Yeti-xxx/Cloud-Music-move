<template>
  <div class="communeContainer">
    <el-card class="box-card">
      <div class="box">
        <div class="videoItem">
          <div class="videoBox">
            <!-- 视频组件 -->
            <Video v-bind:videoUrl="'http://vodkgeyttp9.vod.126.net/vodkgeyttp8/o4rlm8jK_3012571283_hd.mp4?ts=1667448442&rid=12F6A5F104A4061CCF0D66C830EC263A&rl=3&rs=nvMzMCChKdKINeokKpjeXDCnTtkoObmm&sign=97bb1b3ab76f541419584ad05d80cc55&ext=3bukQInLhy6VJOmxZuAB0vF0xT32BZaC%2F1p%2FgaapceRMhHldUPaROCMLIlTGiTv9CuPp%2F3o9sN1DBbQgykQhDKB4P4Q2wtPgQe4%2F8TB5jeuqxaUeoUFYaQ1Bj%2B0GigrW0ui6BlV2CRNpLjb9NRfTTqXYyvhy%2BWSWJMHz20mRm2tn5stgi4wp57hhEhnAbg5HBQIHB5K8eYDLQVaMmrGmBmtWn37zEnKBqYrBqQvULaEh8b%2BBQw8Jrebo%2FnCF%2BKoo'"></Video>
          </div>
          <div class="bottomBox">
            <div class="title">xxxxx</div>
            <div class="information">
              <div class="authorAvator">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="30" />
              </div>
              <div class="authorNickname">xxxx</div>
            </div>
          </div>
        </div>
        <div class="videoItem">
          2
        </div>
        <div class="videoItem">
          3
        </div>
      </div>
    </el-card>
    <Tabbar :pageNum="4"></Tabbar>
  </div>
</template>
  
<script>
import Tabbar from './tababr/tabbar.vue'
import Video from './video/video.vue'
export default {
  name: 'commune',
  components: {
    Tabbar,
    Video
  }
}

</script>
  
<style lang='less' scoped>
::v-deep(.el-card) {
  --el-card-padding: 0;
  border: 0;
  background-color: #141414;
}

.communeContainer {
  width: 100%;
  height: 100%;

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
  }

  .videoItem {
    // position: absolute;
    // transform: translateX(-50%);
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
        padding: 0 8px;
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
  