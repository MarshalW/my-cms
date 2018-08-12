<template>
    <div class="TopicsTableView">
        <div>专题统计表 {{args}}</div>
        <div v-if="results">
            <div>
                <button @click="handleClickTab(0)">文章列表</button>
                <button @click="handleClickTab(1)">时间汇总</button>
                <button @click="handleClickTab(2)">渠道汇总</button>
            </div>
            <div>
                <div v-if="currentIndex==0">文章列表内容</div>
                <div v-if="currentIndex==1">时间汇总内容</div>
                <div v-if="currentIndex==2">渠道汇总内容</div>
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
    name: "TopicsTableView",
    props: ['args', 'index'],
    data () {
        return {
            results: null,
            currentIndex: 0,
            id: null, //专题id
        }
    },
    methods: {
        handleClickTab (index) {
            this.currentIndex = index
            let args = [...this.args]
            args[3][1] = [this.currentIndex, , ,]
            this.$emit('change', {index: this.index, params: args})
        },
        initResults () {
            let index = 0
            if (this.args) {
                let [, , , p] = this.args
                let [id, params] = p
                this.id = id

                //params格式：[currentIndex,pages,sort]
                if (params && params.length > 0) {
                    [index] = params
                }
            }
            this.currentIndex = index

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
    .TopicsTableView button {
        margin-right: 10px;
    }
</style>