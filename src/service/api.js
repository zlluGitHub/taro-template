import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './status'
import { base, token } from './config'
import { formatTime } from '../utils/common'

// export const logError = (name, action, info) => {
//   // if (!info) {
//   //   info = 'empty'
//   // }
//   // try {
//   //   let deviceInfo = wx.getSystemInfoSync()
//   //   var device = JSON.stringify(deviceInfo)
//   // } catch (e) {
//   //   console.error('not support getSystemInfoSync api', err.message)
//   // }
//   // if (typeof action !== 'object') {
//   // fundebug.notify(name, action, info)
//   // }
//   // fundebug.notifyError(info, { name, action, device, time })
//   if (typeof info === 'object') {
//     info = JSON.stringify(info)
//   }
//   console.error(time, name, action, info, device)
// }

export const URL = base

export const baseOptions = (params, method = 'GET') => {
  let { url, data } = params
  // let token = getApp().globalData.token
  // if (!token) login()
  // console.log('params', params)
  let contentType = 'application/x-www-form-urlencoded'
  contentType = params.contentType || contentType
  let time = formatTime(new Date())
  const option = {
    isShowLoading: false,
    loadingText: '正在加载',
    url: base + url,
    data: data,
    method: method,
    header: { 'content-type': contentType, 'token': token },
    success(res) {
      if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
        console.error(time, 'api', '请求资源不存在！')
      } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
        console.error(time, 'api', '服务端出现了问题！')
      } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
        console.error(time, 'api', '没有权限访问！')
      }
      return res.data
    },
    error(e) {
      console.error(time, 'api', '请求接口出现问题！', e)
      // logError('api', '请求接口出现问题', e)
    }
  }
  return Taro.request(option)
}

export const get = (url, data = '') => {
  let option = { url, data }
  return baseOptions(option)
}

export const post = (url, data, contentType) => {
  let params = { url, data, contentType }
  return baseOptions(params, 'POST')
}

