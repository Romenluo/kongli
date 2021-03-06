import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/sign-in'
import Register from '@/view/sign-up'
import Home from '@/view/home'
import Show from '@/view/show'
import Pull from '@/view/puan'
import Personal from '@/view/personal'
import Error from '@/view/error'
import About from '@/view/about'
import Information from '@/view/information'
import InfoDetail from '@/view/info-detail'
import NoteDetail from '@/view/note-detail'
Vue.use(Router)

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
      path: '/error',
      name: 'Error',
      component: Error
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/show',
          name: 'Show',
          component: Show
        },
        {
          path: '/pull',
          name: 'Pull',
          component: Pull
        },
        {
          path: '/personal',
          name: 'Personal',
          component: Personal
        },
        {
          path: '/about',
          name: 'About',
          component: About
        },
        {
          path: '/information',
          name: 'Information',
          component: Information
        },
        {
          path: '/infoDetail',
          name: 'InfoDetail',
          component: InfoDetail
        },
        {
          path: '/noteDetail',
          name: 'NoteDetail',
          component: NoteDetail
        }
      ]
    }
  ]
})
