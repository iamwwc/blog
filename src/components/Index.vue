<template>
    <div class="posts">
        <Post v-for="post in items" 
            :post="post" 
            :key="post.path"/>
    </div>
</template>

<script>
import Header from "./Header.vue";
import PostSummary from "./PostSummary.vue";
import Post from './Post.vue';
import { mapState,mapGetters } from "vuex";

export default {
    asyncData: preFetch,
    components: {
        Header,
        PostSummary,
        Post
    },
    computed: {
        ...mapState(["items"])
    },
    data() {
        return {};
    },
    created() {
        let a;
    },
    watch: {
        $route(to, from) {
            let pageNum = to.query;
        }
    }
};

function preFetch({
    store,
    route: {
        query: { page }
    }
}) {
    if (typeof query === "undefined") {
        // from index
        page = 0;
    }
    let perPage = store.$vue.$site.perPage;
    let shouldSkip = perPage * page;
    // 这里需要return，很简单的道理，entry-server需要预取，返回promise才会等到查询完成之后注入store
    // 因为没有return，直接导致return了undefined，所有没有等到查询数据库完成就输出了html
    return store.dispatch("FETCH_ITEMS", {
        filter: {},
        options: {
            skip: shouldSkip,
            limit: perPage,
            sort: {
                originDate: -1
            },
            projection: {
                _id:0,
                title: 1,
                path: 1,
                excerpt: 1,
                originDate: 1,
                updatedDate: 1,
                "matter.tags": 1
            }
        }
    });
}
</script>

<style lang="scss" scoped>
</style>

