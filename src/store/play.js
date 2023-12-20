export default {
    namespaced: true,
    state: () => ({
        showPlay: true,
        playIt: true,   //若设为false可能导致第一次进入play页面时 唱片不进行旋转并且播放按钮为暂停状态
        changeMusic: '',
        songStore:{},
        songListStore:[]
    }),
    mutations: {
        updateShowPlay(state) {
            state.showPlay = !state.showPlay
        },
        updateplayIt(state) {
            // (11);
            state.playIt = !state.playIt
        },
        // 覆盖play为true
        playTotrue(state) {
            state.playIt = true
        },
        updateChangeMusic(state, direction) {
            if (direction === 'next') {
                state.changeMusic = direction
            } else if (direction === 'pre') {
                state.changeMusic = 'pre'
            }else{
                state.changeMusic = direction
            }
        },
        updatesongStore(state,songStore){
            state.songStore = songStore
        }
    },
    getters: {

    }
}