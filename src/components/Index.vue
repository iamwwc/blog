<template>
    <Header></Header>
</template>

<script>
import Header from './Header.vue'

function fetch({ store: { dispatch } }) {
    return dispatch('FETCH_INDEX',)
}

export default {
    components:{
        Header
    },
    data () {
        
    }
};
</script>

<style lang="scss" scoped>
</style>

