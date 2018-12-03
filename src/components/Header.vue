<template>
    <div class="site-header">
        <router-link class="author box-item" to="/">{{$site.author}}</router-link>
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
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.site-header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-shrink: 0;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 20px 20px;
    margin-bottom: 130px;
    box-shadow: 1px 1px 1px #eee;
    background-color: #fff;
    .box-item{
        display: flex;
        flex-wrap: wrap;
    }
    .author {
        font-size: 18px;
        margin-right: auto;
        font-size: 35px;
        font-weight: 400;
    }
    .avatar {
        width: 100px;
        height: 100px;
        align-self: flex-start;
        margin-right: auto;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid #c1b8b8;
            box-shadow: 1px 1px 1px #252525;
        }
    }
    .menus {
        font-size: 18px;
        .menu {
            margin-right: 10px;
            text-decoration: none;
            color: #c1b8b8;
            transition: color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
            &:hover {
                color: $a-hover-color;
            }
        }
    }
}
</style>


<script>
function fetch({ store }) {}

export default {
    components: {}
};
</script>