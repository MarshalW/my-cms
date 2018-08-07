<template>
    <div class="NavigateMenu">
        <ul>
            <li>统计服务</li>
            <ul v-for="item in items">
                <li>{{item.title}}</li>
                <ul v-if="item.children">
                    <li>概览</li>
                    <li v-for="subItem in item.children">{{subItem.title}}</li>
                </ul>
            </ul>
            <li>系统管理</li>
            <ul>
                <li>用户管理</li>
                <li>角色管理</li>
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

    .NavigateMenu ul li {
        text-align: left;
        padding-left: 10px;
    }
</style>