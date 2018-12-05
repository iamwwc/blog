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

<style lang="scss" >
</style>
