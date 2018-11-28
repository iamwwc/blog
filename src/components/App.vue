<template>
    <div class="app">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from './Header'


export default {
    components:{
        Header
    }
}
</script>

<style lang="scss" scoped>

</style>


