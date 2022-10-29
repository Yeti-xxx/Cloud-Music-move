import Vuex from 'vuex'
import modulesMy from './my.js'
import modulesPlay from './play.js'
import modulesHome from './home.js'
import playTemp from './play-temp.js'
import cloud from './cloud.js'
import createPersistedState from 'vuex-persistedstate';
import myTemp from './my-temp'


const store = new Vuex.Store({

    modules: {
        m_my: modulesMy,
        m_play: modulesPlay,
        m_home: modulesHome,
        t_play: playTemp,
        m_cloud: cloud,
        t_my: myTemp,
    },
    plugins: [createPersistedState({
        paths: ["m_my", "m_play", "m_home", "m_cloud"]
    })]
})

export default store