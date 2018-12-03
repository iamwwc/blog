export default {
    post(state) {
        return state.post
    },
    items(state) {
        return state.items
    },
    allSortedPostsFromTags(state) {
        let tags = state.tags
        return Object.keys(tags).reduce((prev, curr) => {
            return prev.concat(tags[curr])
        }, []).sort((prev, next) => {
            return next.originDate - prev.originDate
        })
    },
}