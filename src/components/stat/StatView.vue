<template>
    <div class="statView">
        <div class="controlsPane">
            <SearchCommandView :id="$route.params.id" @query="handleQuery" @select="handleSelect"
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
    mounted () {
        this.params = this.getParams()
        this.getBigNumberResults()
    },
    methods: {
        getParams () {
            let map = new Map()
            map.set('keyword', '')
            map.set('releaseSide', [])

            if (this.$route.query.q) {
                map = new Map(JSON.parse(this.$route.query.q))
            }
            return map
        },
        getBigNumberResults () {
            this.bigNumberResults = null
            Stat.getBigNumberResults().then((results) => {
                this.bigNumberResults = results
            })
        },
        handleQuery (params) {
            this.params.set('keyword', params.keyword)
            let currentRoute = this.$router.currentRoute

            this.$router.push({
                path: `/stat/${this.$route.params.id}`,
                query: {...currentRoute.query, q: JSON.stringify([...this.params]), t: Date.now()}
            })
        },
        handleSelect (type) {
            if (!type || this.openSelected == type) {
                this.openSelected = null
            } else {
                this.openSelected = type
            }
        },
        handleSet (params) {
            if (params.type) {
                let map = new Map(JSON.parse(JSON.stringify([...this.params])))
                map.set(params.type, params.value)
                this.params = map
            }
        }
    },
    watch: {
        '$route.query.t': function () {
            this.params = this.getParams()
            this.getBigNumberResults()
            this.openSelected = null
        },
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