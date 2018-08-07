<template>
    <div class="NavigateMenu">
        <ul>
            <li>统计服务</li>
            <ul v-for="item in items">
                <li>{{item.title}}</li>
                <ul v-if="item.children">
                    <li>
                        <router-link :to="'/stat/'+item.id">概览</router-link>
                    </li>
                    <li v-for="subItem in item.children">
                        <router-link :to="'/stat/'+subItem.id">{{subItem.title}}</router-link>
                    </li>
                </ul>
            </ul>
            <li>系统管理</li>
            <ul>
                <li>
                    <router-link to="/users">用户管理</router-link>
                </li>
                <li>
                    <router-link to="/roles">角色管理</router-link>
                </li>
            </ul>
        </ul>
    </div>

</template>

<script>
export default {
    name: "NavigateView",
    props: ['items']
}
</script>

<style scoped>
    .NavigateMenu {
        color: azure;
    }

    .NavigateMenu a {
        color: azure;
    }

    .NavigateMenu ul li {
        text-align: left;
        padding-left: 10px;
    }
</style>