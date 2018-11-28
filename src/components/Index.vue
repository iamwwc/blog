<template>
  <div id="app">
  </div>
</template>

<script>
import Header from './Header.vue'

export default {
    asyncData({store, route:{params:{id}}}){
        let perPage = store.$site.perPage
        let number = store.$site.number
        store.dispatch('FETCH_ITEMS',{
            filter:{

            },
            options:{
                skip:number - 1,
                limit: perPage,
                sort:{
                    originDate: -1
                }
            }
        })
    },
    components:{
        Header
    },
    data () {
        return {

        }
    },
    created () {
        let a
    }
};
</script>

<style lang="scss" scoped>
</style>

