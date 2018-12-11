<template>
    <div class="tag-view">
        <div class="post"
             v-for="post in posts"
             :key="post.vForID">
            <div class="meta">
                <div class="date">{{post.originDate}}</div>
            </div>
            <router-link class="title"
               :to="{name:'post',params:{path:post.path}}">{{post.title}}</router-link>
        </div>
    </div>
</template>


<script>
export default {
    computed: {},
    props: ["posts"],
    mounted() {
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixins/circle.scss';
@import '@/assets/css/variables.scss';
.tag-view {
    position: relative;
    border-left: 2px solid #a4d8fa;
    .post{
        @include circle();
        &::before{
            left: -9px;
        }
        display: flex;
        flex-direction: row;
        padding: 0 0 0 20px;
        margin-bottom: 20px;
        .meta{
            color: #99a9bf;
            font-size: 14px;
            flex-shrink: 0;
        }
        .title{
            text-decoration: none;
            color: $font-color;
            font-size: 18px;
            margin-left: 50px;
        }
    }
}
</style>
