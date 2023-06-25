import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BeverageList from '../views/BeverageList.vue'
import BeverageDetail from '../views/BeverageDetail.vue'
import Cart from '../views/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/beverages',
    name: 'Beverages',
    component: BeverageList
  },
  {
    path: '/beverages/:id',
    name: 'BeverageDetail',
    component: BeverageDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
