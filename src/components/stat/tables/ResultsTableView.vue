<template>
    <div>
        <div>搜索结果</div>
        <div v-if="results">
            <button @click="handleOpenTopicTable">点击专题统计</button>
            <br/>
            <button @click="handleOpenArticleTable">点击文章详情统计</button>
            <div>
                <button v-if="pageNo>1" @click="handleClickPageButton(pageNo-1)">上一页</button>
                <span>第{{pageNo}}页</span>
                <button v-if="pageNo<pageCount" @click="handleClickPageButton(pageNo+1)">下一页</button>
            </div>
        </div>
        <div v-else>
            <div>Loading..</div>
        </div>
    </div>
</template>

<script>
import Stat from '../../../api/Stat'

export default {
    name: "ResultsTableView",
    props: ['args', 'index'],
    data () {
        return {
            results: null,
            pageCount: 3,
            pageNo: 1,
            pageSize: 20
        }
    },
    methods: {
        handleClickPageButton (pageNo) {
            this.pageNo = pageNo
            let args = [...this.args]
            args[1] = [20, this.pageNo]
            this.$emit('change', {index: this.index, params: args})
        },
        // 打开动态表，文章统计表
        handleOpenArticleTable () {
            this.$emit('insert', {type: 'A', id: 'a - ' + Date.now()})
        },
        //打开动态表，专题列表
        handleOpenTopicTable () {
            this.$emit('insert', {type: 'P', id: 'p - ' + Date.now()})
        },
        initResults () {
            if (this.args) {
                let [, pageInfo, , ,] = this.args
                if (pageInfo) {
                    let [pageSize, pageNo] = pageInfo
                    this.pageSize = pageSize
                    this.pageNo = pageNo
                }
            }

            Stat.getTabResults().then((results) => {
                this.results = results
            })
        }
    },
    mounted () {
        this.initResults()
    }
}
</script>

<style scoped>

</style>