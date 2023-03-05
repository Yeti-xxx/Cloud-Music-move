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
            state.cookie = cookie
        },
    },
    getters: {

    }
}