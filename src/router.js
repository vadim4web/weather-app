import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('./views/Favorites.vue'),
  },
  {
    path: '/preloader',
    name: 'Preloader',
    component: () => import('./components/PreLoader.vue'),
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('./views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

let isFirstLoad = !history.length
router.beforeEach((to, from, next) => {
  if (isFirstLoad) {
    isFirstLoad = false
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
