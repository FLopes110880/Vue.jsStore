<template>
    <div class="logout">
        <h1 class="success-message" style="text-align: center;">{{message}}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: ''
        }
    },
    mounted() {
        this.setMessage()
    },
    methods: {
        setMessage() {
            if (this.$route.params.id == 1) {
                this.message = "Products Bought Succesfully"
            }
            if (this.$route.params.id == 2) {
                this.message = "Basket cleaned Successfully, getting redirected to Product Page"
            }
            if (this.$route.params.id == 4) {
                this.message = "Welcome! You can now login"
            }
            if (this.$route.params.id == 5) {
                this.message = "Welcome back " + this.$store.getters['user/getUser'].name + "!"
            }
            if (this.$route.params.id == 6) {
                this.message = "Bye, come back soon!"
            }
            var timeleft = 2;
            var downloadTimer = setInterval(() => {
                if (timeleft <= 0) {
                    clearInterval(downloadTimer)
                    this.$router.push('/products')
                }
                timeleft -= 1
            }, 1000)
        },
    },

}
</script>

<style scoped>
.logout {
    margin: 0 auto;
    max-width: 800px;
}

.success-message {
    color: #32a95d;
}

.error-message {
    color: #d33c40;
}
</style>