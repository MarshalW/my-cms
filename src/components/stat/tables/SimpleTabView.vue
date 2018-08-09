<template>
    <div>
        <button @click="$emit('handleClickTab',index)">{{params.title}}</button>
        <button v-if="params.type=='A' || params.type=='P'" @click="$emit('handleRemoveTab',index)">x</button>
    </div>
</template>

<script>
import TableTypes from './TableTypes'
import Stat from '../../../api/Stat'

export default {
    name: "SimpleTabView",
    props: ['args', 'index'],
    data () {
        return {
            params: {}
        }
    },
    mounted () {
        this.initData()
    },
    methods: {
        initData () {
            let [type, , , id] = this.args
            let [, title] = TableTypes.TYPE_MAP.get(type)
            this.params = {title, type, id}

            if (type == 'A') {
                this.loadTitle(id)
            }
        },
        loadTitle (id) {
            Stat.loadTabTitle(id).then((results) => {
                let params = {...this.params}
                params.title = results.title
                this.params = params

            })
        }
    },
    watch: {
        'args' () {
            this.initData()
        }
    }
}
</script>

<style scoped>

</style>