import Vue from 'vue'
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
    generateUniqueKeyOnPostsOfTags(state, objs) {
        let top = window ? window :global
        for (
            let i = 0, len = objs.length;
            i < len;
            ++i
        ) {
            Vue.set(objs[i],'UniqueVForKey',++top.vForID)
        }
    },
    GROUP_TAGS_FROM_ARRAY_AND_SET_TAGS(state, arrTags) {
        let tags = arrTags.reduce((prev, curr, index) => {
            let current = arrTags[index]
            if (current && current.matter && current.matter.tags) {
                let tags = current.matter.tags
                if (Array.isArray(tags)) {
                    tags.forEach(tag => {
                        prev[tag] || (prev[tag] = [])
                        prev[tag].push(current) 
                    })
                } else {
                    prev[tags] || (prev[tags] = [])
                    prev[tags].push(current) 
                }
            }
            return prev
        }, {})

        state.tags = tags
    }
}