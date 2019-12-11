import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import axios from '../http/axios'
// import { Toast } from 'vant';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'message',
        name: 'message',
        component: () => import('../views/message/index.vue')
      },
      {
        path: 'friends',
        name: 'friends',
        component: () => import('../views/friends.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('../views/setting.vue')
      }
    ]
  },
  {
    path: '/message-detail',
    name: 'messageDetail',
    component: () => import('../views/message/messageDetail.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/user/register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/login.vue')
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name === 'register' || to.name === 'login') {
//     next();
//     return;
//   }
//   axios.get('/api/login/status').then(res => {
//     if (res.data.code === 500) {
//       Toast('请先登陆');
//       next('/register');
//     }
//   })
// });

export default router
