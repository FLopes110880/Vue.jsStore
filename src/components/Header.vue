<template>
    <div class="fixed-top">
        <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div class="container-fluid">
                <ul class="navbar-nav">
                    <li class="nav-item">

                        <router-link to="/"  class="nav-link active mx-2"><img src="../../public/63-home-gradient.gif">Car Shop</router-link>
                    </li>
                </ul>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link active" aria-current="page" to="/products">{{menu1}}</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link active" to="/basket">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-cart " viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
                                <span class="badge bg-secondary">{{getQuantidade()}}</span>
                            </router-link>
                        </li>
                        <li v-if="!userLoggedIn" class="navbar-nav">
                            <router-link class="nav-link active" aria-current="page" to="/login">{{menu2}}</router-link>
                        </li>
                        <li v-else class="navbar-nav">
                            <router-link class="nav-link active" aria-current="page" to="/orders">{{menu6}}</router-link>
                        </li>
                        <li v-if="!userLoggedIn" class="nav-item">
                            <router-link class="nav-link active" to="/register">{{menu3}}</router-link>
                        </li>
                        <li v-else class="nav-item">
                            <router-link class="nav-link active" to="/logout">{{menu4}}</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active">{{welcome}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>

export default {
    data() {
        return {
            menu1: "Products",
            menu2: "Login",
            menu3: "Register",
            menu4: "Logout",
            menu5: "Basket",
            menu6: "Orders",
            welcome: "Welcome",
            user: {
                id: '',
                name: '',
                email: '',
                session_id: ''
            },
            basket: [],
        }
    },
    mounted() {
        this.helloUser()
        this.getBasket()
    },
    methods: {
        helloUser() {
            if (this.userLoggedIn) {
                this.welcome = this.welcome.concat(" " + this.user.name)
            }
        },
        getUser() {
            this.user = this.$store.getters['user/getUser']
        },
        getBasket() {
            this.basket = this.$store.getters['basket/getProducts']
        },
        getQuantidade() {
            this.getBasket()
            var sum = 0
            for (const value of this.basket) {
                sum += value.quantity;
            }
            return sum
        }
    },
    computed: {
        userLoggedIn: function () {
            this.getUser()
            for (var i in this.user) {
                return true
            }
            return false
        },
    },
}

</script>  
