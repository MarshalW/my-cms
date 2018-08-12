<template>
    <div class="tabsPane">
        <div>表区</div>
        <div>
            <ul class="tabs">
                <li v-for="(tab,index) in tabs">
                    <SimpleTabView :key="index+tab[0]" :index="index" @handleClickTab="handleClickTab"
                                   @handleRemoveTab="handleRemoveTab" :args="tab"
                    />
                </li>
            </ul>
        </div>
        <div class="tableView">
            <div class="notShow">
                <div>{{id}}</div>
                <div>{{t}}</div>
            </div>
            <div v-if="currentTabResults==null">Loading..</div>
            <div v-if="currentTabResults">
                <component :is="getTableComponentByType(getTabType(tabs[this.currentIndex]))"
                           :results="currentTabResults" :args="tabs[this.currentIndex]"
                           @insert="handleInsertTab"/>
            </div>
        </div>
    </div>
</template>

<script>
import Stat from '../../../api/Stat'
import TableTypes from './TableTypes'

import SimpleTabView from './SimpleTabView'

let typeMap = TableTypes.TYPE_MAP

const initTabs = [['R', , , ,], ['D', , , ,], ['S', , , ,], ['T', , , ,]]

export default {
    name: "TabsView",
    props: ['id', 'params', 't'],
    components: {
        ...TableTypes.COMPONENTS,
        SimpleTabView
    },
    data () {
        return {
            tabs: [],
            currentIndex: 0,
            currentTabResults: null
        }
    },
    computed: {},
    methods: {
        pushRouter () {
            let currentRoute = this.$router.currentRoute
            this.$router.push({
                path: currentRoute.path,
                query: {...currentRoute.query, c: JSON.stringify([this.currentIndex, this.tabs])}
            })
        },
        handleRemoveTab (index) {
            let tabs = [...this.tabs]
            tabs.splice(index, 1)
            this.tabs = tabs

            // 防止删除时超过数组最后一个
            if (this.currentIndex >= this.tabs.length) {
                this.currentIndex--
            }

            this.pushRouter()
        },
        handleInsertTab (params) {
            let {type, id} = params
            let args = [type, , , id]
            let tabs = [...this.tabs]
            this.currentIndex = this.currentIndex + 1
            tabs.splice(this.currentIndex, 0, args)
            this.tabs = tabs
            this.pushRouter()
        },
        handleClickTab (index) {
            this.currentIndex = index
            this.currentTabResults = null

            Stat.getTabResults().then((results) => {
                this.currentTabResults = results
            })

            this.pushRouter()
        },
        initTabs (params) {
            let [tabs, currentIndex] = params

            this.currentIndex = currentIndex
            this.currentTabResults = null

            this.tabs = tabs

            Stat.getTabResults().then((results) => {
                this.currentTabResults = results
            })
        },
        getTableComponentByType (type) {
            return typeMap.get(type)[0]
        },
        getTabType (tab) {
            if (Array.isArray(tab)) {
                return tab[0]
            }
            return tab
        },
        getDefaultNavigateTabs () {
            this.initTabs([this.getBlankTabsWithoutResultsTable(), 0])
        },
        getBlankTabsWithoutResultsTable () {
            if (this.id == 'n1') { // 当是部门的情况下
                return [['D', , , ,], ['S', , , ,], ['T', , , ,]]
            } else { // 当是栏目的情况下
                return [['S', , , ,], ['T', , , ,]]
            }
        },
        getUrlQueryParamsTabs () {
            //默认配置
            let tabs = this.getBlankTabsWithoutResultsTable()
            let currentIndex = 0

            //有tabs参数的情况
            if (this.$route.query.c) {
                let [, _tabs] = JSON.parse(this.$route.query.c)
                tabs = _tabs
            }

            // 如果没有关键字搜索，没有用搜索结果表
            if (!this.params.get('keyword') || this.params.get('keyword').length == 0) {
                let tabType = tabs[0][0]
                if (tabType == 'R') {
                    tabs.splice(0, 1) //删除搜索结果
                }

                if (this.$route.query.c) {
                    let [index,] = JSON.parse(this.$route.query.c)
                    currentIndex = index
                }
            } else {
                let tabType = tabs[0][0]
                if (tabType != 'R') {
                    tabs = [['R'], ...tabs]
                }
            }

            this.initTabs([tabs, currentIndex])
        },
        isEmptyParams () {
            return this.$route.query.q == null
        }
    },
    mounted () {
        if (this.isEmptyParams()) {
            this.getDefaultNavigateTabs()
        } else {
            this.getUrlQueryParamsTabs()
        }
    },
    watch: {
        'id': function () {
            this.getDefaultNavigateTabs()
        },
        't': function () {
            this.getUrlQueryParamsTabs()
        }
    }
}
</script>

<style scoped>
    .tabsPane {
        display: flex;
        flex-direction: column;
        padding: 2px;
    }

    .tabs {
        text-align: left;
    }

    .tabs li {
        margin-right: 10px;
        list-style: none;
        float: left;
    }

    .tableView {
        min-height: 100px;
        float: inherit;
    }

    .notShow {
        display: none;
    }

</style>