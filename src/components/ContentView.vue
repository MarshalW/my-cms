<template>
    <div>
        <div class="contentLoading" v-if="!loaded">
            Loading ..
        </div>
        <div class="contentContainer" v-if="loaded">
            <div class="navigatePane">
                <NavigateView :items="navigateItems"/>
            </div>
            <div class="rightPane">
                <div class="headerPane">
                    <header-view/>
                </div>
                <div class="contentPane">
                    <router-view></router-view>
                </div>
                <div class="footerPane"></div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderView from './header/HeaderView'
import NavigateView from './navigation/NavigateView'

import Navigation from '../api/Navigation'

export default {
    name: "ContentView",
    components: {NavigateView, HeaderView},
    data () {
        return {
            loaded: false,
            navigateItems: []
        }
    },
    mounted () {
        this.initNavigateItems()
    },
    methods: {
        initNavigateItems () {
            Navigation.getItems().then((items) => {
                this.navigateItems = items
                this.loaded = true
            })
        }
    }
}
</script>

<style scoped>
    .contentContainer {
        background-color: gainsboro;

        /* Height and width fallback for older browsers. */
        height: 100%;
        width: 100%;

        /* Set the height to match that of the viewport. */
        height: 100vh;

        /* Set the width to match that of the viewport. */
        width: 100vw;

        display: flex;
    }

    .navigatePane {
        background-color: darkblue;
        flex-grow: 1;
        min-width: 200px;
        max-width: 300px;
    }

    .rightPane {
        background-color: beige;
        flex-grow: 2;

        display: flex;
        flex-direction: column;
    }

    .headerPane {
        background-color: azure;
        min-height: 50px;
        max-height: 50px;
    }

    .contentPane {
        background-color: burlywood;
        flex-grow: 1;
    }

    .footerPane {
        background-color: mistyrose;
        min-height: 80px;
        max-height: 80px;
    }
</style>