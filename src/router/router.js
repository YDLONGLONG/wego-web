import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('../views/home/home.vue'),
        children:[
            {
                path: '/home/article',
                component: () => import('../views/article/article.vue'),
            },
            {
                path: '/home/attention',
                component: () => import('../views/article/attention.vue'),
            },
            {
                path: '/home/hot',
                component: () => import('../views/article/hot.vue'),
            },
            {
                path: '/home/video',
                component: () => import('../views/article/video.vue'),
            },
        ]
    },
]
const router = new VueRouter({
    routes
  })
  export default router
  