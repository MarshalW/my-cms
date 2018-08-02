import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$context = {}

let bus = new Vue()
Object.defineProperties(Vue.prototype, {
    $bus: {
        get () {
            return bus
        }
    }
})

new Vue({
    render: h => h(App)
}).$mount('#app')
