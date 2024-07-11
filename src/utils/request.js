import requests from './http'
import { ElMessage, ElNotification } from 'element-plus'

const baseURL = import.meta.env.VITE_APP_BASE_API

export function interceptorRequest(req) {
  const token = localStorage.getItem('token')
  if (token) {
    if (req.headers) {
      req.headers.Token = token.replace('"', '').replace('"', '')
    }
  }
  if (req.params) {
    deleteEmptyKey(req.params)
  }
  if (req.data) {
    deleteEmptyKey(req.data)
  }

  return req
}

// 删除空值
function deleteEmptyKey(obj) {
  for (const key in obj) {
    const value = obj[key]
    if (value === '' || value === null || value === undefined) {
      delete obj[key]
    }
  }
}

export function removeLoginInfo() {
  localStorage.clear()
  location.reload()
}

const instance = new requests(
  {
    timeout: 60 * 1000,
    headers: {
      // 'Content-Type': 'application/json;charset=UTF-8'
      'Content-Type': 'application/x-www-form-urlencoded',
      Lang: 'zh_CN'
    },
    baseURL
  },
  interceptorRequest
)

const _request = instance.request.bind(instance)
// Token
export default async function (config, configObj) {
  const { error, result } = await _request(config, configObj)
  if (error) {
    if (error.code === '-2') {
      setTimeout(() => {
        removeLoginInfo()
      }, 1500)
    } else {
      ElMessage.error(error.msg)
    }
  }
  return { error, result }
}
