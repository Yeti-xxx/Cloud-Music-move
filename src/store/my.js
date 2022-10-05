export default {
    namespaced: true,
    state: () => ({
        accountStore:JSON.parse(window.localStorage.vuex || '11'),
        userInfo:JSON.parse(window.localStorage.vuex || '{}'),
    }),
    mutations: {
        updateAccount(state, account) {
            state.accountStore = account
        },
        updateUserInfo(state, userInfo) {
            console.log(11);
            state.userInfo = userInfo
        },
    },
    getters: {

    }
}