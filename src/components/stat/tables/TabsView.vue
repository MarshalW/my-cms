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
                <!-- 目的是当id和t改变后，会render当前的view，否则当前视图不会改变，也许这不是最佳实践 -->
                <div>{{id}}</div>
                <div>{{t}}</div>
            </div>
            <div v-if="tabDisplay">
                <component :is="getTableComponentByType(getTabType(tabs[this.currentIndex]))"
                           :args="tabs[this.currentIndex]" :index="this.currentIndex"
                           @insert="handleInsertTab" @change="handleParamsChange"/>
            </div>
        </div>
    </div>
</template>

<script>
import TableTypes from './TableTypes'

import SimpleTabView from './SimpleTabView'

let typeMap = TableTypes.TYPE_MAP

// 默认的tab结构，[type,pages,sort,params]，比如['R',[20,2],[2,true],,]
// type为字符，pages=[分页大小, 当前页号]，sort=【排序的列下标，是否降序]
// 一般tab的params为空，动态tab可能有params，比如选择的子tab，以及子tab的pages和sort参数
// 表的type，见TableTypes.js
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
            tabDisplay: true // 防止动态tab之间切换不刷新，也许有更好的办法
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
        handleParamsChange (params) {
            let tabs = [...this.tabs]
            tabs[params.index] = params.params
            this.tabs = tabs

            this.pushRouter()
        },
        handleRemoveTab (index) {
            let tabs = [...this.tabs]
            tabs.splice(index, 1)
            this.tabs = tabs

            if (this.currentIndex > 0) {
                this.currentIndex--
            }

            this.pushRouter()
        },
        handleInsertTab (params) {
            let {type, id} = params
            let args = [type, , , [id, ,]]
            let tabs = [...this.tabs]
            this.currentIndex = this.currentIndex + 1
            tabs.splice(this.currentIndex, 0, args)
            this.tabs = tabs
            this.pushRouter()
        },
        handleClickTab (index) {
            this.tabDisplay = false
            setTimeout(() => {
                this.currentIndex = index
                this.pushRouter()
                this.tabDisplay = true
            }, 0)

        },
        initTabs (params) {
            let [tabs, currentIndex] = params

            this.currentIndex = currentIndex
            this.tabs = tabs
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
            let currentIndex = 0

            //有tabs参数的情况
            if (this.$route.query.c) {
                [currentIndex,] = JSON.parse(this.$route.query.c)
            }

            this.initTabs([this.getBlankTabsWithoutResultsTable(), currentIndex])
        },
        getBlankTabsWithoutResultsTable () {
            if (this.id == 'n1') { // 当是部门的情况下
                return [['D', , , ,], ['S', , , ,], ['T', , , ,]]
            } else { // 当是栏目的情况下
                return [['S', , , ,], ['T', , , ,]]
            }
        },
        getUrlQueryParamsTabs (chooseResultsTab = false) { //TODO 这部分逻辑很乱，需要重构
            //默认配置
            let tabs = this.getBlankTabsWithoutResultsTable()
            let currentIndex = 0

            //有tabs参数的情况
            if (this.$route.query.c) {
                [currentIndex, tabs] = JSON.parse(this.$route.query.c)
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
                    tabs = [['R', , , ,], ...tabs]
                }
            }

            if (chooseResultsTab) {
                currentIndex = 0
            }

            this.initTabs([tabs, currentIndex])
        },
        isEmptyParams () {
            return this.$route.query.q == null
        }
    },
    beforeMount () {
        if (this.isEmptyParams()) {
            this.getDefaultNavigateTabs()
        } else {
            console.log('refresh page===>')
            this.getUrlQueryParamsTabs()
        }
    },
    watch: {
        'id': function () {
            this.getDefaultNavigateTabs()
        },
        't': function () {
            this.tabDisplay = false
            setTimeout(() => {
                this.getUrlQueryParamsTabs(true)
                this.tabDisplay = true
            }, 0)

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