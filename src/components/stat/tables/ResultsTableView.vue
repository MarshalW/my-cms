<template>
    <div>
        <div>搜索结果</div>
        <button @click="handleOpenTopicTable">点击专题统计</button>
        <br/>
        <button @click="handleOpenArticleTable">点击文章详情统计</button>
    </div>
</template>

<script>
export default {
    name: "ResultsTableView",
    props: ['results', 'index'],
    methods: {
        handleOpenArticleTable () {
            this.$emit('insert', {type: 'A', id: 'a - ' + Date.now()})
        },
        handleOpenTopicTable () {
            this.$emit('insert', {type: 'P', id: 'p - ' + Date.now()})
        }
    }
}
</script>

<style scoped>

</style>