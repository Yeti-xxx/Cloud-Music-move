<template>
    <div>
      <Tabbar :pageNum="4"></Tabbar>
    </div>
  </template>
  
  <script>
  import Tabbar from './tababr/tabbar.vue'
  export default {
      name:'commune',
      components:{
          Tabbar
      }
  }
  
  </script>
  
  <style lang='less' scoped>
  
  </style>
  