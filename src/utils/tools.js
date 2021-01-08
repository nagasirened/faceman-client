export default {
  /**
   * 存储localStorage
   */
  setStore (name, content) {
    let contentClone = content
    if (!name) return
    if (typeof content !== 'string') {
      contentClone = JSON.stringify(contentClone)
    }
    window.localStorage.setItem(name, contentClone)
  },

  /**
   * 获取localStorage
   */
  getStore (name) {
    if (!name) return null
    return JSON.parse(window.localStorage.getItem(name))
  },

  /**
   * 删除localStorage
   */
  removeStore (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  },
  // 处理数字,个位开始每左数三位逗号
  formateNumber (num) {
    return parseFloat(num).toLocaleString()
  },
  /**
   * 对象按照字母顺序排序
   */
  objKeySort (obj) {
    // 排序的函数
    const newkey = Object.keys(obj).sort()
    // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    const newObj = {}
    // 创建一个新的对象，用于存放排好序的键值对
    for (let i = 0; i < newkey.length; i += 1) {
      // 遍历newkey数组
      newObj[newkey[i]] = obj[newkey[i]]
      // 向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj // 返回排好序的新对象
  },
  // 获取url中的参数
  requestFromUrl (paramName) {
    const args = {}
    let argsStr = window.location.search // 获取URL参数字符串
    if (argsStr.length > 0) {
      argsStr = argsStr.substring(1)
      const nameValueArr = argsStr.split('&') // 多参数
      for (let i = 0; i < nameValueArr.length; i += 1) {
        const pos = nameValueArr[i].indexOf('=')
        if (pos !== -1) {
          const argName = nameValueArr[i].substring(0, pos) // 提取name
          const argVal = nameValueArr[i].substring(pos + 1) // 提取value
          args[argName] = unescape(argVal)
        }
      }
      return args[paramName]
    }
    return null
  },
  // 字符串去除后六位 20180101000000 => 20180101
  stringDeleteLast (str) {
    const s1 = str.substring(0, str.length - 6)
    return s1
  },
  getParamer (paramer) {
    const url = window.location.href.split('?')[1]
    if (url) {
      /* 获取url里"?"后面的值 */
      if (url.indexOf('&') > 0) {
        /* 判断是否是一个参数还是多个参数 */
        const urlParamArry = url.split('&') /* 分开每个参数，并放到数组里 */
        for (let i = 0; i < urlParamArry.length; i += 1) {
          const paramerName = urlParamArry[i].split(
            '='
          ) /* 把每个参数名和值分开，并放到数组里 */
          if (paramer === paramerName[0]) {
            /* 匹配输入的参数和数组循环出来的参数是否一样 */
            return paramerName[1] /* 返回想要的参数值 */
          }
        }
      } else {
        /* 判断只有个参数 */
        const paramerValue = url.split('=')[1]
        return paramerValue
      }
    }
    return null
  }
}
