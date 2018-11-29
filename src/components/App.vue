<template>
    <div id="app">
        <Header></Header>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from "./Header";

export default {
    components: {
        Header
    }
};
</script>

<style lang="scss" scoped>
</style>


