<template>
    <div>
        <div v-if="success" class="logout">
            <h3 style="text-align: center;">Not logged in </h3>
            <p style="text-align: center;"><button @click="logout()" style="background: green;">Return</button></p>
        </div>
        <div v-else class="logout">
            <h1 style="text-align: center;">Logout ?</h1>
            <p style="text-align: center;">
                <button @click="cancel()" style="background: orange;">Cancel</button>
                &nbsp;&nbsp;
                <button @click="logout()" style="background: green;">Logout</button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            success: false,
            user: {},
        }
    },
    methods: {
        logout: function() {
            if (this.userLoggedIn) {
                // User is signed in
                this.$store.dispatch('user/logoutUser', this.user)
                // destroy session
                this.logoutUser(this.user.session_id)
            } else {
                this.success = true
                // No user is signed in.
                this.$router.push('/')
            }
        },
        async logoutUser(session_id) {
            if (await this.$store.dispatch('user/logoutUser', session_id)) {
                // using local storage to pass information between views
                this.changeRouter()
            }
        },
        getUser() {
            this.user = this.$store.getters['user/getUser']
        },
        cancel() {
            this.$router.push('/')
        },
        changeRouter() {
            this.$router.push('/message/6')
        },
    },

    created: function () {
        if (this.userLoggedIn) {
            // User is signed in
            this.success = false
        } else {
            // No user is signed in.
            this.success = true
        }
    },
    computed: {
        userLoggedIn: function () {
            this.getUser()
            for (var i in this.user) return true
            return false
        },
    }
}
</script>

<style scoped>
</style>