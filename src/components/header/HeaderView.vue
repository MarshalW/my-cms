<template>
    <div>
        <div>用户名 {{this.$context.auth.userName}}</div>
        <button @click="handleLogout">退出</button>
    </div>
</template>

<script>
export default {
    name: "HeaderView",
    methods: {
        handleLogout () {
            this.$bus.$emit('auth.logout')
        }
    }
}
</script>

<style scoped>

</style>