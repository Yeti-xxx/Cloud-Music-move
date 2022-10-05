
<script setup>
import home from './components/home.vue'
import playmusic from './components/playmusic/playmusic.vue'
</script>
<template>
  <!-- <home /> -->
  <!-- 音乐播放器 -->
  <playmusic style="z-index:999"></playmusic>
  <router-view></router-view>
</template>

<style scoped>

</style>
