export default {
    namespaced: true,
    state: () => ({
        accountStore: '11',
        userInfo: '{}',

    }),
    mutations: {
        updateAccount(state, account) {
            state.accountStore = account
        },
        updateUserInfo(state, userInfo) {
            console.log(11);
            state.userInfo = userInfo

        },
        test(){

        }
    },
    getters: {

    }
}