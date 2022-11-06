export default {
    namespaced: true,
    state: () => ({
        videoScrollTop: 0,
        toPlayScrollTop: 0
    }),
    mutations: {
        updatedVideoScrollTop(state, videoScrollTop) {
            state.videoScrollTop = videoScrollTop
        },
        updatedToPlayScrollTop(state,toPlayScrollTop){
            state.toPlayScrollTop = toPlayScrollTop
        }

    },
    getters: {

    }
}