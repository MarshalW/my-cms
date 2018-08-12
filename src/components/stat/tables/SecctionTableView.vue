<template>
    <div>
        <div>栏目列表</div>
        <div v-if="results">
            栏目列表内容
        </div>
        <div v-else>
            <div>Loading..</div>
        </div>
    </div>
</template>

<script>
import Stat from '../../../api/Stat'

export default {
    name: "SecctionTableView",
    props: ['args'],
    data () {
        return {
            results: null
        }
    },
    mounted () {
        Stat.getTabResults().then((results) => {
            this.results = results
        })
    }
}
</script>

<style scoped>

</style>