import axios from 'axios'
import qs from 'qs'

let api_base_url = ''
if (import.meta.env.MODE === 'development') {
  api_base_url = 'https://netease-cloud-music-api-nxzt.vercel.app'
} else if (import.meta.env.MODE === 'production') {
  api_base_url = 'https://netease-cloud-music-api-nxzt.vercel.app'
}
let instance = axios.create({
  timeout: 1000 * 80,
  baseURL: api_base_url
})
instance.defaults.responseType = 'json'
instance.defaults.withCredentials = true
instance.defaults.transformRequest = [
  data => {
    return qs.stringify(data)
  }
]
instance.defaults.validateStatus = function () {
  // return status >= 200 && status < 400; // 200- 399  resolve  其他状态码 reject
  // 如果在响应拦截设置了状态码判断，这里设置返回 true
  return true
}
// 请求拦截器
instance.interceptors.request.use(
  config => {

    return config
  },
  error => {
    console.log('请求超时！');
    return Promise.reject(error)
  }
)
// 响应拦截器即异常处理
// 服务器 Response 对象
instance.interceptors.response.use(
  response => {
    // {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, request:{…}}
    let data = response.data     //响应的数据部分
    console.log('响应数据：', data);
    let status = response.status  //标准状态码
    if (status === 200) {  //如果响应正常则放行 数据
      return Promise.resolve(data) //  *响应拦截器，只取数据部分*
    }

    else if (status >= 400 && status <= 499) {
      console.log('客户端请求错误码：', status);
      return
    }
    else {
      //其他错误
      console.log('服务器错误,错误码：', status);
      return Promise.reject(response)
    }
  },
  error => {
    console.log('响应错误信息：')
    console.log(error)
  }
)
let api = {}
api.get = function (url) {
  return new Promise((resolve, reject) => {
    instance
      .get(url)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
api.post = function (url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
export default api