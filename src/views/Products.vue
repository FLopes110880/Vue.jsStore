<template>
    <div>
        <Header />
        <div class="container-fluid flex-wrap" style="margin-bottom: 3%">
            <div class="row">
                <aside class="col-xs12 col-2" style="margin-top: 3%">
                    <div class="mt-4">
                        <div class="card">
                            <h3 class="text-center card-header">Categories</h3>
                            <ul class="nav flex-column mb-2">
                                <div v-for="category in categories" :key="category.id" class="container d-flex justify-content-center">
                                    <button type="button" class="btn btn-light w-100 d-flex text-lg-left" v-on:click="showProducts(category.name)">{{category.name}}</button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </aside>
                <div class="col-xs12 col-9"  style="margin-top: 5%">
                    <div class="col-12">
                        <div class="mt-2">
                            <h4>Selected Category: {{currentCategory}}</h4>
                            <div v-for="product in products" :key="product.id">
                                <div v-if="product.cat_id === currentCategory || currentCategory === 'All Products'">
                                    <div class="row justify-content-center mb-3">
                                        <div class="col-md-12">
                                            <div class="card shadow-0 border rounded-3">
                                                <div class="card-body ">
                                                    <div class="row d-flex">
                                                        <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                            <div class="bg-image hover-zoom ripple rounded ripple-surface">
                                                                <img v-bind:src="product.image" class="w-100" />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-lg-6 col-xl-6">
                                                            <h5>{{product.name}}</h5>
                                                            <hr class="bg-dark border-2 border-top border-dark">
                                                            <p class="text-truncate mb-4 mb-md-0 text-wrap" v-html="product.description"></p>
                                                        </div>
                                                        <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                            <div class="d-flex flex-row align-items-center mb-1">
                                                                <h4 class="mb-1 me-1">{{product.price}}€</h4>
                                                            </div>
                                                            <div class="d-flex flex-column mt-4">
                                                                <button class="btn btn-primary btn-sm mt-auto" type="button" v-on:click="addProductBasket(product.id)">Add do Basket</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'


export default {
    showModal: true,
    components: {
		Footer,
        Header
	},
	data() {
		return {
            products: [],
            categories: [],
            basket: [],
            currentCategory: 'All Products',
		}
	},
	mounted() {
        this.getProduct()
        this.getCategories()
	},
	methods: {
        async getProduct() {
            if (await this.$store.dispatch('products/getProductsFromDB')) {
                this.products = this.$store.getters['products/getProducts']
            }
        },
        async getCategories() {
            if (await this.$store.dispatch('categories/getCategoriesFromDB')) {
                this.categories = this.$store.getters['categories/getCategories']
            }
        },
        showProducts (categoryName) {
            this.currentCategory = categoryName
        },
        async addProductBasket (productId) {
            await this.$store.commit('basket/incrementProduct', productId)
            this.basket.items = await this.$store.getters['basket/getProducts']
        }
	},
    computed: {

    },
}



</script>

<style scoped>

</style>