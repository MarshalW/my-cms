<template>
    <div class="SearchCommandView">
        <span style="margin-right: 10px">id: {{id}}</span>
        <button @click="handleSelect('releaseSide')">发布端</button>
        <input v-model="value"/>
        <button @click="handleQuery">查询</button>
    </div>
</template>

<script>
export default {
    name: "SearchCommandView",
    props: ['id', 'keyword'],
    data () {
        return {
            value: ''
        }
    },
    methods: {
        handleQuery () {
            this.$emit('query', {keyword: this.value})
        },
        handleSelect (type) {
            this.$emit('select', type)
        }
    },
    mounted () {
        this.value = this.keyword
    },
    watch: {
        'keyword': function () {
            this.value = this.keyword
        },
        'id': function () {
            this.value = ''
        }
    }
}
</script>

<style scoped>
    .SearchCommandView {
        height: 30px;
    }

    .SearchCommandView button {
        margin-right: 5px;
    }

    .SearchCommandView input {
        margin-right: 5px;
    }
</style>