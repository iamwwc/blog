<template>
    <div class="tag-cloud">
        <div class="post"
             v-for="post in posts"
             :key="post.UniqueVForKey">
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
        if(typeof window.vForKey === 'undefined'){
            window.vForKey = 1
        }
    }
};
</script>

<style lang="scss" >
</style>
