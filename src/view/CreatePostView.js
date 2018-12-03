// component factory function
import PostView from '@/components/Post.vue'
import { mapState } from 'vuex'

const toUpper = str => str.toUpperCase()
const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)


export default function createInfoView(type) {
    let shouldFetch = 'FETCH_POST'
    const preFetch = function (store, { params: { path } }) {
        return store.dispatch(shouldFetch,{filter:{
            path: path
        },options:{
            
        }})
    }

    return {
        name: `${camelType}-view`,
        asyncData: preFetch,
        computed: {
            ...mapState([
                'title',
                'path',
                'matter',
                'allowComments',
                'excerpt',
                'fullContent',
                'originDate',
                'updatedDate',
                'prevPost',
                'nextPost'
            ])
        },
        render(h) {
            h(PostView,{
                props:{
                    
                }
            })
        }
    }
}

// export interface Post {
//     title: string;
//     path: string;
//     matter: any;
//     allowComments: boolean;
//     excerpt: string;
//     fullContent: string;
//     originDate: any;
//     updatedDate: string;
//     prevPost: any;
//     nextPost: SimplePost | null;
// }