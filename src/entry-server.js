import { createApp } from './app'
import { api } from './api/api'
let isInited = false

const isDev = process.env.NODE_ENV !== 'production'
export default context => {

    let promiseRender = new Promise((resolve, reject) => {
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

    return Promise.all([promiseRender])
}