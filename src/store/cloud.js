export default {
    namespaced: true,
    state: () => ({
        cloudPanSongArray: 'null',
        sizeStore: 'null'
    }),
    mutations: {
        updatedCloudPanSongArray(state, cloudPanSongArray) {
            (cloudPanSongArray);
            state.cloudPanSongArray = cloudPanSongArray
        },
        updatedSize(state, sizeStore) {
            state.sizeStore = sizeStore
        },
    },
    getters: {

    }
}