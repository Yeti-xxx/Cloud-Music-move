import Vuex from 'vuex'
import modulesMy from './my.js'
import modulesPlay from './play.js'
import modulesHome from './home.js'
import playTemp from './play-temp.js'
import cloud from './cloud.js'
import createPersistedState from 'vuex-persistedstate';
import myTemp from './my-temp'
import myVideo from './video'
import videoTemp from './video-temp'


const store = new Vuex.Store({

    modules: {
        m_my: modulesMy,
        m_play: modulesPlay,
        m_home: modulesHome,
        t_play: playTemp,
        m_cloud: cloud,
        t_my: myTemp,
        m_video: myVideo,
        t_video: videoTemp
    },
    plugins: [createPersistedState({
        paths: ["m_my", "m_play", "m_home", "m_cloud", "m_video"]
    })]
})

export default store