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
// 所以先 decode

// 还是规定一下吧，其实到这里已经不兼容了，query默认只能收到两个参数
// 如果不走customize， 那么 filter要换成type

// 这一堆乱七八糟的参数真是看晕了
// 啊啊啊啊，是真想推翻重来，但还是舍不得，先这样用吧。。
function queryCustomize({ type, filter, options }) {
    if(type === 'allTags'){
        return queryAllTags(options)
    }
    filter = decodeQuery(filter ? filter : '{}')
    options = decodeQuery(options ? options : '{}')
    console.debug(`start query: filter: ${JSON.stringify(filter)} -> options: ${JSON.stringify(options)}`)
    return apiInstance.mgController.query(filter, options)
}

// 对于post，browser发起一个被编码的path，全部解码

function decodeQuery(obj) {
    let str = JSON.stringify(obj)
    let decoded = decodeURIComponent(str)
    return JSON.parse(decoded)
}

// 这添加一个分流的，万一还要加别的直接从这添加
function fromType(type){

}


//我真是疯狂，前端查询用一套，server查询一套，这样一改都要一起改
async function queryAllTags(options) {
    let collection = apiInstance.mgController.collection
    let tags = await collection.distinct('matter.tags')
    let res = {}
    await Promise.all(tags.map(async tag => {
        let queryRes = await collection.find({
            'matter.tags': tag
        },options).toArray()
        res[tag] = queryRes.length === 0 ? null : queryRes
    }))
    return res
}
