export default {
    namespaced: true,
    state: () => ({
        accountStore: '11',
        userInfo: '{}',
        songListinStore: '11',
        cookie: ''

    }),
    mutations: {
        updateAccount(state, account) {
            state.accountStore = account
        },
        updateUserInfo(state, userInfo) {
            state.accountStore = 'true'
            state.userInfo = userInfo

        },
        updateSongListinStore(state, songListinStore) {
            state.songListinStore = songListinStore
        },
        updateCookie(state, cookie) {
            console.log(11);
            state.cookie = cookie
        },
    },
    getters: {

    }
}