import Vue from 'vue'
import Router from 'vue-router'
import Tasks from '@/components/tasks'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'
import AddTask from '@/components/AddTask'
import TasksDone from '@/components/TasksDone'
import EmployeesList from '@/components/EmployeesList'
import AddEmployee from '@/components/AddEmployee'

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
                },
                {
                    path: 'addEmployee',
                    name: 'AddEmployee',
                    component: AddEmployee
                },
                {
                    path: 'listEmployees',
                    name: 'listEmployees',
                    component: EmployeesList
                }
            ]
        }       
    ],
    mode: 'history'
})