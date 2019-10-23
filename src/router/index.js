import Vue from 'vue'
import Router from 'vue-router'
import Tasks from '@/components/tasks'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'
import AddTask from '@/components/AddTask'
import TasksDone from '@/components/TasksDone'

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
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            children: [
                {
                    path: 'addTask',
                    name: 'AddTask',
                    component: AddTask
                },
                {
                    path: 'tasksDone',
                    name: 'TasksDone',
                    component: TasksDone
                }
            ]
        }       
    ],
    mode: 'history'
})