export default {
    namespaced: true,
    state: () => ({
        videoPageInstore: 1,
        videoArrayInstore: '11',
        videoScrollTop: 0
    }),
    mutations: {
        updatedVideoPageInstore(state, videoPageInstore) {
            state.videoPageInstore = videoPageInstore
        },
        updatedVideoArrayInstore(state, videoArrayInstore) {
            state.videoArrayInstore = videoArrayInstore
        },
        
    },
    getters: {


    }
}