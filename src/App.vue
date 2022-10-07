
<script>
import home from './components/home.vue'
import playmusic from './components/playmusic/playmusic.vue'
import { mapState } from 'vuex'
export default {
  name: 'APP',
  computed: {
    ...mapState('m_my', ['accountStore'])
  },
  watch: {
    accountStore(newV, oldV) {
      if (newV != 11) {
        console.log(this.showPlay);
      }
    }
  },
  // 子组件点击歌曲触发播放器组件
  components: {
    playmusic,
    home,
  },
  data() {
    return {
      showPlay: true
    }
  },
  provide() {
    return {
      playMusictoApp: this.playMusicHandle,
    }
  },
  methods: {
    playMusicHandle(url, pic, name) {
      this.$refs.playmusic.OneclickPlay(url, pic, name)
    }
  }
}
</script>
<template>
  <!-- <home /> -->
  <!-- 音乐播放器 -->
  <playmusic style="z-index:999" ref="playmusic" v-if="showPlay"></playmusic>
  <router-view></router-view>
</template>

<style scoped>

</style>
