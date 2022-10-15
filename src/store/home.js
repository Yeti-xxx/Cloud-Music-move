export default {
    namespaced: true,
    state: () => ({
        musicListinStore: '11',
        weListeninStore: '22'
    }),
    mutations: {
        updatedMusicListinStore(state, musicListinStore) {
            state.musicListinStore = musicListinStore
        },
        updatedWeListeninStore(state, weListeninStore) {
            state.weListeninStore = weListeninStore
        }
    },
    getters: {

    }
}