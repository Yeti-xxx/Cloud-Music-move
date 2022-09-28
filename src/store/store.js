import {
    createStore
} from 'vuex'
import modulesMy from './my.js'

const store = createStore({
    
    modules: {
        m_my: modulesMy
    }
})

export default store