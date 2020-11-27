import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import AmapVue from '@amap/amap-vue'
//导入全局样式表
import './assets/css/global.css'

Vue.config.productionTip = false

// 配置地图
AmapVue.config.key = "3a722c205c327398fd21c23f499b7878";
Vue.use(AmapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
