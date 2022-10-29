export default {
    namespaced: true,
    state: () => ({
        cloudPanSongArray: 'null',
        sizeStore: 'null'
    }),
    mutations: {
        updatedCloudPanSongArray(state, cloudPanSongArray) {
            console.log(cloudPanSongArray);
            state.cloudPanSongArray = cloudPanSongArray
        },
        updatedSize(state, sizeStore) {
            state.sizeStore = sizeStore
        },
    },
    getters: {

    }
}