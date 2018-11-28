export default{
    SET_POST:(state,{post}) => {
        state.post = post
    },
    SET_ITEMS:( state, items) => {
        state.items = items
    },
    SET_TAG: (state, { tag }) => {
        state.tag = tag
    },
    SET_TAGS: (state, {tags}) => {
        state.tags = tags
    }
}