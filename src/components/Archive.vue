<template>
    <div class="archive">
        <div class="tag_cloud">
            <div class="tag-link">
                <router-link v-for="tag in this.allTagsKey"
                             :key="tag"
                             :to="{query:{tag}}">{{tag}}
                </router-link>
            </div>
            <keep-alive>
                <router-view class="tag-view"
                             :posts="shouldRender">
                </router-view>
            </keep-alive>

        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
function prefetch({ store, router }) {
    return store.dispatch("FETCH_ALL_TAGS", {
        type: "allTags",
        options: {
            projection: {
                _id: 0,
                title: 1,
                path: 1,
                originDate: 1
            }
        }
    });
}

export default {
    name: "archive",
    asyncData: prefetch,
    data() {
        return {
            shouldRender: []
        };
    },
    computed: {
        ...mapState(["tags"]),
        ...mapGetters(["allSortedPostsFromTags"]),
        allTagsKey() {
            return Object.keys(this.tags);
        }
    },
    methods: {
        ...mapMutations(['generateUniqueKeyOnPostsOfTags']),
        generateTagLink(tagName) {
            return `/archive/?tag=${tagName}`;
        },
        setShouldRender(query) {
            let tag = query.tag;
            if (typeof tag === "undefined") {
                //Archive root
                this.shouldRender = this.allSortedPostsFromTags;
                return;
            }
            if (!this.allTagsKey.includes(tag)) {
                this.shouldRender = [];
                return;
            }
            this.shouldRender = this.tags[tag];
        },
    },
    watch: {
        $route(to, from) {
            this.setShouldRender(to.query);
        }
    },
    created() {
        this.generateUniqueKeyOnPostsOfTags(this.allSortedPostsFromTags)
        this.$router.onReady(() => {
            this.setShouldRender(this.$route);
        });
    }
};
</script>

<style lang="scss" scoped>
</style>
