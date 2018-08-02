<template>
    <div class="NavigateMenu">导航 {{items}}</div>
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
</style>