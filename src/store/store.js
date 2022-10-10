import Vuex from 'vuex'
import modulesMy from './my.js'
import modulesPlay from './play.js'
import createPersistedState from 'vuex-persistedstate';


const store = new Vuex.Store({

    modules: {
        m_my: modulesMy,
        m_play: modulesPlay
    },
    plugins: [createPersistedState({
        paths: ["m_my","m_play"]
    })]
})

export default store