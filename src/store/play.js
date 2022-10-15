export default {
    namespaced: true,
    state: () => ({
        showPlay: true,
        playIt: true,
        changeMusic: '',
        songStore:{},
        songListStore:[]
    }),
    mutations: {
        updateShowPlay(state) {
            state.showPlay = !state.showPlay
        },
        updateplayIt(state) {
            // console.log(11);
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
            // console.log(11);
        },
        updatesongStore(state,songStore){
            state.songStore = songStore
        }
    },
    getters: {

    }
}