import Vue from 'vue'
import VueRouter from 'vue-router'

const Rank = (resolve) => {
  import('views/rank/Rank').then(module => {
    resolve(module)
  })
}
const Recommend = (resolve) => {
  import('views/recommend/Recommend').then(module => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('views/search/Search').then(module => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('views/singer/Singer').then(module => {
    resolve(module)
  })
} 

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/rank',
    component: Rank
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/singer',
    component: Singer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
