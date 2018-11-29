import config from '~/config/api-server'
import defaultConfig from '~/config/api-server-default'
import apiServer from 'post-api-server'

const apiInstance = new apiServer(config, defaultConfig)


// ssr server 直接查询db
// { filter, options}
const promise = apiInstance.init()
export default function fetch(queries) {
    return promise.then(() => {
        return new Promise(resolve => {
            return queryCustomize(queries).then(result => {
                    resolve(result)
                }).catch(e => {
                    console.error(e)
                })
        })
    }).catch(e => {
        console.error(e)
    })
    // return queryCustomize(queries)
}

// 整个处理流程的起点是 action的 
//browser发出的请求，路径还是被URI encode
// 所以我们先要 decode
function queryCustomize({ filter, options }) {
    filter = decodeQuery(filter)
    console.debug(`start query: filter: ${JSON.stringify(filter)} -> options: ${JSON.stringify(options)}`)
    return apiInstance.mgController.query(filter,options)
}

// 对于post，browser发起一个被编码的path，全部的解码

function decodeQuery(query) {
    let str = JSON.stringify(query)
    let decoded = decodeURIComponent(str)
    return JSON.parse(decoded)
}


function queryPost({ path }) {
    return queryCustomize({
        filter: {
            path: path
        }
    })
}

function queryTag({ name }) {
    return queryCustomize({
        filter: {
            'matter.name': [name]
        }, options: {
            projection: {
                title: 1,
                path: 1,
                excerpt: 1,
                'matter.tags': 1,
                originDate: 1,
                updatedData: 1
            }
        }
    })
}
