import Vue from 'vue'
import VueRouter from 'vue-router'
import createView from '~/src/view/CreatePostView'

Vue.use(VueRouter)

export function createRouter() {
    return new VueRouter({
        mode: 'history',
        routes: [{
            name: 'index',
            path: '/',
            component: () => import('../components/Index.vue')
        },{
            name: 'post',
            path: '/post/:path',
            component: createView('Post')
        }
        ]
    })
}