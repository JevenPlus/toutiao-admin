import axios from 'axios'

// 创建axios实例,就是复制了一个axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://tapi.research.itcast.cn/' // 请求的基础路径
})

// 请求拦截器
request.interceptors.request.use(
  // 所有请求会经过这里
  // config 是当前请求相关的配置信息对象 config是可以修改的
  function (config) {
    // 然后我们可以在允许请求出去之前定制统一的业务功能处理
    // 例如：统一的设置token
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    console.log('请求经过这里')

    // 这里config return 出去之后，请求才会真正的发出去
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器

// 导出请求方法
export default request
