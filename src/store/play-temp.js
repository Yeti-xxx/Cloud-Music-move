export default {
    namespaced: true,
    state: () => ({
        TsongListStore:[],
        TsongBigListStore:['01']
    }),
    mutations: {
      updateTsongBigListStore(state,TsongBigListStore){
        state.TsongBigListStore = TsongBigListStore
      }
    },
    getters: {

    }
}