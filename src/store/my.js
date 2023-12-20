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
            (userInfo);
            state.accountStore = 'true'
            state.userInfo = userInfo

        },
        updateSongListinStore(state, songListinStore) {
            state.songListinStore = songListinStore
        },
        updateCookie(state, cookie) {
            (11);
            state.cookie = cookie
        },
    },
    getters: {

    }
}