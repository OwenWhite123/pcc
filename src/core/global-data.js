import { ref } from 'vue'
import { DEFAULT_OPENED_MENUS, DEFAULT_ACTIVE_MENU } from '@/core/storage/storage-key'
import { getLsDefaultOpenedMenus, getLsDefaultActiveMenu } from '@/core/storage/ls'

const globalData = ref({
  menus: [],
  [DEFAULT_OPENED_MENUS]: getLsDefaultOpenedMenus() || undefined,
  [DEFAULT_ACTIVE_MENU]: getLsDefaultActiveMenu() || undefined,
  breadcrumbs: [],
})

function getGlobalData (key) {
  return globalData.value[key]
}

function setGlobalData (key, value) {
  globalData.value[key] = value
}

function getGlobalMenus () {
  return globalData.value.menus
}

function setGlobalMenus (value) {
  globalData.value.menus = value
}

function getGlobalDefaultOpenedMenus () {
  return globalData.value[DEFAULT_OPENED_MENUS]
}

function setGlobalDefaultOpenedMenus (value) {
  globalData.value[DEFAULT_OPENED_MENUS] = value
}

function getGlobalDefaultActiveMenu () {
  return globalData.value[DEFAULT_ACTIVE_MENU]
}

function setGlobalDefaultActiveMenu (value) {
  globalData.value[DEFAULT_ACTIVE_MENU] = value
}

function getGlobalBreadcrumbs () {
  return globalData.value.breadcrumbs
}

function setGlobalBreadcrumbs (value) {
  globalData.value.breadcrumbs = value
}

export {
  getGlobalData,
  setGlobalData,
  getGlobalMenus,
  setGlobalMenus,
  getGlobalDefaultOpenedMenus,
  setGlobalDefaultOpenedMenus,
  getGlobalDefaultActiveMenu,
  setGlobalDefaultActiveMenu,
  getGlobalBreadcrumbs,
  setGlobalBreadcrumbs,
}