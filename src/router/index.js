import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export function createRouter() {
    return new VueRouter({
        mode: 'history',
        scrollBehavior(to, from, savedPostion) {
            if (savedPostion) {
                return savedPostion
            }
            if (to.hash) {
                return {
                    selector: to.hash
                }
            }
            return {
                x: 0,
                y: 0
            }
        },
        routes: [{
            name: 'index',
            path: '/',
            component: () => import('@/components/Index.vue')
        }, {
            name: 'post',
            path: '/post/:path',
            component: () => import('@/components/Post.vue')
        }, {
            /**
             * vue-router.esm.js:16 [vue-router] Named Route 'archive' has a default child route.
             *  When navigating to this named route (:to="{name: 'archive'"), 
             * the default child route will not be rendered.
             * Remove the name from this route 
             * and use the name of the default child route for named links instead.
             */

             /**
              * 默认路由应该是抓取Archive/foo 这种，不会抓取 Archive/ 所以如果 :to="{name: 'archive}" 
              * 路径为 Archive/ 默认child 路由不会匹配
              * 注释掉name就可以
              * 其实不注释也没问题，我会watch判断，如果是Archive/ 会手动赋值
              */
            // name: 'archive',
            path: '/archive',
            component: () => import('@/components/Archive.vue'),
            children: [
                {
                    path: '',
                    component: () => import('@/components/TagCloud.vue')
                }
            ]
        }
        ]
    })
}