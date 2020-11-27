import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import Login from '../components/login.vue'
import Administration from '../components/administration.vue'

Vue.use(VueRouter)

const routes = [
  { path:'/',redirect:'/home'},
  { path:'/home',component:Home},
  { path:'/login',component:Login},
  {path:'/administration',component:Administration}
]

const router = new VueRouter({
  routes
})

export default router
