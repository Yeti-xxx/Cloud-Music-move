
<script>
import home from './components/home.vue'
import playmusic from './components/playmusic/playmusic.vue'
export default {
  name:'APP',
  // 子组件点击歌曲触发播放器组件
  components:{
    playmusic,
    home,
  },
  provide(){
    return {
      playMusictoApp:this.playMusicHandle,
    }
  },
  methods:{
    playMusicHandle(url,pic,name){
      this.$refs.playmusic.OneclickPlay(url,pic,name)
    }
  }
}
</script>
<template>
  <!-- <home /> -->
  <!-- 音乐播放器 -->
  <playmusic style="z-index:999" ref="playmusic"></playmusic>
  <router-view></router-view>
</template>

<style scoped>

</style>
