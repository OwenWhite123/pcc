import { ls } from './storage'
import {
  TOKEN,
  USER_INFO,
  PERMISSION_LIST,
  HAS_LOGIN,
  DEFAULT_OPENED_MENUS,
  DEFAULT_ACTIVE_MENU,
  UNREAD_NOTICE,
  USER_NAME,
  USER_PW,
  REMEMBER_PW
} from './storage-key'

export function setLsToken(token) {
  ls.set(TOKEN, token)
}
export function getLsToken() {
  return ls.get(TOKEN)
}

export function setLsHasLogin(flag) {
  ls.set(HAS_LOGIN, flag)
}
export function getLsHasLogin() {
  return ls.get(HAS_LOGIN)
}

export function setLsPermission(permission_list) {
  ls.set(PERMISSION_LIST, permission_list)
}
export function getLsPermission() {
  return ls.get(PERMISSION_LIST)
}

export function setLsUserInfo(user_info) {
  ls.set(USER_INFO, user_info)
}
export function getLsUserInfo() {
  return ls.get(USER_INFO)
}

export function setLsUserName(user_name) {
  ls.set(USER_NAME, user_name)
}
export function getLsUserName() {
  return ls.get(USER_NAME)
}

export function setLsUserPw(user_pw) {
  ls.set(USER_PW, user_pw)
}
export function getLsUserPw() {
  return ls.get(USER_PW)
}
export function removeLsUserPw() {
  return ls.remove(USER_PW)
}

export function setLsUserRememberPw(remember_pw) {
  ls.set(REMEMBER_PW, remember_pw)
}
export function getLsUserRememberPw() {
  return ls.get(REMEMBER_PW)
}

export function setLsDefaultOpenedMenus(menus) {
  ls.set(DEFAULT_OPENED_MENUS, menus)
}
export function getLsDefaultOpenedMenus() {
  return ls.get(DEFAULT_OPENED_MENUS)
}

export function setLsDefaultActiveMenu(path) {
  ls.set(DEFAULT_ACTIVE_MENU, path)
}
export function getLsDefaultActiveMenu() {
  return ls.get(DEFAULT_ACTIVE_MENU)
}

export function setLsUnreadNotice(value) {
  ls.set(UNREAD_NOTICE, value)
}
export function getLsUnreadNotice() {
  return ls.get(UNREAD_NOTICE)
}

export function clearLsAll() {
  // ;[
  //   TOKEN,
  //   USER_INFO,
  //   PERMISSION_LIST,
  //   HAS_LOGIN,
  //   DEFAULT_OPENED_MENUS,
  //   DEFAULT_ACTIVE_MENU,
  //   UNREAD_NOTICE
  // ].forEach((key) => {
  //   ls.remove(key)
  // })
  ls.clearAll()
}
