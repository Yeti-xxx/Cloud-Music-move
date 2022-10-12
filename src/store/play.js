export default {
    namespaced: true,
    state: () => ({
        showPlay: true,
        playIt: true,
        changeMusic: ''
    }),
    mutations: {
        updateShowPlay(state) {
            state.showPlay = !state.showPlay
        },
        updateplayIt(state) {
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
            }else if (direction === 'qie') {
                state.direction = 'qie'
            }
            // console.log(11);
        }
    },
    getters: {

    }
}