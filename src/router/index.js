import Vue from 'vue'
import Router from 'vue-router'
import Tasks from '@/components/tasks'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Tasks',
            component: Tasks
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        }
    ],
    mode: 'history'
})