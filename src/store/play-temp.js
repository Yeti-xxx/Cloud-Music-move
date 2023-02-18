export default {
  namespaced: true,
  state: () => ({
    TsongListStore: [],
    TsongBigListStore: ['01'],
    TsongPageIdStore: '11', //解决从其他歌曲评论页面返回时，页面导航进入最初的歌曲
    TListNowStore: null,
    TListLengthStore: null,
    TlyricTime:null,
    downloadFlag:'wait'
  }),
  mutations: {
    updateTsongBigListStore(state, TsongBigListStore) {
      state.TsongBigListStore = TsongBigListStore
    },
    updateTsongPageIdStore(state, TsongPageIdStore) {
      state.TsongPageIdStore = TsongPageIdStore
    },
    updateTListNowStore(state, TListNowStore) {
      state.TListNowStore = TListNowStore

    },
    updatedTListLengthStore(state, TListLengthStore) {
      state.TListLengthStore = TListLengthStore
    },
    updatedTlyricTime(state,TlyricTime){
      state.TlyricTime = TlyricTime
    },
    updatedDownloadFlag(state,downloadFlag){
      state.downloadFlag = downloadFlag
    }

  },
  getters: {

  }
}