import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/index'
import './plugins/element.js'
import '@/assets/styles/varibles.styl'
import '@/assets/styles/base.styl'
import '@/assets/styles/reset.css'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/admin/global.css'
import 'vue-area-linkage/dist/index.css'
import '@/assets/font/iconfont.css'
import Moment from 'moment'
import VueAreaLinkage from 'vue-area-linkage'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.use(VueAreaLinkage)

Vue.config.productionTip = false
Vue.use(VueAreaLinkage)
Vue.prototype.moment = Moment

Vue.component('HelloWorld', {
  data () {
    return {
      msg: 'helloworld'
    }
  },
  template: '<div>{{msg}}</div>'
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
