import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BeverageList from '../views/BeverageList.vue'
import BeverageDetail from '../views/BeverageDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/beverages',
    name: 'beverages',
    component: BeverageList
  },
  {
    path: '/beverages/:id',
    name: 'BeverageDetail',
    component: BeverageDetail
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
