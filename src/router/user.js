import { HRouteView } from '@/components'
import img1 from '@/assets/logo.svg'
const userRoutes = [
  {
    path: '/memberCentre/userInfo',
    name: 'memberCentre/userInfo',
    component: () => import('@/views/memberCentre/userInfo.vue'),
    meta: {
      title: '账号总览',
      icon: img1,
      permission: 'userInfo'
    }
  },
  {
    path: '/memberCentre/userSetting',
    name: 'userSetting',
    redirect: '/memberCentre/userSetting/memberInfo',
    meta: {
      title: '账号设置',
      icon: img1,
      permission: 'memberInfo'
    },
    component: HRouteView,
    children: [
      {
        path: '/memberCentre/userSetting/memberInfo',
        name: 'userSetting/MemberInfo',
        component: () => import('@/views/memberCentre/memberInfo.vue'),
        meta: {
          title: '会员信息',
          permission: 'memberInfo'
        }
      },
      {
        path: '/memberCentre/userSetting/wallet',
        name: 'userSetting/wallet',
        component: () => import('@/views/memberCentre/wallet.vue'),
        meta: {
          title: '钱包管理',
          permission: 'wallet'
        }
      },
      {
        path: '/memberCentre/userSetting/safety',
        name: 'userSetting/safety',
        component: () => import('@/views/memberCentre/safety.vue'),
        meta: {
          title: '安全管理',
          permission: 'safety'
        }
      }
    ]
  },
  {
    path: '/memberCentre/notify',
    name: 'memberCentre/notify',
    component: () => import('@/views/memberCentre/notify.vue'),
    meta: {
      title: '站内消息',
      icon: img1,
      permission: 'notify'
    }
  }
]

export default userRoutes
