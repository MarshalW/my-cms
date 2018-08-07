import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import StatView from './components/stat/StatView'
import UsersView from './components/admin/UsersView'
import RolesView from './components/admin/RolesView'

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

Vue.use(VueRouter)

const routes = [
    {path: "/stat/:id", component: StatView},
    {path: "/users", component: UsersView},
    {path: "/roles", component: RolesView}
]

new Vue({
    render: h => h(App),
    router: new VueRouter({routes})
}).$mount('#app')
