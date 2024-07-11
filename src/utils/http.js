import axios from 'axios'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/notification/style/css'
import { ElMessage, ElNotification } from 'element-plus'

function defaultInterceptorResponse(response) {
  const { data } = response
  if (data.code === '0') {
    return {
      result: data
    }
  }
  return {
    error: data
  }
}

function defaultErrorHandler(error) {
  return {
    error
  }
}

export default class Request {
  requestInstance
  interceptorRequest
  constructor(
    config,
    interceptorRequest,
    interceptorResponse = defaultInterceptorResponse,
    errorHandler = defaultErrorHandler
  ) {
    this.requestInstance = axios.create(config)

    this.interceptorRequest = interceptorRequest

    this.interceptorsRequest(interceptorRequest, errorHandler)
    this.interceptorsResponse(interceptorResponse, errorHandler)
  }
  interceptorsRequest(interceptorRequest, errorHandler) {
    this.requestInstance.interceptors.request.use(
      (request) => {
        if (interceptorRequest) {
          interceptorRequest(request)
        }
        let url = request.url
        // get参数编码
        if (request.method === 'get' && request.params) {
          for (let key in request.params) {
            if (request.params[key] === undefined || request.params[key] === null) {
              delete request.params[key]
            }
          }
          url += '?'
          let keys = Object.keys(request.params)
          for (let key of keys) {
            url += `${key}=${encodeURIComponent(request.params[key])}&`
          }
          url = url.substring(0, url.length - 1)
          request.params = {}
        }
        request.url = url
        return request
      },
      (error) => {
        return errorHandler(error)
      }
    )
  }
  interceptorsResponse(interceptorResponse, errorHandler) {
    this.requestInstance.interceptors.response.use(
      (response) => {
        return interceptorResponse(response)
      },
      (error) => {
        return errorHandler(error)
      }
    )
  }
  async request(request, config) {
    config = config || {}
    if (config.error === undefined) {
      config.error = 'message'
    }
    config.success = config.success || false
    const { error, result } = await this.requestInstance(request)
    // if (result) {
    //   if (config.success === true) {
    //     ElMessage({
    //       message: config.successMsg || result.msg,
    //       type: 'success',
    //       grouping: true
    //     })
    //   }
    // }
    // if (error) {
    //   if (config.error !== false) {
    //     if (config.error === 'message') {
    //       // ElMessage.closeAll()
    //       ElMessage({
    //         message: config.errorMsg || error.msg || error,
    //         type: 'error',
    //         grouping: true
    //       })
    //     }
    //     if (config.error === 'notification') {
    //       // ElNotification.closeAll()
    //       ElNotification({
    //         title: '温馨提示',
    //         message: config.errorMsg || error.msg || error,
    //         type: 'error'
    //       })
    //     }
    //   }
    // }
    return { error, result }
  }
}
