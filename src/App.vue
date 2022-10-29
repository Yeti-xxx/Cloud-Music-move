
<script>
import home from './components/home.vue'
import playmusic from './components/playmusic/playmusic.vue'
import { mapMutations, mapState } from 'vuex'
import mixinItem from './mixins/mixin.js'
import { ElMessage } from 'element-plus'
export default {
  name: 'APP',
  computed: {
    // ...mapState('m_my', ['accountStore']),
    ...mapState('m_play', ['showPlay']),
    ...mapState('t_play', ['downloadFlag'])
  },
  // 子组件点击歌曲触发播放器组件
  components: {
    playmusic,
    home,
  },
  created() {
    // this.DisplayMusic()
  },
  mixins: [mixinItem],
  watch: {
    $route(to, from) {
      if (to.path === '/songListPage' || to.path === '/myInfo' || to.path === '/reviseMyInfo') {
        this.styleObject.bottom = '0'
      } else if (to.path === '/songPage') {
        this.styleObject.bottom = '116px'
      }
      else {
        this.styleObject.bottom = '56px'
      }
    },
    showPlay(newV, oldV) {
      this.$refs.playmusic.noneStyle()
    },
    downloadFlag(newV, oldV) {
      if (newV === 'start') {
        const form = this.$refs.playmusic.downLoadForm()
        this.downloadFile(from.url, form.name + '@#@' + form.id, this.updatedDownloadFlag('succ'));

      } else if (newV === 'succ') {
        ElMessage({
          showClose: false,
          message: '下载完成',
          center: true,
          type: 'success'
        })
        this.updatedDownloadFlag('wait')
      }
    }
  },
  data() {
    return {
      // showPlay: true,
      bottom: 56,
      styleObject: {
        zIndex: '999',
        position: 'fixed',
        bottom: '56px'
      },
      showFlag: true
    }
  },
  provide() {
    return {
      playMusictoApp: this.playMusicHandle,
      showPlaytoApp: this.showPlayHandle,
      changeMusicStoApp: this.changeMusicS,
      playContainertoApp: this.playContainer,
      DisplayMusictoApp: this.DisplayMusic
    }
  },
  methods: {
    ...mapMutations('t_play', ['updatedDownloadFlag']),
    playMusicHandle(url, pic, name, id) {
      // console.log(url)
      this.$refs.playmusic.OneclickPlay(url, pic, name, id)
    },
    showPlayHandle() {
      // console.log(111);
      this.$refs.playmusic.showStyle()
      this.styleObject.bottom = '56px'
    },
    changeMusicS() {
      return this.$refs.playmusic.changeTheMusic()
    },
    playContainer() {
      this.$refs.playmusic.pause()
    },
    // 控制隐藏或者显示播放器
    DisplayMusic() {
      this.showFlag = !this.showFlag;
    }
  }
}
</script>
<template>
  <!-- <home /> -->
  <!-- 音乐播放器 -->
  <playmusic class="playmusic" :style="styleObject" ref="playmusic" v-show="showFlag">
  </playmusic>
  <router-view></router-view>
</template>

<style scoped>
body {
  font-family: ”Microsoft YaHei”;
}
</style>
