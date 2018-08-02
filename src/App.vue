<template>
    <div id="app">
        <LoginView v-if="auth==null" @login="handleLogin"/>
        <ContentView v-if="auth!=null"/>
    </div>
</template>

<script>
import LoginView from './components/LoginView'
import ContentView from './components/ContentView'

export default {
    name: 'app',
    components: {ContentView, LoginView},
    data () {
        return {
            auth: null
        }
    },
    methods: {
        handleLogin: function (auth) {
            this.auth = auth
            this.$context.auth = this.auth
        },
        handleLogout: function () {
            console.log('logout ok')
            this.auth = null
            this.$context.auth = this.auth
        }
    },
    mounted () {
        this.$bus.$on('auth.logout', this.handleLogout)
    }
}
</script>

<style>
    html, body {
        /* Height and width fallback for older browsers. */
        height: 100%;
        width: 100%;

        /* Set the height to match that of the viewport. */
        height: 100vh;

        /* Set the width to match that of the viewport. */
        width: 100vw;

        /* Remove any browser-default margins. */
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
