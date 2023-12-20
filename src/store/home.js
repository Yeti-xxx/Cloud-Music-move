export default {
    namespaced: true,
    state: () => ({
        musicListinStore: '11',
        weListeninStore: '22',
        refreshTime: '0',
        searchHot: '11',
        searchHistory: '11',
        bannerArrayinStore: '11'
    }),
    mutations: {
        updatedMusicListinStore(state, musicListinStore) {
            state.musicListinStore = musicListinStore
        },
        updatedWeListeninStore(state, weListeninStore) {
            state.weListeninStore = weListeninStore
        },
        uodateRefreshTime(state, refreshTime) {
            state.refreshTime = refreshTime
        },
        updatedSerachHot(state, searchHot) {
            (searchHot);
            state.searchHot = searchHot
        },
        updatedSearchHistory(state, searchHistory) {
            state.searchHistory = searchHistory
        },
        updatedBannerArrayinStore(state,bannerArrayinStore){
            (bannerArrayinStore);
            state.bannerArrayinStore = bannerArrayinStore
        }
    },
    getters: {

    }
}