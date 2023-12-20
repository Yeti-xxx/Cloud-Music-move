export default {
    namespaced: true,
    state: () => ({
        birthdayTimeInStore: {}
    }),
    mutations: {
        updatedBirthdayTimeInStore(state, birthdayTimeInStore) {
            (birthdayTimeInStore);
            state.birthdayTimeInStore = birthdayTimeInStore
        },
    },
    getters: {

    }
}