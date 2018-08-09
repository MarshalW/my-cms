<template>
    <div>文章详情统计表, id: {{id}}</div>
</template>

<script>
export default {
    name: "ArticleTableView",
    props: ['args'],
    data () {
        return {
            id: null
        }
    },
    mounted () {
        let [, , , id] = this.args
        this.id = id
    }
}
</script>

<style scoped>

</style>