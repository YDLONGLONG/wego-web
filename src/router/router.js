import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        redirect: '/home/article'
    },
    {
        path: '/home',
        component: () => import('../views/home/home.vue'),
        redirect: '/login/article',
        meta: {keepAlive: true},
        children: [
            {
                path: '/home/article',
                component: () => import('../views/article/article.vue'),
                meta: {keepAlive: true}
            },
            {
                path: '/home/attention',
                component: () => import('../views/article/attention.vue'),
                meta: {keepAlive: true}
            },
            {
                path: '/home/hot',
                component: () => import('../views/article/hot.vue'),
                meta: {keepAlive: true}
            },
            {
                path: '/home/video',
                component: () => import('../views/article/video.vue'),
                meta: {keepAlive: true}
            },
        ]
    },
    {
        path: '/login',
        component: () => import('../views/login/login.vue'),
        redirect: '/login/loginForm',
        meta: {keepAlive: true},
        children: [
            {
                path: '/login/loginForm',
                component: () => import('../views/login/children/loginForm.vue'),
                meta: {keepAlive: true}
            },
            {
                path: '/login/loginCode',
                component: () => import('../views/login/children/loginCode.vue'),
                meta: {keepAlive: true}
            },
            {
                path: '/login/reSet',
                component: () => import('../views/login/children/reSet.vue'),
                meta: {keepAlive: true}
            },
            {
                path: '/login/signIn',
                component: () => import('../views/login/children/signIn.vue'),
                meta: {keepAlive: true}
            },
        ]
    },
    {
        path: '/master/:trendid',
        component: () => import('../views/master/master.vue'),
        meta: {keepAlive: true}
    },
    {
        path: '/write',
        component: () => import('../views/write/write.vue'),
        meta: {keepAlive: true}
    },
    {
        path: '/write2',
        component: () => import('../views/write/write2.vue'),
        meta: {keepAlive: true}
    },
    {
        path: '/mine/:userid',
        component: () => import('../views/mine/mine.vue'),
        meta: {keepAlive: true}
    },
    {
        path: '/vip',
        component: () => import('../views/vip/vip.vue'),
        meta: {keepAlive: false}
    },
    {
        path: '/vip2',
        component: () => import('../views/vip/vip2.vue'),
        meta: {keepAlive: false}
    },{
        path: '/vip3',
        component: () => import('../views/vip/vip3.vue'),
        meta: {keepAlive: false}
    },{
        path: '/vip4',
        component: () => import('../views/vip/vip4.vue'),
        meta: {keepAlive: false}
    },
]
const router = new VueRouter({
    routes
})
export default router
