<template>
    <div id="app">
        <Header></Header>
        <div class="container">
            <router-view></router-view>
        </div>
        <Sidebar />
    </div>
</template>

<script>
import Header from "./Header";
import Sidebar from "./Sidebar";
import '@/assets/js/blog.js';
export default {
    components: {
        Header,
        Sidebar
    }
};
</script>

<style lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variables.scss";
@import "@/assets/css/global.scss";
@import '@/assets/css/highlight.scss';

.container {
    width: $split;
    height: 100%;
    margin: 0 auto;
    @include max-screen() {
        width: 100%;
        padding: 0 30px;
    }
}

#app {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>


