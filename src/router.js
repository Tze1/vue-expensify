import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard'
import Home from './views/Home.vue'
import NotFound from './views/NotFound';

Vue.use(Router)

// IMPORTANT: ALL secure routes must have meta: { requiresAuth: true }
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
});
