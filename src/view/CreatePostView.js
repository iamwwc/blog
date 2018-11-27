// component factory function
const { mapGetters } = require('~/src/utils/vuex')

const toUpper = str => str.toUpperCase()
const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)


export default function createInfoView(type) {
    let camelType = camelize(type)
    let upperType = toUpper(type)
    let shouldFetch = `FETCH_${upperType}`
    const fetchData = function (store, { path, params, query }) {
        return store.dispatch(shouldFetch,{path})
    }

    return {
        name:`${camelType}-view`,
        fetchData,
        render(h){
            h(require(`../components/${camelType}`))
        }
    }
}