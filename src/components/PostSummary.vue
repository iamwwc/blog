<template>
    <div class="post">
        <a class="title" :href="post.path">{{post.title}}</a>
        <div class="meta">
            <div class="date">{{post.originDate}}</div>
        </div>
        <div
            class="content"
            v-html="post.excerpt"
        ></div>
    </div>
</template>


<script>
export default {
    asyncData({ store, route: { params: id } }) {},
    props: ["post"]
};
</script>

<style lang="scss">
@import '@/assets/css/post.scss';
</style>


