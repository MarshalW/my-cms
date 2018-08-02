<template>
    <div>
        <p>
            <label>用户名</label><input v-model="userName"/>
        </p>
        <p>
            <label>密码</label><input type="password" v-model="password"/>
        </p>
        <button @click="handleLogin" :disabled="this.buttonName=='登录中..'">{{buttonName}}</button>
    </div>
</template>

<script>
import Authentication from '../api/Authentication'

export default {
    name: "LoginView",
    methods: {
        handleLogin () {
            this.buttonName = '登录中..'
            Authentication.login({
                userName: this.userName, password: this.password
            }).then((auth) => {
                this.$emit('login', auth)
            })
        }
    },
    data () {
        return {
            userName: '',
            password: '',
            buttonName: '登录'
        }
    }
}
</script>

<style scoped>

</style>