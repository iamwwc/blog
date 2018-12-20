import client, {postsCol,db } from './server-db-client'

// ssr server 直接查询db
// { filter, options}
const promise = client.connect()
let postsCollection
export default function fetch(queries) {
    return promise.then(() => {
        postsCollection = client.db(db).collection(postsCol)
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
}

// 整个处理流程的起点是 action的 
//browser发出的请求，路径还是被URI encode
// 所以先 decode

async function queryCustomize({ filter, options }) {
    filter = decodeQuery(filter ? filter : {})
    options = decodeQuery(options ? options : {})
    console.debug(`start query: filter: ${JSON.stringify(filter)} -> options: ${JSON.stringify(options)}`)
    return await postsCollection.find(filter, options).toArray()
}

// 对于post，browser发起一个被编码的path，全部解码

function decodeQuery(obj) {
    let str = JSON.stringify(obj)
    let decoded = decodeURIComponent(str)
    return JSON.parse(decoded)
}
