import { fetch } from '~/src/api/api'

const error = str => console.error(str)

export default {
    FETCH_POST: ({ commit }, { path }) => {
        return fetch({
            filter: {
                path: path
            },
            options: {

            }
        }).then(dbResult => {
            if (dbResult.status !== 'success') {
                reportError({
                    type: 'post',
                    name: path,
                    detail: dbResult.detail
                })
                commit('SET_POST', { post: {} })
                return
            }
            commit('SET_POST', { post: dbResult.result })
        })
    },
    FETCH_TAG: ({ commit }, { name }) => {
        return fetch({
            filter: {
                name: name
            },
            options: {

            }
        }).then(({ status, detail, result }) => {
            status === 'success'
                ?
                commit('SET_TAGS', { result })
                :
                error(detail)
        })
    },
    FETCH_ITEMS({ commit }, { filter, options}) {
        fetch({
            filter,
            options
        }).then(({ status, result, detail }) => {
            status === 'failed'
            ?
            error(`fetch items failed -> ${detail}`)
            :
            ''
            commit('SET_ITEMS', result)
        })
    }
}

function reportError({ type, name, detail }) {
    console.error(`fetch ${type} [${name}] failed, detail -> ${detail}`)
}