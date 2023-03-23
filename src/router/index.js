import Vue from 'vue'
import VueRouter from 'vue-router'
import  Home from '@/views/Home.vue'
import  Products from '@/views/Products.vue'
import  Basket from '@/views/Basket.vue'
import  Register from '@/views/Register.vue'
import  Login from '@/views/Login.vue'
import  Orders from '@/views/MyOrders.vue'
import  Message from '@/views/Message.vue'
import Logout from '@/views/Logout';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/products',
    component: Products
  }, 
  {
    path: '/basket',
    component: Basket
  }, 
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/orders',
    component: Orders
  },
  {
    path: '/message/:id',
    component: Message
  },
  {
    path: '/logout',
    component: Logout,
  }  ,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
