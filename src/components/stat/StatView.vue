<template>
    <div class="statView">
        <div class="controlsPane">
            <SearchCommandView :id="$route.params.id" @query="handleQuery" @select="handleSelect" @clear="handleClear"
                               :keyword="this.params.get('keyword')"/>
            <ReleaseSideCheckboxView v-if="openSelected=='releaseSide'" :checked="params.get('releaseSide')"
                                     @select="handleSelect" @set="handleSet"/>
        </div>
        <div class="numbersPane">
            <Numbersview :results="bigNumberResults"/>
        </div>
        <div class="tablesPane">
            <TabsView :id="$route.params.id" :params="params" :t="$route.query.t"/>
        </div>
    </div>
</template>

<script>
import SearchCommandView from './controls/SearchCommandView'
import ReleaseSideCheckboxView from "./controls/ReleaseSideCheckboxView"
import Numbersview from './numbers/NumbersView'
import TabsView from './tables/TabsView'

import Stat from '../../api/Stat'

export default {
    name: "StatView",
    components: {ReleaseSideCheckboxView, SearchCommandView, Numbersview, TabsView},
    data () {
        return {
            params: new Map(),
            openSelected: null,
            bigNumberResults: null
        }
    },
    beforeMount () {
        this.params = this.getParams()
    },
    mounted () {
        this.getBigNumberResults()
    },
    methods: {
        // 获取查询参数Map
        getParams () {
            let map = new Map()
            map.set('keyword', '')
            map.set('releaseSide', [])

            if (this.$route.query.q) {
                map = new Map(JSON.parse(this.$route.query.q))
            }
            return map
        },
        // 获取大数字区的数据结果
        getBigNumberResults () {
            this.bigNumberResults = null
            Stat.getBigNumberResults().then((results) => {
                this.bigNumberResults = results
            })
        },
        handleClear () {
            let map = new Map()
            map.set('keyword', '')
            map.set('releaseSide', [])


            let currentRoute = this.$router.currentRoute

            this.$router.push({
                path: `/stat/${this.$route.params.id}`,
                query: {...currentRoute.query, q: JSON.stringify([...map]), t: Date.now(), c: null}
            })
        },
        // 处理查询，点击查询按钮时
        handleQuery (params) {
            this.params.set('keyword', params.keyword)
            let currentRoute = this.$router.currentRoute

            this.$router.push({
                path: `/stat/${this.$route.params.id}`,
                query: {...currentRoute.query, q: JSON.stringify([...this.params]), t: Date.now()}
            })
        },
        // 处理选择条件
        handleSelect (type) {
            if (!type || this.openSelected == type) {
                this.openSelected = null
            } else {
                this.openSelected = type
            }
        },
        // 处理查询参数的设置
        handleSet (params) {
            if (params.type) {
                let map = new Map(JSON.parse(JSON.stringify([...this.params])))
                map.set(params.type, params.value)
                this.params = map
            }
        }
    },
    watch: {
        // 当t改变时说明有查询请求发生（如点击查询按钮）
        '$route.query.t': function () {
            this.params = this.getParams()
            this.getBigNumberResults()
            this.openSelected = null
        },
        // 当id变化，说明选择了不同的导航条目
        '$route.params.id': function () {
            this.getBigNumberResults()
            this.openSelected = null
        }
    }
}
</script>

<style scoped>
    .statView {
        display: flex;
        flex-direction: column;
        padding: 2px;
    }

    .controlsPane {
        background-color: blanchedalmond;
        width: 100%;
    }

    .numbersPane {
        width: 100%;
        background-color: blanchedalmond;
    }

    .tablesPane {
        width: 100%;
        background-color: blanchedalmond;
    }
</style>