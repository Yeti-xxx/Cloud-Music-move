export default {
    namespaced: true,
    state: () => ({
        accountStore:JSON.parse(window.localStorage.vuex || '{}'),
    }),
    mutations: {
        updateAccount(state, account) {
            state.accountStore = account
        },
    },
    getters: {

    }
}