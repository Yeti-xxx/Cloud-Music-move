import Vuex from 'vuex'
import modulesMy from './my.js'
import createPersistedState from 'vuex-persistedstate';


const store = new Vuex.Store({

    modules: {
        m_my: modulesMy
    },
    plugins: [createPersistedState({
        
    })]
})

export default store