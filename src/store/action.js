import { fetch } from '~/src/api/api'

const error = str => console.error(str)

export default {
    FETCH_POST: ({ commit }, { filter, options }) => {
        return fetch({
            filter,
            options
        }).then(result => {
            if (Array.isArray(result))
                result = result[0]
            commit('SET_POST', result)
        })
    },
    FETCH_TAG: ({ commit }, { name }) => {
        return fetch({
            filter: {
                name: name
            },
            options: {

            }
        }).then(result => {
            commit('SET_TAGS', result)
        })
    },
    FETCH_ITEMS({ commit }, { filter, options }) {
        return fetch({
            filter,
            options
        }).then(result => {
            commit('SET_ITEMS', result)
        })
    },
    FETCH_ALL_TAGS({ commit }, query) {
        return fetch(query).then(result => {
            commit('GROUP_TAGS_FROM_ARRAY_AND_SET_TAGS', result)
        })
    }
}

function reportError({ type, name, detail }) {
    console.error(`fetch ${type} [${name}] failed, detail -> ${detail}`)
}