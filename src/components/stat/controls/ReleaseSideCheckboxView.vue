<template>
    <div class="releaseSide">
        <label style="margin-right: 6px" v-for="item in items" :key="item"><input type="checkbox" :value="item"
                                                                                  v-model="mChecked"/>{{item}}</label>
        <button @click="handleButton(true)">确定</button>
        <button @click="handleButton(false)">取消</button>
    </div>
</template>

<script>
export default {
    name: "ReleaseSideCheckboxView",
    props: ['checked'],
    data () {
        return {
            mChecked: [],
            items: [
                'iOS',
                'Android'
            ]
        }
    },
    methods: {
        handleButton (confirm) {
            this.$emit('select')
            if (confirm) {
                this.$emit('set', {type: 'releaseSide', value: this.mChecked})
            }

        }
    },
    mounted () {
        this.mChecked = this.checked
    },
    watch: {
        'id': function () {
            this.mChecked = this.checked
        }
    }
}
</script>

<style scoped>
    .releaseSide * {
        margin-right: 6px;
    }

</style>