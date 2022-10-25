export default {
    namespaced: true,
    state: () => ({
        birthdayTimeInStore: {}
    }),
    mutations: {
        updatedBirthdayTimeInStore(state, birthdayTimeInStore) {
            console.log(birthdayTimeInStore);
            state.birthdayTimeInStore = birthdayTimeInStore
        },
    },
    getters: {

    }
}