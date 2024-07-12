import request from '@/utils/request'

// 获取验证码
export function getCaptcha(params) {
  return request({
    url: '/captcha/getCaptcha',
    method: 'get',
    params
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

//退出登录
export function userLogout(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}

//用户信息
export function userInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}

//获取额度转换所有平台列表
export function getPlatList(params) {
  return request({
    url: '/plat/getPlatList',
    method: 'get',
    params
  })
}

//查询用户余额
export function getUserBalance(params) {
  return request({
    url: '/user/getUserBalance',
    method: 'get',
    params
  })
}
