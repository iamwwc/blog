import { api } from '~/src/api/api'

export default {
    FETCH_POST: ({ commit }, { path }) => {
        return fetch({
            type: 'post',
            path: path
        }).then(dbResult => {
            if (dbResult.status !== 'success') {
                reportError({
                    type:'post',
                    name: path,
                    detail: dbResult.detail
                })
                commit('SET_POST', { post: {} })
                return
            }
            commit('SET_POST', { post: dbResult.result })
        })
    },
    FETCH_TAG: ({}, { name }) => {
        return fetchTagByName(name).then(dbResult => {
            if (dbResult.status !== 'success') {
                reportError({
                    type:'tag',
                    name: name,
                    detail: dbResult.detail
                })
            }
        })
    },
}

function reportError({type,name,detail}){
    console.error(`fetch ${type} [${name}] failed, detail -> ${detail}`)
}