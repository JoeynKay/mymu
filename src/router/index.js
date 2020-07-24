import Vue from 'vue'
import VueRouter from 'vue-router'

import Rank from 'content/rank/Rank'
import Recommend from 'content/recommend/Recommend'
import Search from 'content/search/Search'
import Singer from 'content/singer/Singer'


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
