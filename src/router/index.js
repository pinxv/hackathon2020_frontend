import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import Login from '../components/login.vue'
import Administration from '../components/administration.vue'
import Query from '../components/administration_children/query.vue'
import Upload from '../components/administration_children/upload.vue'
import Modify from '../components/administration_children/modify.vue'
import RiskMonitoring from '../components/administration_children/riskMonitoring.vue'
import Welcome from '../components/administration_children/welcome.vue'

Vue.use(VueRouter)

const routes = [
  { path:'/',redirect:'/home'},
  { path:'/home',component:Home},
  { path:'/login',component:Login},
  {
		path:'/administration',
		component:Administration,
		redirect:'/welcome',
		children: [
			{path:'/welcome',component:Welcome},
			{path:'/query',component:Query},
			{path:'/upload',component:Upload},
			{path:'/modify',component:Modify},
			{path:'/riskMonitoring',component:RiskMonitoring},
		],
	}
]

const router = new VueRouter({
  routes
})

export default router
