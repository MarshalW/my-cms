<template>
    <div>
        <div v-if="results==null">Loading..</div>
        <div v-if="results">大数字区</div>
    </div>
</template>

<script>
export default {
    name: "NumbersView",
    props: ['results']
}
</script>

<style scoped>

</style>