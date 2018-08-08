<template>
    <div class="tabsPane">
        <div>表区</div>
        <div>
            <ul class="tabs">
                <li v-for="(tab,index) in tabs">
                    <button @click="handleClickTab(index)">{{tab}}</button>
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
                <component :is="getTableComponentByType(tabs[this.tabsMap.get('currentIndex') || 0])"/>
            </div>
        </div>
    </div>
</template>

<script>
import Stat from '../../../api/Stat'

import ResultsTableView from './ResultsTableView'
import DepartmentTableView from './DepartmentTableView'
import SectionTableView from './SecctionTableView'
import TopArticlesTableView from './TopArticlesTableView'
import ArticleTableView from './ArticleTableView'

const tableTypeMap = new Map()
tableTypeMap.set('搜索结果', ResultsTableView)
tableTypeMap.set('部门列表', DepartmentTableView)
tableTypeMap.set('栏目列表', SectionTableView)
tableTypeMap.set('文章Top列表', TopArticlesTableView)

const defaultTabs = ['搜索结果', '部门列表', '栏目列表', '文章Top列表']


export default {
    name: "TabsView",
    props: ['id', 'params', 't'],
    components: {ResultsTableView, DepartmentTableView, SectionTableView, TopArticlesTableView, ArticleTableView},
    data () {
        return {
            tabs: [],
            currentTabResults: null,
            tabsMap: new Map()
        }
    },
    computed: {},
    methods: {
        currentIndex () {
            return this.tabsMap.get('currentIndex') || 0
        },
        handleClickTab (index) {
            this.tabsMap.set('currentIndex', index)

            let currentRoute = this.$router.currentRoute
            this.$router.push({
                path: currentRoute.path,
                query: {...currentRoute.query, c: JSON.stringify([...this.tabsMap])}
            })
            this.currentTabResults = null
            Stat.getTabResults().then((results) => {
                this.currentTabResults = results
            })
        },
        initDefaultTabs () {
            this.currentTabResults = null
            this.tabs = defaultTabs
            this.tabsMap.set('currentIndex', 0)

            if (this.$route.query.c) {
                this.tabsMap = new Map(JSON.parse(this.$route.query.c))
            }

            Stat.getTabResults().then((results) => {
                this.currentTabResults = results
            })
        },
        getTableComponentByType (type) {
            return tableTypeMap.get(type)
        }
    },
    mounted () {
        this.initDefaultTabs()
    },
    watch: {
        'id': function () {
            this.initDefaultTabs()
        },
        't': function () {
            this.initDefaultTabs()
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