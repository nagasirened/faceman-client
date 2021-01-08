import Router from 'vue-router'
import Vue from 'vue'
import routes from './routers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
export default router
