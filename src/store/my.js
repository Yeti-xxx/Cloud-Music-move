export default {
    namespaced: true,
    state: () => ({
        accountStore: '11',
        userInfo: '{}',
        songListinStore:'11'

    }),
    mutations: {
        updateAccount(state, account) {
            state.accountStore = account
        },
        updateUserInfo(state, userInfo) {
            // console.log(11);
            state.userInfo = userInfo

        },
        updateSongListinStore(state,songListinStore){
            state.songListinStore = songListinStore
        }
    },
    getters: {

    }
}