import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from '@/modules/Token';

import LoginPage from '@/views/auth/LoginPage.vue';
import RegisterPage from '@/views/auth/RegisterPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta:{
      needAuth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta:{
      needAuth: false
    }
  },

  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/app',
    component: ()=>import('../views/main/TabsPage.vue'),
    children:[
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        name: 'home',
        component: ()=>import('../views/main/MainPage.vue'),
        meta:{
          needAuth: true
        }
      },
      {
        path: 'spendings',
        name: 'spendings',
        component: ()=>import('../views/main/Spendings.vue'),
        meta:{
          needAuth: true
        }
      },
      {
        path: 'ipon',
        name: 'ipon',
        component: ()=>import('../views/main/IponPage.vue'),
        meta:{
          needAuth: true
        }
      },
      {
        path: 'setting',
        name: 'setting',
        component: ()=>import('../views/main/SettingPage.vue'),
        meta:{
          needAuth: true
        }
      }
    ],
  },
  
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next)=>{
  if(await isAuthenticated() == "true" && !to.meta.needAuth){
    next({name: 'home'})
  }else if(await isAuthenticated() != "true" && to.meta.needAuth){
    next({name: 'login'})
  }else{
    next()
  }
})

export default router
