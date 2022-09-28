<template>
    <div>
      <Tabbar :pageNum="3"></Tabbar>
    </div>
  </template>
  
  <script>
  import Tabbar from './tababr/tabbar.vue'
  export default {
      name:'play',
      components:{
          Tabbar
      }
  }
  
  </script>
  
  <style lang='less' scoped>
  
  </style>
  