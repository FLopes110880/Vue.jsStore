<template>
<div>
    <Header />
        <section class="vh-100">
            <div v-if="userLoggedIn" id="login-form" class="container" style="margin-top: 2%;">
                <div class="container flex-wrap py-5 h-100" style="width: 50%;">
                    <div class="row d-flex align-items-center justify-content-center h-100">
                        <div class="ms-auto btn btn-lg shadow border-dark">
                            <div v-if="checkOrder">
                                <strong>My Orders</strong>
                                <div v-for="order in orders" :key="order.id">
                                    <ul class="list-group">
                                        <li class="list-group-item mb-2">
                                            <div class="row">
                                                <div class="col-9">
                                                    <span style="font-size: small"><strong>Order Created at: </strong>{{order.created_at}} </span>
                                                </div>
                                                <div class="col-3">
                                                    <button class="btn btn-primary btn-sm mt-auto" style="float: right" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapsible'+order.id" aria-expanded="false" aria-controls="collapseExample">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="collapse multi-collapse" :id="'collapsible'+order.id">
                                                <div v-for="item in order.items" :key="item.product_id">
                                                    <ul class="list-group" >
                                                        <li class="list-group-item">
                                                            <strong style="float: left">{{item.name}}</strong>
                                                            <span style="float: right">{{item.quantity}} x {{item.price}}€ </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <strong style="float: left" class="ms-3">Total: {{order.total}}€</strong>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div v-else>
                                You have no orders, go check some of our cars!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h3 style="text-align: center;">Login first</h3>
            </div>

        </section>
    <Footer />
</div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
    components: {
		Footer,
        Header
	},
	data() {
		return {
            isHidden: false,
            id: 0,
            orders: 
            [
            //{
            //"id":"11",
            //"customer_id":"20",
            //"created_at":"2021-12-03 18:20:31",
            //"status_id":"1",
            //"total":"190",
            //"order_items":[{"product_id":"2","name":"Salmon Roll","price":"18","quantity":"4"},{"product_id":"3","quantity":"3"},{"product_id":"4","quantity":"2"}]
            //}
            ],
		}
	},
	mounted() {
        this.getOrders()
	},
	methods: {
        async getOrders() {
            if (this.userLoggedIn) {
                if (await this.$store.dispatch('orders/getMyOrdersFromDB')){
                    this.orders = this.$store.getters['orders/getOrders']
                }
            }
        },
	},
    computed: {
        checkOrder: function() {
            return this.orders.length !== 0
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