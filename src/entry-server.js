import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'
export default context => {
    
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()
        const { url } = context
        const { fullPath } = router.resolve(url).route

        if (fullPath !== url) {
            return reject({ url: fullPath })
        }
        router.push(url)
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()

            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
                store: store,
                route: router.currentRoute
            }))).then(() => {
                context.state = store.state
                resolve(app)
            }).catch(reject)
        }, reject)
    })

    // 我可算是知道为什么返回数组了
    // 因为我当时写成
    /**
     * return Promise.all([promiseRender])
     * 想着和之前的 server.init() 一起初始化之后再返回
     * 
     * 但这样将一个原本返回Vue实例的then resolve(app)强行转换成了数组
     * 
     */
}