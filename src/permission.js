import { ElLoading } from 'element-plus'
import router from '@/router'
import { setDocumentTitle, filterAsyncRouter } from './utils'
import { getLsHasLogin, setLsUserInfo, setLsPermission } from './core/storage/ls'
import {
  setGlobalDefaultOpenedMenus,
  setGlobalDefaultActiveMenu,
  setGlobalMenus,
  getGlobalMenus
} from './core/global-data'
import userRoutes from '@/router/user'

// const whiteList = ['login', 'home'] // no redirect whitelist
// const loginRoutePath = '/login'

router.beforeEach(async (to) => {
  // to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title}`)
  const routes = await filterAsyncRouter(userRoutes, 'all')
  setGlobalMenus(routes)
  return true
})

router.afterEach((to) => {
  const arr = to.matched.filter(
    (item) => item.name !== 'index' && item.meta.showInBreadcrumb !== false
  )
  if (arr.length <= 2) {
    setGlobalDefaultOpenedMenus([arr[0].path])
    setGlobalDefaultActiveMenu(arr.at(-1).path)
  } else {
    const index = arr.find((item) => item.meta.isThreeLevelMenu)
    if (index) {
      setGlobalDefaultOpenedMenus([arr[1].path])
      setGlobalDefaultActiveMenu(arr[2].path)
    } else {
      setGlobalDefaultOpenedMenus([arr[0].path])
      setGlobalDefaultActiveMenu(arr[1].path)
    }
  }
  // const breadcrumbs = getGlobalBreadcrumbs()
  // breadcrumbs.splice(0, breadcrumbs.length, ...arr)
})
