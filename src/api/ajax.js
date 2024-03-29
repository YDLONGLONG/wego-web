/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'
const baseURL = 'http://localhost:4001'
const http = axios.create({ baseURL, withCredentials: true })
export default function ajax(url, data = {}, type = 'get') {
  return new Promise(function(resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'get') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = http.get(url)
    } else {
      // 发送post请求
      promise = http.post(url, data)
    }
    //成功了
    promise.then(response => resolve(response.data)).catch(error => reject(error))
  })
}
