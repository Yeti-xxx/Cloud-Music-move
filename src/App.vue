
<script>
import home from './components/home.vue'
import playmusic from './components/playmusic/playmusic.vue'
import { mapState } from 'vuex'
export default {
  name: 'APP',
  computed: {
    // ...mapState('m_my', ['accountStore']),
    ...mapState('m_play', ['showPlay'])
  },
  watch: {
    showPlay(newV, oldV) {
      console.log(newV);
    }
  },
  // 子组件点击歌曲触发播放器组件
  components: {
    playmusic,
    home,
  },
  watch: {
    $route(to, from) {
      if (to.path === '/songListPage') {
        this.styleObject.bottom = '0'
      } else {
        this.styleObject.bottom = '56px'
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
      }
    }
  },
  provide() {
    return {
      playMusictoApp: this.playMusicHandle,
    }
  },
  methods: {
    playMusicHandle(url, pic, name, id) {
      this.$refs.playmusic.OneclickPlay(url, pic, name, id)
    }
  }
}
</script>
<template>
  <!-- <home /> -->
  <!-- 音乐播放器 -->
  <playmusic class="playmusic" :style="styleObject" ref="playmusic" v-show="showPlay">
  </playmusic>
  <router-view></router-view>
</template>

<style scoped>

</style>
