export default {
    SET_POST: (state, post) => {
        state.post = post
    },
    SET_ITEMS: (state, items) => {
        state.items = items
    },
    SET_TAG: (state, tag) => {
        state.tag = tag
    },
    SET_TAGS: (state, tags) => {
        state.tags = tags
    },
    generateUniqueKeyOnPostsOfTags(state,objs){
        if(typeof objs[0].UniqueVForKey !== 'undefined'){
            return
        }
        let originKey = 0
        for(
            let i = 0 , len = objs.length;
            i < len;
            ++i
        ){
            Object.defineProperty(objs[i],'UniqueVForKey',{
                value:originKey++,
                writable:false
            })
        }
    }
}