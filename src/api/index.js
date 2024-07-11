import request from '@/utils/request'

export function homeDomain(params) {
  return request({
    url: `/home/domain`,
    method: 'get',
    params
  })
}

//获取所有彩种
export function getAllLottery() {
  return request({
    url: '/lottery/getAllLottery',
    method: 'get'
  })
}
