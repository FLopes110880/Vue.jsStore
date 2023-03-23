<template>
    <div>
        <Header />
            <div v-if="basket.length !== 0" style="margin-top: 5%; margin-bottom: 5%" class="w-75 container-fluid justify-content-center">
                <div v-for="product in products" :key="product.id">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <strong>{{product.name}}: {{product.price}}</strong>
                            <span class="badge rounded-pill" style="background-color: #4A5859;">
                                <button class="btn rounded-pill" style="background-color: #4A5859;" @click="decrementProductBasket(product.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                                    </svg>
                                </button>
                                {{getQuantity(product.id)}}
                                <button class="btn rounded-pill" style="background-color: #4A5859;" @click="incrementProductBasket(product.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                    </svg>
                                </button>
                            </span>
                        </li>
                    </ul>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">
                        <strong>Total:</strong>
                        <strong style="float: right">{{amount}}</strong>
                    </li>
                </ul>
                <div class="mt-3" style="margin-bottom: 10%">
                    <button class="btn btn-primary btn-warning btn-sm mt-auto" style="float: left" type="button" v-on:click="eliminateBasket()">Clear Basket</button>
                    <div v-if="userLoggedIn" style="float: right" >
                        <button class="btn btn-primary btn-sm mt-auto" v-on:click="addOrder()">Checkout</button>
                    </div>
                    <div style="float: right" v-else>
                        <router-link class="text-white btn btn-primary btn-sm" type="button" to="/login">Login to Place Order</router-link>
                    </div>
                </div>
            </div>
            <div v-else style="margin-top: 5%; margin-left: 25%;" class="w-50">
                <div class="card shadow-0 border rounded-3 mb-3">
                    <div class="card-body">
                        <h1 class="text-center">Order Basket is empty, Please Select an Item to Buy</h1>
                    </div>
                    <router-link class="text-white btn btn-primary btn-sm mt-auto justify-content-start" type="button" to="/products">Select More</router-link>
                </div>
            </div>
        <Footer />
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
	name: 'products',
    components: {
		Footer,
        Header
	},
	data() {
		return {
            basket: [],
            products: [],
		}
	},
	mounted() {
        this.getBasket()
        this.getProduct()
	},
	methods: {
        async getProduct() {
            if (await this.$store.dispatch('products/getProductsFromDB')) {
                this.products = this.$store.getters['products/getProducts']
            }
            let array = []
            for (let i = 0; i < this.basket.length; i++) {
                array.push(this.basket[i].id)
            }
            this.products = this.products.filter(d => array.includes(d.id))
        },
        async getBasket() {
            this.basket = this.$store.getters['basket/getProducts']
            for (const value of this.basket) {
                this.products.push(await this.$store.getters['products/getProduct'](value.id))
            }
        },
        async incrementProductBasket (productId) {
            await this.$store.commit('basket/incrementProduct', productId)
            this.basket.items = await this.$store.getters['basket/getProducts']
        },
        async decrementProductBasket (productId) {
            await this.$store.commit('basket/decrementProduct', productId)
            this.basket.items = await this.$store.getters['basket/getProducts']
            this.getProduct()
        },
        async eliminateBasket() {
            await this.$store.commit('basket/clearBasket')
            this.basket = await this.$store.getters['basket/getProducts']
            await this.$router.push('/message/2')
        },
        getQuantity(productId) {
            let result = this.basket.find(b => b.id == productId)
            if (typeof result === 'undefined') {
                return 0
            }
            return result.quantity
        },
        getTotalPrice(id) {
            let quantity = this.getQuantity(id)
            let result = this.products.find(p => p.id == id)
            return quantity*result.price
        },
        async addOrder() {
            var order = {status_id: 3, totalAmount: this.amount, items: this.basket}
            if (await this.$store.dispatch('orders/addOrder', order)) {
                alert("The amount of " + this.amount + "€ will be cherged from your bank account!")
                await this.$store.commit('basket/clearBasket')
                this.basket = await this.$store.getters['basket/getProducts']
                await this.$router.push('/message/1')
            }
        }

	},
    computed: {
        amount: function() {
            let sum = 0

            for (let i = 0; i < this.products.length; i++) {
                sum += this.getTotalPrice(this.products[i].id)
            }
            return sum
        },
        userLoggedIn: function () {
            let user =  this.$store.getters['user/getUser']
            for (var i in user) return true
            return false
        },
    },
}
</script>

<style scoped>
</style>