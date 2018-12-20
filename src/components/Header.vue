<template>
    <div class="site-header">
        <router-link class="author box-item"
                     to="/">{{$site.author}}</router-link>
        <router-link class="avatar box-item"
                     to="/">
            <img src="@/assets/images/avatar.png"
                 alt="avatar"
                 class="avatar-img">
        </router-link>
        <div class="menus box-item">
            <router-link class="menu"
                         v-for="(item, key) in $site.menus"
                         :key="item"
                         :to="item">{{key}}
            </router-link>
        </div>
        <div class="menu-btn">
            <span class="btn-item"></span>
            <span class="btn-item"></span>
            <span class="btn-item"></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
@import "@/assets/css/mixin.scss";
.site-header {
    width: 100%;
    height: 90px;
    padding: 20px 20px;
    margin-bottom: 100px;
    box-shadow: 1px 1px 1px #eee;
    background-color: #fff;
    .box-item {
        display: flex;
        flex-wrap: wrap;
    }
    &::after {
        clear: both;
        content: "";
        display: block;
    }
    @import "@/assets/css/header/button.scss";
    @import "@/assets/css/header/author.scss";
    @import "@/assets/css/header/avatar.scss";
    @import "@/assets/css/header/menu.scss";
}
</style>


<script>
import debounce from "@/utils/debounce";
function fetch({ store }) {}

export default {
    components: {},
    methods: {
    }
};
</script>