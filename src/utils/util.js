import {Message} from 'element-ui'
import store from '../store/store'
import moment from 'moment'
import brand from '../utils/brand.json'

const toStr = Object.prototype.toString

export function isUndef(v) {
  return v === undefined || v === null
}

export function isDef(v) {
  return v !== undefined && v !== null
}

export function isTrue(v) {
  return v === true
}

export function isFalse(v) {
  return v === false
}

export function isRegExp(v) {
  return toStr.call(v) === '[object RegExp]'
}

export function isArray(v) {
  return toStr.call(v) === '[object Array]'
}

export function isString(v) {
  return toStr.call(v) === '[object String]'
}

export function isObject(v) {
  return toStr.call(v) === '[object Object]'
}

export function isBlob(v) {
  return toStr.call(v) === '[object Blob]'
}

export function isFunction(v) {
  return toStr.call(v) === '[object Function]'
}

export function isNumber(v) {
  return toStr.call(v) === '[object Number]'
}

export function isDate(v) {
  return toStr.call(v) === '[object Date]'
}

export function isEmpty(v) {
  if (typeof v === 'undefined' || v === null || v === '') {
    return false
  } else {
    return true
  }
}

export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
  return arr
}

export function elementMessage(t, msg) {
  Message({
    type: t,
    message: msg
  })
}

export function deepClone(origin) {
  var isObject = any => typeof any === 'object' && any != null
  var isArray = any => Object.prototype.toString.call(any) === '[object Array]'
  if (!isObject(origin)) return origin
  var target = isArray(origin) ? [] : {}
  for (var prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      var value = origin[prop]
      if (isObject(value)) {
        target[prop] = deepClone(value)
      } else {
        target[prop] = value
      }
      // if...else...可换成三目运算符
      // target[prop] = isObject(value) ? deepClone(value) : value
    }
  }
  return target
}

/**
 * 节流函数--规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
 * fun:函数。delay:时长
 */
export function throttle(fun, delay) {
  let last, deferTimer
  return function (args) {
    let that = this
    let _args = arguments
    let now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fun.apply(that, _args)
      }, delay)
    } else {
      last = now
      fun.apply(that, _args)
    }
  }
}

/**
 * 防抖函数--在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 */
export function debounce(fun, delay) {
  return function (args) {
    let that = this
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, args)
    }, delay)
  }
}

export function getNewDate() {
  let date = new Date()
  let year = date.getFullYear()
  let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '/' + month + '/' + day + '_' + hours + ':' + minutes + ':' + seconds
}

export function authPermission(permission) {
  let authList = store.state.permissionList
  if (authList == null && authList.length === 0) {
    return false
  }
  return authList.includes(permission)
}

export function getUUid(len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  radix = radix || chars.length
  if (len) {
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

export function timeStringToArray(startTime, endTime) {
  let timeArr = []
  timeArr.push(moment(new Date(startTime)).format('YYYY-MM-DD'))
  timeArr.push(moment(new Date(endTime)).format('YYYY-MM-DD'))
  return timeArr
}

export function cityStringToArray(province, city, area) {
  let cityArr = []
  cityArr.push(province)
  cityArr.push(city)
  cityArr.push(area)
  return cityArr
}

export function cityArrayToString(obj, cityArr) {
  obj.province = cityArr[0]
  obj.city = cityArr[1]
  obj.area = cityArr[2]
}

/**
 * 处理设备 输入框 ，清除未填项
 * @param equipmentList
 * @returns {Array}
 */
export function checkEquipmentInput(equipmentList) {
  let newEquipmentList = []
  equipmentList.forEach(item => {
    if (item.doorNum !== '' && item.equipmentNum !== '') {
      newEquipmentList.push(item)
    }
  })
  return newEquipmentList
}


export function setCacadeValue(objArr, cityAllObj) {
  // 在数组最前端插入一个对象
  objArr.unshift(cityAllObj)
  objArr.forEach(item => {
    if (item.value) item.label = brand['86'][item.value]
    if (item.children) {
      item.children.unshift(cityAllObj)
      // 再次循环判断
      item.children.forEach(itemChild => {
        if (itemChild.value) itemChild.label = brand[item.value][itemChild.value]
        if (itemChild.children) {
          // 进行第三次循环
          itemChild.children.unshift(cityAllObj)
          itemChild.children.forEach(itemChildChild => {
            itemChildChild.label = itemChildChild.value ? brand[itemChild.value][itemChildChild.value] : '全部'
          })
        }
      })
    }
  })
  return objArr
}

export function timerToTimee(timer) {

}
