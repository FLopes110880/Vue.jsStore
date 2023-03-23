<template>
<div class="background">
<Header />
    <section class="vh-100">
        <div class="container py-5 h-100" style="width: 50%;">
            <div class="row d-flex align-items-center justify-content-center h-100">
                <div class="justify-content-center ms-auto btn btn-lg shadow border-dark">
                    <div v-if="!userLoggedIn" id="login-form" class="container">
                        <h1 style="text-align: center">Login</h1>
                        <form @submit.prevent="handleSubmit">
                            <div class="form-outline mb-4">
                                <input type="email" id="form1Example13" v-model="user.email" name="email" class="form-control form-control-lg" placeholder="Email address"/>
                            </div>
                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <input type="password" id="form1Example23" v-model="user.password" name="password" class="form-control form-control-lg" placeholder="Password"/>
                            </div>
                            <p style="align-content: center">
                                <button type="submit" class="btn btn-primary">Login</button>
                            </p>
                        </form>
                    </div>
                    <div v-else>
                        <h3 style="text-align: center;">Logout first </h3>
                    </div>
                </div>
            </div>
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
        user: {
			email: '',
			password: '',
        },
		submitting: false,
		error: false,
      }
    },
	
	methods: {
        async handleSubmit(){
            this.submitting = true
            if (this.user.email === '' || this.user.password === '') {
                alert('Todos os campos devem ser preenchidos')
            }
            else if (await this.$store.dispatch('user/loginUser', this.user)) {
                this.changeRouter()
            }
            else {
                alert('Login failed: wrong email or password')
            }
        },
        changeRouter() {
            this.$router.push('/message/5')
        },
	},
	
	computed: {
        userLoggedIn: function () {
            let user =  this.$store.getters['user/getUser']
            for (var i in user) return true
            return false
        },
	},
	directives: {

	},
	created: function () {

	}
}
</script>

<style scoped>
    .background {
        background-image: url("../assets/images/paisagem2.jpg");
        background-size: cover;
    }
</style>