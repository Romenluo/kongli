import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/sign-in'
import Register from '@/view/sign-up'
import Home from '@/view/home'
import Show from '@/view/show'
import WriteNote from '@/view/write-note'
import ReadNote from '@/view/read-note'
import Error from '@/view/error'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
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
      path:'/error',
      name:'Error',
      component:Error
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/show',
          name: 'Show',
          component: Show
        },
        {
          path: '/readNote',
          name: 'ReadNote',
          component: ReadNote
        },
        {
          path: '/writeNote',
          name: 'WriteNote',
          component: WriteNote
        }
      ]
    }
  ]
})
