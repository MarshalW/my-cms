<template>
    <div>
        <div>部门列表</div>
        <div v-if="results">
            部门列表内容
        </div>
        <div v-else>
            <div>Loading..</div>
        </div>
    </div>
</template>

<script>
import Stat from '../../../api/Stat'

export default {
    name: "DepartmentTableView",
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