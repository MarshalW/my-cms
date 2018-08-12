<template>
    <div>
        <div>文章详情统计表, id: {{id}}</div>
        <div v-if="results">
            文章详情统计表内容
        </div>
        <div v-else>
            <div>Loading..</div>
        </div>
    </div>
</template>

<script>
import Stat from '../../../api/Stat'

export default {
    name: "ArticleTableView",
    props: ['args'],
    data () {
        return {
            id: null,
            results: null
        }
    },
    mounted () {
        let [, , , id] = this.args
        this.id = id

        Stat.getTabResults().then((results) => {
            this.results = results
        })
    }
}
</script>

<style scoped>

</style>

