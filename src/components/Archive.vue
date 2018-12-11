<template>
    <div class="tag-cloud">
        <div class="tag-links">
            <router-link :to="{path:'/archive'}"
                        :key="0"
                         class="tag-link">Show All <sup>{{allSortedPostsFromTags.length}}</sup></router-link>
            <router-link v-for="tag in this.allTagsKey"
                         :key="tag"
                         :to="{path:'/archive',query:{tag}}"
                         class="tag-link">{{tag}}
                <sup>{{tags[tag].length}}</sup>
            </router-link>
        </div>
        <keep-alive>
            <router-view :posts="shouldRender">
            </router-view>
        </keep-alive>

    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
function prefetch({ store, router }) {
    return store.dispatch("FETCH_ALL_TAGS", {
        options: {
            projection: {
                _id: 0,
                title: 1,
                path: 1,
                originDate: 1,
                "matter.tags": 1
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
        ...mapMutations(["generateUniqueKeyOnPostsOfTags"]),
        generateTagLink(tagName) {
            return `/archive/?tag=${tagName}`;
        },
        setShouldRender(route) {
            let tag = route.query.tag;
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
        }
    },
    watch: {
        $route(to, from) {
            this.setShouldRender(to);
        }
    },
    created() {
        this.$router.onReady(() => {
            this.setShouldRender(this.$route);
        });
    },
    mounted() {
        window ? (window.vForID = 1) : (global.vForID = 1)
        this.generateUniqueKeyOnPostsOfTags(this.allSortedPostsFromTags);
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
@import "@/assets/css/mixins/circle.scss";
.tag-cloud {
    .tag-links {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex-shrink: 1;
        margin-bottom: 50px;
        .tag-link {
            border-radius: 18px;
            background-color: $tag-link-bg-color;
            display: inline-block;
            cursor: default;
            text-decoration: none;
            margin: 0 5px 5px 5px;
            padding: 0 20px;
            color: #fff;
            transition: background-color 0.5s
                cubic-bezier(0.075, 0.82, 0.165, 1);
            &:hover {
                background-color: $tag-link-active-color;
            }
        }
    }
}
</style>
