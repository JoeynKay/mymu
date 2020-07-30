import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

//引入样式
import 'assets/stylus/index.styl'

fastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('assets/image/default.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
