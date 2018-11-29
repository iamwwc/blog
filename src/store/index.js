import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            post: Object,
            tag: Object,
            items: [],
            tags: []
        },
        actions,
        getters,
        mutations,
        strict: true
    })
}