import Vuex from 'vuex'
import modulesMy from './my.js'
import modulesPlay from './play.js'
import modulesHome from './home.js'
import playTemp from './play-temp.js'
import createPersistedState from 'vuex-persistedstate';
import myTemp from './my-temp'


const store = new Vuex.Store({

    modules: {
        m_my: modulesMy,
        m_play: modulesPlay,
        m_home: modulesHome,
        t_play: playTemp,
        t_my: myTemp
    },
    plugins: [createPersistedState({
        paths: ["m_my", "m_play", "m_home"]
    })]
})

export default store