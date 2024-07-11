import { getGlobalMenus, setGlobalMenus } from '@/core/global-data'

export function setDocumentTitle(title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

function hasPermission(permission_list, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission_list.length; i < len; i++) {
      flag = route.meta.permission === permission_list[i]
      if (flag) {
        return true
      }
    }
    return false
  }
  return false
}

export async function filterAsyncRouter(routerMap, permission_list = []) {
  if (permission_list === 'all') {
    return routerMap
  }
  const accessedRouters = routerMap.filter((route) => {
    if (hasPermission(permission_list, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permission_list)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

export async function waitReceiveCount() {
  const permissionMap = {
    notify: 'notify_count'
  }
  // const { result } = await getNotifyCount()
  const result = {
    data: {
      notify_count: 111
    }
  }
  let flag = false
  let menu = getGlobalMenus()
  if (result) {
    menu.forEach((item) => {
      if (item.children) {
        item.children.forEach((v) => {
          if (permissionMap[v.meta.permission]) {
            let dataCount = result.data[permissionMap[v.meta.permission]]
            if (dataCount > 0) {
              v.count = dataCount > 99 ? '99+' : dataCount
              item.count = dataCount
              flag = true
            }
          }
        })
      } else {
        if (permissionMap[item.meta.permission]) {
          let dataCount = result.data[permissionMap[item.meta.permission]]
          if (dataCount > 0) {
            item.count = dataCount > 99 ? '99+' : dataCount
            flag = true
          }
        }
      }
    })
  }
  if (flag) {
    setGlobalMenus(menu)
  }
}
