import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from '../router/index'
import { Loading, Message } from 'element-ui'
import store from '../store/store' // 引入vuex

function elementMessage (t, msg) {
  Message({
    type: t,
    message: msg
  })
}
// axios.defaults.baseURL = process.env.VUE_APP_LOGOUT_URL
axios.defaults.timeout = 1000000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
let loading = null

/*
 *请求请求拦截
 *用于处理需要请求前的操作
 */
axios.interceptors.request.use(
  config => {
    if (!config.url.includes('/web/merchant/findByName', '/web/project/cascader', '/web/captcha')) {
      loading = Loading.service({
        text: '正在加载中......',
        fullscreen: true
      })
    }
    if (store.state.token) {
      config.headers['token'] = store.state.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/*
 *请求响应拦截
 *用于处理数据返回后的操作
 */
axios.interceptors.response.use(
  response => {
    return new Promise((resolve, reject) => {
      // 请求成功后关闭加载框
      if (loading) {
        loading.close()
      }
      const res = response.data
      if (response.config && response.config.responseType === 'blob') {
        resolve(response)
      }
      if (res.code) {
        if (res.code === 200 && res.result !== '') {
          resolve(res)
        } else if (res.code === 200 && res.result === '') {
          resolve(res)
        } else {
          // elementMessage('error', res.result)
          reject(res)
        }
      }
    })
  },
  error => {
    // console.log(error)
    // 请求成功后关闭加载框
    if (loading) {
      loading.close()
    }
    // 断网处理或者请求超时
    if (!error.response) {
      // 请求超时
      // loading.close()
      // if (error.message.includes('timeout')) {
      //   elementMessage('error', '请求超时，请检查互联网连接')
      // } else {
      //   elementMessage('error', '请检查网络是否已连接')
      // }
      return Promise.reject(error)
    }
    if (!Vue.prototype.messageNum) {
      Vue.prototype.messageNum = 0
    }
    const status = error.response.status
    switch (status) {
      case 500:
        elementMessage('error', '服务器内部错误')
        break
      case 404:
        elementMessage('error', '未找到远程服务器')
        break
      case 403:
        if (Vue.prototype.messageNum !== 0) {

        } else if (Vue.prototype.messageNum === 0) {
          Vue.prototype.messageNum++
          elementMessage('warning', '用户登陆过期，请重新登陆')
        }
        localStorage.clear()
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: '/login'
            }
          })
        }, 1000)
        break
      case 400:
        elementMessage('error', '数据异常')
        break
      default:
        elementMessage('error', error.response.data.result)
    }
    return Promise.reject(error)
  }
)

// 请求默认参数
const header = {
  clientIp: '11',
  clientType: '11',
  serialNum: ''
}
let setPostParams = {}
// let setParams = {}
// url添加反向代理key值，差异反向代理时写入判断即可
// const replaceUrl = url => '/rky/v1/' + url
/*
 *get方法，对应get请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 *@param {blob} responseType [流文件格式]
 */
export function get (url, params, responseType) {
  return axios.get(url, params, responseType)
}

/*
 *post方法，对应post请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 *@param {blob} responseType [流文件格式]
 */
export function post (url, params, responseType) {
  // Object.assign(setPostParams, { header }, { body: params })
  setPostParams = {
    header,
    body: params
  }
  return axios.post(url, setPostParams, responseType)
}
/*
 *postBase方法，对应post请求未带header
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 *@param {blob} responseType [流文件格式]
 */
export function postBase (url, params, responseType) {
  // Object.assign(setParams, params)
  return axios.post(url, params, responseType)
}
/*
 *postFrom方法，对应post请求参数未formData
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function postForm (url, params) {
  return axios.post(url, qs.stringify(params))
}
/*
 *put方法，对应put请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function put (url, params) {
  let setParams = {
    header,
    body: params
  }
  return axios.put(url, setParams)
}

export function putBase (url, params) {
  return axios.put(url, params)
}
/*
 *DEL方法，对应delete请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function DEL (url, params) {
  return axios.delete(url, params)
}

Vue.prototype.$http = axios
