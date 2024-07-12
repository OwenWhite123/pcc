import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'

import IndexView from '@/views/index.vue'
import HomeView from '@/views/home/index.vue'
import userRoutes from '@/router/user'
const routes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/user/login.vue'),
  //   meta: {
  //     title: '登录'
  //   }
  // },

  {
    path: '/',
    redirect: '/home',
    component: IndexView,
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta: {
          title: '首页'
        },
        children: [
          {
            path: '/register',
            name: 'register',
            component: () => import('@/views/user/register.vue'),
            meta: {
              title: '注册'
            }
          },
          {
            path: '/home',
            name: 'home/index',
            component: () => import('@/views/home/home.vue'),
            meta: {
              title: '首页',
              navId: '0',
              permission: 'home'
            }
          },
          {
            path: '/lottery',
            name: 'lottery',
            component: () => import('@/views/lottery/index.vue'),
            meta: {
              title: '彩票游戏',
              navId: '1',
              permission: 'home'
            },
            children: [
              {
                path: '/lottery/lhc',
                name: 'lottery/lhc',
                component: () => import('@/views/lottery/lhc/index.vue'),
                meta: {
                  title: '六合彩',
                  permission: 'lhc'
                }
              }
              // {
              //   path: '/lottery/ffc',
              //   name: 'lottery/ffc',
              //   component: () => import('@/views/lottery/ffc.vue'),
              //   meta: {
              //     title: '11选5',
              //     permission: 'ffc'
              //   }
              // },
              // {
              //   path: '/lottery/pk10',
              //   name: 'lottery/pk10',
              //   component: () => import('@/views/lottery/pk10.vue'),
              //   meta: {
              //     title: 'PK10',
              //     permission: 'pk10'
              //   }
              // }
            ]
          },
          {
            path: '/board',
            name: 'board',
            component: () => import('@/views/board/index.vue'),
            meta: {
              title: '棋牌游戏',
              navId: '2',
              permission: 'home'
            }
          },
          {
            path: '/sports',
            name: 'sports',
            component: () => import('@/views/sports/index.vue'),
            meta: {
              title: '体育赛事',
              navId: '3',
              permission: 'home'
            }
          },
          {
            path: '/live',
            name: 'live',
            component: () => import('@/views/live/index.vue'),
            meta: {
              title: '真人视讯',
              navId: '4',
              permission: 'home'
            }
          },
          {
            path: '/electronic',
            name: 'electronic',
            component: () => import('@/views/electronic/index.vue'),
            meta: {
              title: '电子游艺',
              navId: '5',
              permission: 'home'
            }
          },
          {
            path: '/fishing',
            name: 'fishing',
            component: () => import('@/views/fishing/index.vue'),
            meta: {
              title: '捕鱼游艺',
              navId: '6',
              permission: 'home'
            }
          },
          {
            path: '/memberCentre',
            name: 'memberCentre',
            redirect: '/memberCentre/userInfo',
            component: BasicLayout,
            meta: {
              title: '会员中心',
              permission: 'home'
            },
            children: [...userRoutes]
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router
