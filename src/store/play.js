export default{
    namespaced: true,
    state: () => ({
        showPlay:true
    }),
    mutations: {
        updateShowPlay(state){
            state.showPlay=!state.showPlay
        }
    },
    getters: {

    }
}