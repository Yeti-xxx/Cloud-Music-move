export default {
    namespaced: true,
    state: () => ({
        TsongListStore:[],
        TsongBigListStore:['01'],
        TsongPageIdStore:'11' //解决从其他歌曲评论页面返回时，页面导航进入最初的歌曲
    }),
    mutations: {
      updateTsongBigListStore(state,TsongBigListStore){
        state.TsongBigListStore = TsongBigListStore
      },
      updateTsongPageIdStore(state,TsongPageIdStore){
        state.TsongPageIdStore = TsongPageIdStore
      }
    },
    getters: {

    }
}