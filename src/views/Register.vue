<template>
    <div class="background">
        <Header />
            <section class="vh-100">
                <div class="container py-5 h-100" style="width: 50%;">
                    <div class="row d-flex align-items-center justify-content-center h-100">
                        <div class="justify-content-center ms-auto btn btn-lg shadow border-dark">
                            <div v-if="!userLoggedIn" id="register-form" class="container">
                                <h1 class="text-center ms-auto">Register</h1>
                                <form @submit.prevent="handleSubmit">
                                    <div class="form-outline mb-4">
                                        <input type="text" id="form1Example13" v-model="user.name" name="username" class="form-control form-control-lg shadow" placeholder="Your Name"/>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="email" id="form1Example23" v-model="user.email" name="email" class="form-control form-control-lg shadow" placeholder="Email address"/>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="password" id="form1Example33" v-model="user.password" name="password" class="form-control form-control-lg shadow" placeholder="Password"/>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="password" id="form1Example43" v-model="passwordConfirmation" name="repeatpass" class="form-control form-control-lg shadow" placeholder="Repeat Password"/>
                                    </div>
                                    <p style="align-content: center">
                                        <button type="submit" class="btn btn-primary">Register</button>
                                    </p>
                                </form>
                            </div>
                            <div v-else>
                                <h3 class="text-danger" style="text-align: center; margin-top: 100px;">Login first </h3>
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
			name: '',
			email: '',
			password: '',
        },
		passwordConfirmation: '',
		submitting: true,
		error: true,	
      }
    },
	
	methods: {
        async handleSubmit(){
            this.submitting = true;
            if (this.user.name === '' || this.user.email === '' || this.user.password === '' || this.passwordConfirmation === '') {
                alert('Todos os campos devem ser preenchidos')
            }
            else if (this.user.password !== this.passwordConfirmation) {
                alert('Passwords não coincidem')
            }
            else if (this.user.password === this.passwordConfirmation && !await this.$store.dispatch('user/userExists', this.user)){
                await this.$store.dispatch('user/addUser');
                this.changeRouter()
            }
        },
        changeRouter() {
            this.$router.push('/message/4')
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
        background-image: url("../assets/images/paisagem3.jpg");
        background-size: cover;
    }
    .error-message {
        color: #d33c40;
    }
</style>