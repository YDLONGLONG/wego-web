import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/home/article'
    },
    {
        path: '/home',
        component: () => import('../views/home/home.vue'),
        redirect: '/login/article',
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
    {
        path: '/login',
        component: () => import('../views/login/login.vue'),
        redirect: '/login/loginForm',
        children:[
            {
                path: '/login/loginForm',
                component: () => import('../views/login/children/loginForm.vue'),
            },
            {
                path: '/login/loginCode',
                component: () => import('../views/login/children/loginCode.vue'),
            },
            {
                path: '/login/reSet',
                component: () => import('../views/login/children/reSet.vue'),
            },
            {
                path: '/login/signIn',
                component: () => import('../views/login/children/signIn.vue'),
            },
        ]
    },
    {
        path: '/master',
        component: () => import('../views/master/master.vue'),
    },
    {
        path: '/write',
        component: () => import('../views/write/write.vue'),
    },
]
const router = new VueRouter({
    routes
  })
  export default router
  