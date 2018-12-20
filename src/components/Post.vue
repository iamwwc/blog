<template>
    <div class="post">
        <router-link class="post-title"
                     :to="{name: 'post',params:{path}}"
                     tag="h1">{{title}}</router-link>
        <div class="post-meta">
            <div class="date">
                {{originDate}}
            </div>
        </div>
        <div class="post-content"
             v-html="shouldRenderContent"></div>

        <template v-if="isPost">
            <div class="post-footer">
                <div class="paginator">
                    <router-link v-if="prevPost"
                                 :to="{name: 'post',params:{path:prevPost.path}}"
                                 class="prev-post">
                        {{prevPost.title}}
                    </router-link>

                    <router-link v-if="nextPost"
                                 :to="{name: 'post',params:{path:nextPost.path}}"
                                 class="next-post">
                        {{nextPost.title}}
                    </router-link>
                </div>
                <div class="post-tags">
                    <router-link v-for="tag in tags"
                                 :key="tag"
                                 :to="{path:'/archive',params:{tag}}">
                                 {{tag}}
                    </router-link>
                </div>
            </div>
            <div v-if="allowComments"
                 class="comments">
            </div>
        </template>
        <slot/>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    asyncData({
        store,
        route: {
            params: { path }
        }
    }) {
        return store.dispatch("FETCH_POST", {
            filter: {
                path: path
            },
            options: {
                projection: {
                    path: 1,
                    originDate: 1,
                    updatedDate: 1,
                    fullContent: 1,
                    "matter.tags": 1,
                    title: 1,
                    allowComments: 1,
                    prevPost: 1,
                    nextPost: 1
                }
            }
        });
    },
    props: ["post"],
    computed: {
        ...[
            "title",
            "path",
            "allowComments",
            "excerpt",
            "fullContent",
            "originDate",
            "updatedDate",
            "prevPost",
            "nextPost"
        ].reduce((prev, curr) => {
            prev[curr] = function() {
                // debugger
                if (!this.isPost) {
                    return this.post[curr];
                }
                return this.$store.state.post[curr];
            };
            return prev;
        }, {}),
        ...mapState({
            tags: state => state.post.matter.tags
        }),
        isPost() {
            return this.$route.path.startsWith("/post");
        },
        shouldRenderContent() {
            return this.isPost ? this.fullContent : this.excerpt;
        }
    }
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/post.scss';
</style>