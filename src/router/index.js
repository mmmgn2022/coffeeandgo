import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BeverageList from '../views/BeverageList.vue'
import BeverageDetail from '../views/BeverageDetail.vue'
import Cart from '../views/Cart.vue'
import CheckOut from '../views/CheckOut.vue'
import NotFound from '../views/NotFound.vue'

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
  },
  {
    path: '/checkout',
    name: 'CheckOut',
    component: CheckOut
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
