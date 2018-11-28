import Vue from 'vue'
import App from './components/App.vue'
import siteConfig from '~/config/SiteConfig.js'
import { createRouter } from './router/index'
import { createStore } from './store/index'
import { sync } from 'vuex-router-sync';

Vue.prototype.$site = siteConfig.site
export function createApp() {
    const router = createRouter()
    const store = createStore()
    sync(store, router)
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    Object.getPrototypeOf(store).$site = siteConfig.site
    return { app, router, store }
}