import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

// 引入全局vuex
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

// 引入组件的vuex
import test from './modules/test.js'



export default new vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        test
    }
})
