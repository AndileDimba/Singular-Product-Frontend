import { createRouter, createWebHashHistory } from 'vue-router'
import ProductList from '@/components/ProductList.vue'
import ProductDetails from '@/components/ProductDetails.vue'

const routes = [
  { path: '/', component: ProductList },
  { path: '/product/:id', component: ProductDetails },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
